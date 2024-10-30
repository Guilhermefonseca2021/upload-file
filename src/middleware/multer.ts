import { randomUUID } from "crypto";
import { Request } from "express";
import { existsSync, mkdirSync } from "fs";
import multer, { FileFilterCallback } from "multer";
import { resolve } from "node:path";

const uploadPath = resolve(__dirname, "..", "..", "public", "_uploads");

if (!existsSync(uploadPath)) {
  mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${new Date().toISOString()}_${randomUUID()}`;
    cb(null, `${uniqueSuffix}_${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  fileFilter(req: Request, file: Express.Multer.File, cb: FileFilterCallback) {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

export default upload;
