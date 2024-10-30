import { Request, Response } from "express";
import uploadToCloudinary from "../middleware/cloudinary";
import User from "../models/userModel";
import { resolve } from "node:path";

const uploadedPath = resolve(__dirname, "..", "..", "public", "_uploads");

export async function createUser(req: Request, res: Response) {
  const { name, username, image } = req.body;

  try {
    let imageData = {};
    if (image) {
      const results = await uploadToCloudinary(image, uploadedPath);
      imageData = results;
    }

    const user = await User.create({
      name,
      username,
      image: imageData,
    });

    res.status(200).json({ message: `Arquivo enviado com sucesso! ${user}` });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
    console.error(err);
  }
}
