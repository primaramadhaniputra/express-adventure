import express, {Router} from "express";
import * as AuthControll from "../controllers/authController.ts";
import {validate} from "../middleware/validateMiddleware.ts";
import {loginSchema, registerSchema} from "../validations/authValidations.ts";
import {authMiddleWare} from "../middleware/authMiddleware.ts";

const router: Router = express.Router();

router.get("/user", authMiddleWare, AuthControll["getListUsers"]);
router.post("/register", validate(registerSchema), AuthControll["register"]);
router.post("/login", validate(loginSchema), AuthControll["login"]);
router.post("/forgot-password", AuthControll["forgotPassword"]);
router.post("/reset-password", AuthControll["resetPassword"]);

export default router;
