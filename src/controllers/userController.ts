import { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import uploadToCloudinary from "../middleware/cloudinary";
import User from "../models/userModel";

export default {
  addPost: async (req: Request, res: Response) => {
    const { name, username, image } = req.body;

    if (!req.file) {
      throw res.status(400).json({ error: "Nenhum arquivo foi enviado" });
    }

    const { path } = req.file;

    try {
      const result = await cloudinary.uploader.upload(path);
      let imageData = {};
      if (image) {
        const results = await uploadToCloudinary(image, "my-profile");
        imageData = results;
      }

      const user = await User.create({
        name,
        username,
        image: imageData,
      });
      // Remove o arquivo temporário após o upload
      fs.unlinkSync(path);

      res.status(200).json({ Data: result, user, path });
    } catch (err: any) {
      res.status(400).json({ error: err.message });
      console.error(err);
    }
  },
};
