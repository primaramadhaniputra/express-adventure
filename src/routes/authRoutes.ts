import express, {Router} from "express";
import * as AuthControll from "../controllers/authController.ts";
import {validate} from "../middleware/validateMiddleware.ts";
import {
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
} from "../validations/authValidations.ts";
import {catchAsync} from "../utils/catchAsync.ts";

const router: Router = express.Router();

router.post(
  "/register",
  validate(registerSchema),
  catchAsync(AuthControll["register"])
);
router.post("/login", validate(loginSchema), catchAsync(AuthControll["login"]));
router.post(
  "/forgot-password",
  validate(forgotPasswordSchema),
  catchAsync(AuthControll["forgotPassword"])
);
router.post(
  "/reset-password",
  validate(resetPasswordSchema),
  catchAsync(AuthControll["resetPassword"])
);

export default router;
