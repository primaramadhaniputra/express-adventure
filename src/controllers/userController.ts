import type {Request, Response} from "express";
import * as UserService from "../services/userService.ts";

export const updatePhotoProfile = async (req: Request, res: Response) => {
  if (!req.file) {
    const error: any = new Error("Image required");
    error.status = 400;
    throw error;
  }

  const imagePath = req.file.path;
  const userId = req.params.id;

  await UserService.updatePhotoProfile(imagePath, Number(userId));

  return res.status(200).json({
    success: true,
    message: "Success update photo profile",
    data: {
      url: imagePath,
    },
  });
};

export const getListUsers = async (req: Request, res: Response) => {
  const user = await UserService.getListUsers();
  return res.status(200).json({
    success: true,
    message: "Success create user",
    data: user,
  });
};
