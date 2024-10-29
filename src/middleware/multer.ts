import { randomUUID } from "crypto";
import { Request } from "express";
import { existsSync, mkdirSync } from "fs";
import multer, { FileFilterCallback } from "multer"
import { resolve } from "path";

const path = resolve(__dirname, ".", "public", "images");

if (!existsSync(path)) {
  mkdirSync(path, { recursive: true });
}
if (!existsSync(path)) {
  mkdirSync(path, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path);
  },
  filename: (req, file, cb) => {
    cb(null, `${new Date() + randomUUID()}`);
  },
});

const upload = multer({
  storage: storage,
  fileFilter(
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
  ) {
    if (
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});


export default upload;