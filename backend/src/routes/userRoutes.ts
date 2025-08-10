import express from "express";
import { listUsers, registerUser } from "../controllers/userController";

const router = express.Router();

router.get("/list", listUsers);
router.post("/register", registerUser);

export default router;
