import express from "express";
import path from "path";
import upload from "./middleware/multer";
import { createUser } from "./controllers/userController";

const userRoutes = express.Router();

// Rota GET para servir o `index.html`
userRoutes.get("/", (req, res) => {
  const indexPath = path.join(__dirname, "..", "index.html");
  res.sendFile(indexPath, (err) => {
    if (err) {
      console.error("Erro ao enviar o arquivo:", err);
      res.status(500).send("Erro ao carregar o arquivo");
    }
  });
});

userRoutes.post('/upload', upload.single('image'), createUser);

export default userRoutes;
