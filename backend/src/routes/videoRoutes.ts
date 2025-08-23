
import express from "express";
import multer from "multer";
import { commentOnVideo, deleteCommentFromVideo, listVideos, uploadVideo } from "../controllers/videoController";

const router = express.Router();
const upload = multer();

/**
 * @swagger
 * tags:
 *   name: Videos
 *   description: Video upload, listing, and comments
 */

/**
 * @swagger
 * /api/videos/upload:
 *   post:
 *     summary: Upload a new video
 *     tags: [Videos]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               video:
 *                 type: string
 *                 format: binary
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               userId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Video uploaded
 *       400:
 *         description: Bad request
 */
router.post("/upload", upload.single("video"), uploadVideo);

/**
 * @swagger
 * /api/videos/list:
 *   get:
 *     summary: List all videos
 *     tags: [Videos]
 *     responses:
 *       200:
 *         description: List of videos
 */
router.get("/list", listVideos);

/**
 * @swagger
 * /api/videos/comment/{videoId}:
 *   post:
 *     summary: Add a comment to a video
 *     tags: [Videos]
 *     parameters:
 *       - in: path
 *         name: videoId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               comment:
 *                 type: string
 *     responses:
 *       201:
 *         description: Comment added
 *       404:
 *         description: Video not found
 */
router.post("/comment/:videoId", commentOnVideo);

/**
 * @swagger
 * /api/videos/comment/{videoId}/{commentId}:
 *   delete:
 *     summary: Delete a comment from a video
 *     tags: [Videos]
 *     parameters:
 *       - in: path
 *         name: videoId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Comment deleted
 *       404:
 *         description: Comment or video not found
 */
router.delete("/comment/:videoId/:commentId", deleteCommentFromVideo);

export default router;
