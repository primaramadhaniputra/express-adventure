import {v2 as cloudinary} from "cloudinary";
import {CloudinaryStorage} from "multer-storage-cloudinary";
import multer from "multer";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

// konfigurasi kredensial
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
  api_key: process.env.CLOUDINARY_API_KEY as string,
  api_secret: process.env.CLOUDINARY_API_SECRET as string,
});

// Setup Storage Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: "express-adventure", // Nama folder di Cloudinary
      format: "webp", // Otomatis konversi semua ke webp
      allowed_formats: ["jpg", "png", "webp", "jpeg"],
      public_id: Date.now() + "-" + file.originalname.split(".")[0],
      transformation: [{width: 500, height: 500, crop: "limit"}], // Resize otomatis di cloud
    };
  },
});

export const uploadCloud = multer({
  storage: storage,
  limits: {
    fileSize: 1 * 1024 * 1024, // Contoh batas 1MB
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimeType = allowedTypes.test(file.mimetype);

    if (extname && mimeType) {
      cb(null, true);
    } else {
      // Error ini akan ditangkap oleh Global Error Handler Anda
      cb(new Error("Format file tidak didukung! Gunakan jpg/png/webp.") as any);
    }
  },
});
