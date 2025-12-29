import multer from "multer";
import path from "path";
import fs from "fs";

// Pastikan folder uploads ada, jika tidak, buat otomatis
const uploadDir = "public/uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, {recursive: true});
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // folder tujuan
  },
  filename: (req, file, cb) => {
    // Membuat nama file unik: timestamp + ekstensi asli
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

export const upload = multer({
  storage,
  limits: {
    fileSize: 0.5 * 1024 * 1024, // batas 500kb
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimeType = allowedTypes.test(file.mimetype);

    if (extname && mimeType) {
      return cb(null, true);
    } else {
      cb(
        new Error("hanya diperbolehkan mengunggah gambar (jpeg/jpg/png/webp)!")
      );
    }
  },
});
