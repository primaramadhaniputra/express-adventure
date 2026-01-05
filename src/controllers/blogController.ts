import {type Request, type Response} from "express";
import * as BlogServices from "../services/blogService.ts";

export const createBlog = async (req: Request, res: Response) => {
  const {title, description, content} = req.body;
  const userEmail = (req as any).user.email;

  const user = await BlogServices["getUserByEmail"](userEmail);

  await BlogServices["createBlog"](
    Number(user!.id),
    title,
    description,
    content
  );

  return res.status(200).json({
    success: true,
    message: "Success create blog",
  });
};

export const getUserBlog = async (req: Request, res: Response) => {
  const userEmail = (req as any).user.email;

  const user = await BlogServices["getUserByEmail"](userEmail);

  const results = await BlogServices["getUserBlog"](Number(user!.id));

  return res.status(200).json({
    success: true,
    message: "Success get user blog",
    data: results,
  });
};

export const deleteBlog = async (req: Request, res: Response) => {
  const userEmail = (req as any).user.email;
  const {id} = req.params;

  const user = await BlogServices["getUserByEmail"](userEmail);

  await BlogServices["deleteBlog"](Number(id), Number(user!.id));

  return res.status(200).json({
    success: true,
    message: "Success delete blog",
  });
};
