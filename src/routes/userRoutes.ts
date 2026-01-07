import express, {Router} from "express";
import {authMiddleWare} from "../middleware/authMiddleware.ts";
import {catchAsync} from "../utils/catchAsync.ts";
import * as UserController from "../controllers/userController.ts";
import {upload} from "../config/multer.ts";
import {uploadCloud} from "../config/cloudinary.ts";

const router: Router = express.Router();

/**
 * @openapi
 * /api/v1/user:
 *   get:
 *     summary: Mendapatkan daftar semua user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []  # Ini akan memunculkan ikon gembok di Swagger UI
 *     responses:
 *       200:
 *         description: Berhasil mengambil daftar user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       username:
 *                         type: string
 *                       email:
 *                         type: string
 *       401:
 *         description: Tidak terautentikasi (Token hilang atau salah)
 *       403:
 *         description: Forbidden (Role tidak diizinkan)
 */
router.get("/", authMiddleWare, catchAsync(UserController["getListUsers"]));

/**
 * @openapi
 * /api/v1/user/photo-profile/{id}:
 *   patch:                  # Gunakan patch karena ini proses update
 *     summary: Update user photo profile (Upload File)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID user yang akan diupdate fotonya
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:   # WAJIB: Gunakan format ini untuk file
 *           schema:
 *             type: object
 *             properties:
 *               image:           # Nama field ini harus sama dengan di Multer .single('image')
 *                 type: string
 *                 format: binary # WAJIB: Memberitahu Swagger bahwa ini adalah file
 *     responses:
 *       200:
 *         description: Foto profil berhasil diperbarui
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     url:
 *                       type: string
 *       400:
 *         description: File tidak didukung atau terlalu besar
 *       401:
 *         description: Tidak terautentikasi
 */

router.patch(
  "/photo-profile/:id",
  authMiddleWare,
  // upload.single("photo-profile"),
  uploadCloud.single("photo-profile"),
  catchAsync(UserController["updatePhotoProfile"])
);
router.get(
  "/upload-signature",
  authMiddleWare,
  catchAsync(UserController["getUploadSignature"])
);
router.patch(
  "/upload-signature/:id",
  authMiddleWare,
  catchAsync(UserController["updatePhotoProfileUsingUploadSignature"])
);

export default router;
