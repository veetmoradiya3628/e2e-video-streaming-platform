import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { Video } from "../models/video";
import { dynamoDB } from "../config/aws";
import { uploadToS3 } from "../services/s3Service";
import { getAllItems } from "../services/dynamoDBService";

export const uploadVideo = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded!",
      });
    }

    const { userId, title, description } = req.body;
    if (!userId || !title || !description) {
      return res.status(400).json({
        message: "Missing required fields: userId, title, or description.",
      });
    }

    const videoId = uuidv4();
    const videoKey = `${videoId}-${req.file.originalname}`;
    const key = `videos/original/${videoKey}`;
    await uploadToS3(req.file.buffer, key, req.file.mimetype);
    const newVideo: Video = {
      videoId,
      userId,
      title,
      description,
      s3KeyOriginal: key,
      videoKey: `${videoKey}`,
      status: "UPLOADING",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    await dynamoDB
      .put({
        TableName: process.env.DYNAMODB_VIDEOS_TABLE!,
        Item: newVideo,
      })
      .promise();

    res.status(201).json({ message: "Video uploaded successfully", videoId });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Upload failed",
    });
  }
};

export const listVideos = async (req: Request, res: Response) => {
  try {
    const data = await getAllItems(process.env.DYNAMODB_VIDEOS_TABLE as string);
    return res.status(200).json({
      message: "videos data retrieved",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "List videos failed",
    });
  }
};
