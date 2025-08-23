import express from "express";
import multer from "multer";
import { commentOnVideo, deleteCommentFromVideo, listVideos, uploadVideo } from "../controllers/videoController";

const router = express.Router();
const upload = multer();

router.post("/upload", upload.single("video"), uploadVideo);
router.get("/list", listVideos);
router.post("/comment/:videoId", commentOnVideo);
router.delete("/comment/:videoId/:commentId", deleteCommentFromVideo);

export default router;
