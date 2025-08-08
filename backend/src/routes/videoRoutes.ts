import express from "express";
import multer from "multer";
import { listVideos, uploadVideo } from "../controllers/videoController";

const router = express.Router();
const upload = multer();

router.post("/upload", upload.single("video"), uploadVideo);
router.get("/list", listVideos);
export default router;
