import AWS from "aws-sdk";
import dotenv from "dotenv";

dotenv.config();
AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

export const s3 = new AWS.S3();
export const dynamoDB = new AWS.DynamoDB.DocumentClient();
