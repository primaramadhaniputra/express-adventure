import {type Request, type Response} from "express";
import * as AuthServices from "../services/authService.ts";
import bcrypt from "bcrypt";
import type {IAuth} from "../models/authModel.ts";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
  const {username, password, email} = req.body;

  const user = await AuthServices.register({email, username, password});

  return res.status(200).json({
    success: true,
    message: "Success create user",
    data: user,
  });
};

export const login = async (req: Request, res: Response) => {
  const {password, email} = req.body;

  const findUser = await AuthServices.getUserByEmail(email);

  if (!findUser) {
    const error = new Error("Wrong email / password");
    (error as any).status = 400; // Set status 404 Not Found
    throw error;
  }

  const isMatch = await bcrypt.compare(password, findUser.password);
  if (!isMatch) {
    const error = new Error("Wrong email / password");
    (error as any).status = 400; // Set status 404 Not Found
    throw error;
  }

  // Berhasil Login
  // Di sini nantinya Anda akan menambahkan JWT Token
  const payload = {
    id: findUser.id,
    email: findUser.email,
    username: findUser.username,
    role: findUser.role,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "1d",
  });

  return res.status(200).json({
    success: true,
    message: "Berhasil login",
    data: {
      token,
      user: {
        id: findUser.id,
        username: findUser.username,
        email: findUser.email,
      },
    },
  });
};

export const getListUsers = async (req: Request, res: Response) => {
  const user = await AuthServices.getListUsers();
  return res.status(200).json({
    success: true,
    message: "Success create user",
    data: user,
  });
};

export const forgotPassword = async (req: Request, res: Response) => {
  const {email} = req.body;

  const user = await AuthServices.getUserByEmail(email);

  if (!user) {
    const error: any = new Error("User not found");
    error.status = 400;
    throw error;
  }

  const token = await AuthServices["forgotPassword"](email);

  res.status(200).json({
    success: true,
    token,
  });
};

export const resetPassword = async (req: Request, res: Response) => {
  const {token} = req.query; // Diambil dari ?token=XYZ...
  const {password} = req.body;

  if (!token || !password) {
    return res.status(400).json({
      success: false,
      message: "token / password required",
    });
  }

  await AuthServices["resetPassword"](token as string, password);
  res.status(200).json({
    success: true,
    message: "Reset password success",
  });
};
