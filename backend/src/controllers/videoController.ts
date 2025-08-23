import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { Video, VideoComment } from "../models/video";
import { dynamoDB } from "../config/aws";
import { uploadToS3 } from "../services/s3Service";
import { getAllItems } from "../services/dynamoDBService";
import path from "path";

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
      comments: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
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
    const videoData = await getAllItems(
      process.env.DYNAMODB_VIDEOS_TABLE as string
    );
    const userData = await getAllItems(
      process.env.DYNAMODB_USERS_TABLE as string
    );

    const userMap: Record<string, string> = {};
    userData.forEach((user) => {
      userMap[user.userId] = user.username;
    });

    const respData = videoData.map((video) => ({
      ...video,
      thumbnailUrl:
        process.env.S3_BASE_URL +
        "/videos/thumbnails/" +
        path.parse(video.videoKey).name +
        ".png",
      src:
        process.env.S3_BASE_URL +
        "/videos/hls/" +
        video.videoKey.split(".")[0] +
        "/480p/index.m3u8",
      username: userMap[video.userId] || "Unknown",
      comments: video.comments.map((comment: any) => ({
        ...comment,
        username: userMap[comment.userId] || "Unknown",
      })),
    }));
    return res.status(200).json({
      message: "videos data retrieved",
      data: respData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "List videos failed",
    });
  }
};

export const commentOnVideo = async (req: Request, res: Response) => {
  try {
    const { videoId } = req.params;
    const { userId, commentText } = req.body;

    if (!videoId || !userId || !commentText) {
      return res.status(400).json({
        message: "Missing required fields: videoId, userId, or commentText.",
      });
    }

    const video = await dynamoDB
      .get({
        TableName: process.env.DYNAMODB_VIDEOS_TABLE!,
        Key: { videoId },
      })
      .promise();

    if (!video.Item) {
      return res.status(404).json({
        message: "Video not found",
      });
    }

    const newComment: VideoComment = {
      commentId: uuidv4(),
      commentText,
      userId,
      createdAt: new Date().toISOString(),
    };

    video.Item.comments.push(newComment);
    video.Item.updatedAt = new Date().toISOString();

    await dynamoDB
      .put({
        TableName: process.env.DYNAMODB_VIDEOS_TABLE!,
        Item: video.Item,
      })
      .promise();

    const userData = await getAllItems(
      process.env.DYNAMODB_USERS_TABLE as string
    );

    const userMap: Record<string, string> = {};
    userData.forEach((user) => {
      userMap[user.userId] = user.username;
    });
    newComment["username"] = "Unknown";
    if (userMap[newComment.userId]) {
      newComment["username"] = userMap[newComment.userId];
    }
    res.status(200).json({
      message: "Comment added successfully",
      comment: newComment,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to add comment",
    });
  }
};

export const deleteCommentFromVideo = async (req: Request, res: Response) => {
  try {
    const { videoId, commentId } = req.params;

    if (!videoId || !commentId) {
      return res.status(400).json({
        message: "Missing required fields: videoId or commentId.",
      });
    }

    const video = await dynamoDB
      .get({
        TableName: process.env.DYNAMODB_VIDEOS_TABLE!,
        Key: { videoId },
      })
      .promise();

    if (!video.Item) {
      return res.status(404).json({
        message: "Video not found",
      });
    }

    const commentIndex = video.Item.comments.findIndex(
      (comment: VideoComment) => comment.commentId === commentId
    );

    if (commentIndex === -1) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    video.Item.comments.splice(commentIndex, 1);
    video.Item.updatedAt = new Date().toISOString();

    await dynamoDB
      .put({
        TableName: process.env.DYNAMODB_VIDEOS_TABLE!,
        Item: video.Item,
      })
      .promise();

    res.status(200).json({
      message: "Comment deleted successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to delete comment",
    });
  }
};
