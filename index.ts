import express, { Express, Request, Response, Application } from "express";
import dotenv from "dotenv";
import multer from "multer";
import { resolve } from "path";
import { randomUUID } from "crypto";
import cors from "cors";
import { existsSync, mkdirSync } from "fs";
import postsRoutes from "./routes";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
 extended: true,
 })
);

const path = resolve(__dirname, ".", "public", "images");
const port = process.env.PORT || 3333;

// Verifica se o diretório existe; se não, cria o diretório
if (!existsSync(path)) {
  mkdirSync(path, { recursive: true });
}

const filterOption = (
  req: Request,
  file: Express.Multer.File,
  cb: (error: any, file: any) => any
) => {
  if (
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path);
  },
  filename: (req, file, cb) => {
    cb(null, `${new Date() + randomUUID()}`);
  },
});

const upload = multer({ storage: storage, fileFilter: filterOption });

app.post("/", upload.single("image"), (req, res) => {
  console.log(req.file);
  res.sendFile("index.html", { root: __dirname });
  res.status(200).json({ status: "success", message: "Upload successful!" });
});

app.use(postsRoutes)

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
  app.use(express.static("public"));
});
