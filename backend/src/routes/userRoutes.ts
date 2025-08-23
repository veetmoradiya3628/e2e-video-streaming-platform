import express from "express";
import { getUserInfo, listUsers, registerUser } from "../controllers/userController";
import auth from "./../middlewares/authMiddleware";

const router = express.Router();

router.get("/list", auth, listUsers);
router.post("/register", registerUser);
router.get("/get-info/:userId", getUserInfo);
export default router;
