import type {NextFunction, Request, Response} from "express";

export const roleMiddleWare = (...allowedRoles: string[]) => {
  return (req: any, res: Response, next: NextFunction) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      console.log("req user", req.user.role);
      return res.status(403).json({
        success: false,
        message: "You are not allowed to access this route",
      });
    }
    next();
  };
};
