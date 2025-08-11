import { Request, Response } from "express";
import { getItemByParameter } from "../services/dynamoDBService";
import bcrypt from "bcrypt";
import jwt, { Secret, SignOptions } from "jsonwebtoken";
import config from "./../config/config";

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

    const isValidPassword = await bcrypt.compare(password, userData.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const secret: Secret = config.jwtSecret;
    const options: SignOptions = { expiresIn: config.jwtExpiry };

    const token = jwt.sign(
      {
        sub: userData.userId,
        username: username,
      },
      secret,
      options
    );

    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "User login failed",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};
