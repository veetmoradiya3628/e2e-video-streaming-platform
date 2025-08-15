import { useEffect, useRef } from "react";
import videojs from "video.js";
import type Player from "video.js/dist/types/player";
import "video.js/dist/video-js.css";

// 480px - https://e2e-video-transcoding-dev.s3.ap-south-1.amazonaws.com/videos/hls/48b82adb-7e3f-4d62-bb55-2483184b4622-SampleVideo_1280x720_5mb/480p/index.m3u8
// masterUrl - https://e2e-video-transcoding-dev.s3.ap-south-1.amazonaws.com/videos/hls/cf66c1eb-96fa-4198-817f-786b8d99cbc6-SampleVideo_1280x720_5mb/master.m3u8

// 480px - large video
// https://e2e-video-transcoding-dev.s3.ap-south-1.amazonaws.com/videos/hls/b644aef9-0e6b-422a-92c9-c75dc20859c5-SampleVideo_1280x720_30mb/480p/index.m3u8

// other good vidoes
// https://e2e-video-transcoding-dev.s3.ap-south-1.amazonaws.com/videos/hls/5b2172fd-e210-43ec-bb2a-b47025926eb8-3209177-uhd_2560_1440_25fps/480p/index.m3u8

const VideoPlayer = () => {
  const videoNode = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<Player | null>(null);

  useEffect(() => {
    if (!videoNode.current) return;

    // Create <video-js> dynamically
    const videoEl = document.createElement("video-js");
    videoEl.classList.add("vjs-big-play-centered", "video-js");
    videoNode.current.appendChild(videoEl);

    playerRef.current = videojs(videoEl, {
      autoplay: false,
      controls: true,
      preload: "auto",
      // fluid: true,
      width: 800, // pixels
      height: 450, // pixels
      playbackRates: [0.5, 1, 1.25, 1.5, 2], // speed control
      userActions: {
        hotkeys: true, // Enable built-in keyboard shortcuts
      },
      controlBar: {
        children: [
          "playToggle",
          "volumePanel",
          "currentTimeDisplay",
          "progressControl",
          "durationDisplay",
          "playbackRateMenuButton",
          "pictureInPictureToggle",
          "fullscreenToggle",
        ],
      },
      sources: [
        {
          src: "https://e2e-video-transcoding-dev.s3.ap-south-1.amazonaws.com/videos/hls/5b2172fd-e210-43ec-bb2a-b47025926eb8-3209177-uhd_2560_1440_25fps/480p/index.m3u8",
          type: "application/x-mpegURL",
        },
      ],
    });

    return () => {
      // Dispose player first
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
      // Remove element safely
      if (videoNode.current) {
        videoNode.current.innerHTML = "";
      }
    };
  }, []);

  return (
    <div data-vjs-player>
      <div ref={videoNode}></div>
    </div>
  );
};

export default VideoPlayer;
