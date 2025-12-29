import express, {Router} from "express";
import {authMiddleWare} from "../middleware/authMiddleware.ts";
import {catchAsync} from "../utils/catchAsync.ts";
import * as UserController from "../controllers/userController.ts";
import {upload} from "../config/multer.ts";

const router: Router = express.Router();

router.get("/", authMiddleWare, catchAsync(UserController["getListUsers"]));
router.patch(
  "/photo-profile/:id",
  authMiddleWare,
  upload.single("photo-profile"),
  catchAsync(UserController["updatePhotoProfile"])
);

export default router;
