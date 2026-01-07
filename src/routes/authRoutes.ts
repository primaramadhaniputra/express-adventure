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

/**
 * @openapi
 * /api/v1/auth/register:
 *   post:
 *     summary: Mendaftarkan user baru
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User berhasil dibuat
 *       400:
 *         description: Validasi gagal
 */

router.post(
  "/register",
  validate(registerSchema),
  catchAsync(AuthControll["register"])
);
/**
 * @openapi
 * /api/v1/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User berhasil masuk
 *       400:
 *         description: Validasi gagal
 */
router.post("/login", validate(loginSchema), catchAsync(AuthControll["login"]));

/**
 * @openapi
 * /api/v1/auth/forgot-password:
 *   post:
 *     summary: Forgot password user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: User berhasil masuk
 *       400:
 *         description: Validasi gagal
 */
router.post(
  "/forgot-password",
  validate(forgotPasswordSchema),
  catchAsync(AuthControll["forgotPassword"])
);

/**
 * @openapi
 * /api/v1/auth/reset-password:
 *   post:
 *     summary: Reset password user menggunakan token
 *     tags: [Auth]
 *     parameters:
 *       - in: query        # Bisa diganti 'path' jika rutenya /reset-password/:token
 *         name: token      # Nama parameter harus sama dengan di kodingan
 *         schema:
 *           type: string
 *         required: true
 *         description: Token reset password yang didapat dari email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 example: "passwordBaru123"
 *     responses:
 *       200:
 *         description: Password berhasil diubah
 *       400:
 *         description: Token tidak valid atau expired
 */
router.post(
  "/reset-password",
  validate(resetPasswordSchema),
  catchAsync(AuthControll["resetPassword"])
);

export default router;
