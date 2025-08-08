import { ManagedUpload } from "aws-sdk/clients/s3";
import { s3 } from "../config/aws";

export const uploadToS3 = (
  fileBuffer: Buffer,
  key: string,
  contentType: string
): Promise<ManagedUpload.SendData> => {
  return s3
    .upload({
      Bucket: process.env.AWS_S3_BUCKET!,
      Key: key,
      Body: fileBuffer,
      ContentType: contentType,
    })
    .promise();
};
