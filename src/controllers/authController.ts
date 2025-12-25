import {type Request, type Response} from "express";
import * as AuthServices from "../services/authService.ts";
import bcrypt from "bcrypt";
import type {IAuth} from "../models/authModel.ts";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
  try {
    const {username, password, email} = req.body;

    const user = await AuthServices.register({email, username, password});

    return res.status(200).json({
      success: true,
      message: "Success create user",
      data: user,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const {password, email} = req.body;

    // validasi fromat email (regex)
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Format email not valid",
      });
    }

    const findUser: IAuth = await AuthServices.getUserByEmail(email);
    if (!findUser) {
      return res.status(400).json({
        success: false,
        message: "Wrong email / password",
      });
    }

    const isMatch = await bcrypt.compare(password, findUser.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Wrong email / password",
      });
    }

    // Berhasil Login
    // Di sini nantinya Anda akan menambahkan JWT Token
    const payload = {
      id: findUser.id,
      email: findUser.email,
      username: findUser.username,
    };

    const secret = "";

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
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getListUsers = async (req: Request, res: Response) => {
  try {
    const user = await AuthServices.getListUsers();
    return res.status(200).json({
      success: true,
      message: "Success create user",
      data: user,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const {email} = req.body;
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email Required",
      });
    }

    const user = await AuthServices.getUserByEmail(email);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const token = await AuthServices["forgotPassword"](email);

    res.status(200).json({
      success: true,
      token,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
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
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
