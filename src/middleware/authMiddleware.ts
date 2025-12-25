import {type Request, type Response, type NextFunction} from "express";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
  user?: any;
}

export const authMiddleWare = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  // 1. Ambil token dari header authorization
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(403).json({success: false, message: "Forbidden"});
  }
};
