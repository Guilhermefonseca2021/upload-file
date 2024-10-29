import express from "express";
const userRoutes = express.Router();
import upload from "./middleware/multer";

userRoutes.post("/", upload.single("image"), (req, res) => {
  console.log(req.file);
  res.sendFile("../index.html", { root: __dirname });
  res.status(200).json({ status: "success", message: "Upload successful!" });
});

export default userRoutes;

