import { Request, Response } from "express";
import { getAllItems, getPaginatedItems } from "../services/dynamoDBService";
import { User } from "../models/user";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import { dynamoDB } from "../config/aws";

export const listUsers = async (req: Request, res: Response) => {
  try {
    let { recordesPerPage } = req.params;
    if (recordesPerPage == null) {
      recordesPerPage = "10";
    }
    const perPage = parseInt(recordesPerPage, 10);
    const { items, lastEvaluatedKey } = await getPaginatedItems(
      process.env.DYNAMODB_USERS_TABLE || "",
      perPage
    );
    res.status(200).json({
      message: "Users fetched successfully",
      items,
      lastKey: lastEvaluatedKey,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "List users failed",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const saltRounds = parseInt(process.env.SALT_ROUNDS || "10", 10);
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user: User = {
      userId: uuidv4(),
      username,
      email,
      password: hashedPassword,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lastActiveAt: "",
    };

    await dynamoDB
      .put({
        TableName: process.env.DYNAMODB_USERS_TABLE!,
        Item: user,
      })
      .promise();

    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Register user failed",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

export const getUserInfo = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "User ID is missing" });
    }

    let userData = await getAllItems(
      process.env.DYNAMODB_USERS_TABLE as string
    );

    userData = userData.filter((user: User) => user.userId === userId);
    const result = { Item: userData[0] };
    if (!result.Item) {
      return res.status(404).json({ message: "User not found" });
    }

    const { password, ...userInfo } = result.Item;

    res.status(200).json({
      message: "User info fetched successfully",
      user: userInfo,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Get user info failed",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};
