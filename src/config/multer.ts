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

export const upload = multer({storage});
