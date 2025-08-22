import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const s3 = new S3Client({ region: process.env.AWS_REGION });
const ffmpegPath = "/opt/ffmpeg";

// Enable as an needed
const resolutions = [
  { name: "480p", height: 480, bandwidth: 800000 },
  { name: "720p", height: 720, bandwidth: 1500000 },
  // { name: "1080p", height: 1080, bandwidth: 3000000 },
];

export const handler = async (event) => {
  try {
    console.log("received an event : ", event);
    for (const record of event.Records) {
      try {
        const s3Event = JSON.parse(record.body);
        if (s3Event.Event === "s3:TestEvent") {
          console.log("Received S3 TestEvent, skipping processing.");
          continue;
        }
        const s3Record = s3Event.Records?.[0];
        if (!s3Record || !s3Record.s3) {
          throw new Error("Invalid S3 event inside SQS message");
        }

        const bucket = s3Record.s3.bucket.name;
        const key = s3Record.s3.object.key;

        console.log(`Processing file from bucket: ${bucket}, key: ${key}`);

        const originalPath = "/tmp/original.mp4";
        const thumbnailPath = "/tmp/thumb.png";

        // Download original video
        const getObjectCmd = new GetObjectCommand({ Bucket: bucket, Key: key });
        const data = await s3.send(getObjectCmd);

        await new Promise((resolve, reject) => {
          const writeStream = fs.createWriteStream(originalPath);
          data.Body.pipe(writeStream);
          data.Body.on("error", reject);
          writeStream.on("finish", resolve);
          writeStream.on("error", reject);
        });

        // Generate thumbnail (first frame)
        execSync(
          `${ffmpegPath} -y -i ${originalPath} -ss 00:00:01.000 -vframes 1 ${thumbnailPath}`
        );

        // Upload thumbnail
        const thumbKey = key
          .replace("videos/original", "videos/thumbnails")
          .replace(/\.[^/.]+$/, ".png");

        const fileContent = fs.readFileSync(thumbnailPath);
        await s3.send(
          new PutObjectCommand({
            Bucket: bucket,
            Key: thumbKey,
            Body: fileContent,
            ContentType: "image/png",
          })
        );
        console.log(`Thumbnail uploaded to: ${thumbKey}`);

        // Prepare directory for HLS outputs
        const hlsBaseKey = key
          .replace("videos/original", "videos/hls")
          .replace(/\.[^/.]+$/, "");
        const hlsTmpBase = "/tmp/hls";
        if (!fs.existsSync(hlsTmpBase)) {
          fs.mkdirSync(hlsTmpBase);
        }
        // Clean previous HLS files and folders in /tmp/hls
        fs.readdirSync(hlsTmpBase).forEach((entry) => {
          const entryPath = path.join(hlsTmpBase, entry);
          const stat = fs.statSync(entryPath);
          if (stat.isDirectory()) {
            fs.rmSync(entryPath, { recursive: true, force: true });
          } else {
            fs.unlinkSync(entryPath);
          }
        });

        // Store playlist entries for master playlist
        let masterPlaylistContent = "#EXTM3U\n#EXT-X-VERSION:3\n";

        for (const res of resolutions) {
          const resName = res.name;
          const height = res.height;
          const bandwidth = res.bandwidth;

          const resFolder = path.join(hlsTmpBase, resName);
          if (!fs.existsSync(resFolder)) {
            fs.mkdirSync(resFolder);
          } else {
            // Clean folder if exists
            fs.readdirSync(resFolder).forEach((file) =>
              fs.unlinkSync(path.join(resFolder, file))
            );
          }

          const playlistFilename = "index.m3u8";
          const playlistPath = path.join(resFolder, playlistFilename);

          // Run ffmpeg to create HLS for this resolution
          execSync(
            `${ffmpegPath} -i ${originalPath} -vf scale=-2:${height} -c:a aac -ar 48000 -b:a 128k -c:v h264 -profile:v baseline -crf 20 -sc_threshold 0 -g 48 -keyint_min 48 -hls_time 10 -hls_playlist_type vod -b:v ${bandwidth} -maxrate ${bandwidth} -bufsize ${
              bandwidth * 2
            } -hls_segment_filename ${resFolder}/segment%d.ts ${playlistPath}`
          );

          // Upload all files in resFolder to S3
          const files = fs.readdirSync(resFolder);
          for (const fileName of files) {
            const filePath = path.join(resFolder, fileName);
            const content = fs.readFileSync(filePath);

            await s3.send(
              new PutObjectCommand({
                Bucket: bucket,
                Key: `${hlsBaseKey}/${resName}/${fileName}`,
                Body: content,
                ContentType: fileName.endsWith(".m3u8")
                  ? "application/vnd.apple.mpegurl"
                  : "video/MP2T",
              })
            );

            console.log(
              `Uploaded HLS segment: ${hlsBaseKey}/${resName}/${fileName}`
            );
          }

          // Add to master playlist
          masterPlaylistContent +=
            `#EXT-X-STREAM-INF:BANDWIDTH=${bandwidth},RESOLUTION=1920x${height}\n` +
            `${resName}/index.m3u8\n`;
        }

        // Upload master playlist
        const masterPlaylistKey = `${hlsBaseKey}/master.m3u8`;
        await s3.send(
          new PutObjectCommand({
            Bucket: bucket,
            Key: masterPlaylistKey,
            Body: masterPlaylistContent,
            ContentType: "application/vnd.apple.mpegurl",
          })
        );

        console.log(`Master playlist uploaded to: ${masterPlaylistKey}`);

        return {
          statusCode: 200,
          body: "Thumbnail, multi-res videos, and HLS master playlist generated successfully",
        };
      } catch (error) {
        console.error("Error processing record:", error);
      }
    }
  } catch (error) {
    console.error("Error processing event:", error);
  }
};
