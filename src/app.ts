import express, {
  type Express,
  type NextFunction,
  type Request,
  type Response,
} from "express";
import authRouter from "./routes/authRoutes.ts";
import faqRouter from "./routes/faqRoutes.ts";
import blogRouter from "./routes/blogRoutes.ts";
import userRouter from "./routes/userRoutes.ts";
import {authMiddleWare} from "./middleware/authMiddleware.ts";

const app: Express = express();

app.use(express.json());

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", authMiddleWare, userRouter);
app.use("/api/v1/faq", authMiddleWare, faqRouter);
app.use("/api/v1/blog", authMiddleWare, blogRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Typescript With Express");
});

// Global eror handling
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.status || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal server error",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

export default app;
