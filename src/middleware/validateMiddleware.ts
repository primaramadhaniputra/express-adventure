import {type Request, type Response, type NextFunction} from "express";
import {ZodObject, ZodError} from "zod";

export const validate =
  (schema: ZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error: any) {
      // Pastikan ini adalah instance dari ZodError
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          message: "Validasi Gagal",
          // Gunakan .issues karena lebih stabil di banyak versi Zod
          errors: (error.issues || []).map((err) => ({
            // err.path[1] adalah nama field (misal 'email') jika schema dibungkus { body: ... }
            field: err.path[1] || err.path[0],
            message: err.message,
          })),
        });
      }

      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };
