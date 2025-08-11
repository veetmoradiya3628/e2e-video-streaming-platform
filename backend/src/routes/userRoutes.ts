import express from "express";
import { listUsers, registerUser } from "../controllers/userController";
import auth from "./../middlewares/authMiddleware";

const router = express.Router();

router.get("/list", auth, listUsers);
router.post("/register", registerUser);

export default router;
