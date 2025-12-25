import express, {Router} from "express";
import * as AuthControll from "../controllers/authController.ts";

const router: Router = express.Router();

router.get("/user", AuthControll["getListUsers"]);
router.post("/register", AuthControll["register"]);
router.post("/login", AuthControll["login"]);
router.post("/forgot-password", AuthControll["forgotPassword"]);

export default router;
