import type {Request, Response} from "express";
import * as UserService from "../services/userService.ts";
import {v2 as cloudinary} from "cloudinary";

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

export const getUploadSignature = async (req: Request, res: Response) => {
  const timestamp = Math.round(new Date().getTime() / 1000); // 10 menit doang

  // membuat tanda tangan digital (signature)
  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp: timestamp,
      folder: "express-adventure",
    },
    process.env.CLOUDINARY_API_SECRET as string
  );

  return res.status(200).json({
    success: true,
    data: {
      signature,
      timestamp,
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
    },
  });
};

export const updatePhotoProfileUsingUploadSignature = async (
  req: Request,
  res: Response
) => {
  const {imageUrl} = req.body;
  const userId = req.params.id;

  if (!imageUrl) {
    const error: any = new Error("Image url is required");
    error.status = 400;
    throw error;
  }

  await UserService.updatePhotoProfile(imageUrl, Number(userId));

  return res.status(200).json({
    success: true,
    message: "Success update photo profile",
    data: {
      url: imageUrl,
    },
  });
};
