import { Request, Response } from "express";
import { getItemByParameter } from "../services/dynamoDBService";
import { User } from "../models/user";

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        message: "Required parameter missing",
      });
    }
    const userData = await getItemByParameter(
      process.env.DYNAMODB_USERS_TABLE as string,
      { username }
    );
    
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }
    const user: User = {
      username: userData.username,
      email: userData.email,
      password: userData.password,
      createdAt: userData.createdAt,
      updatedAt: userData.updatedAt,
    };
    return res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "User login failed",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};
