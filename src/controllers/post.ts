import { Request, Response } from "express";
import cloudinary from "cloudinary";
import fs from "fs";

export default {
  addPost: async (req: Request, res: Response) => {
    const { prompt, media, size, canvas, description } = req.body;

    if (!req.file) {
      throw res.status(400).json({ error: "Nenhum arquivo foi enviado" });
    }

    const { path } = req.file;

    try {
      const result = await cloudinary.v2.uploader.upload(path);
      
      // let newPost = await Post.create({
      //   prompt: prompt,
      //   media: media,
      //   size: size,
      //   canvas: canvas,
      //   file: result.secure_url, //don't forget to append secure_url to the result from cloudinary
      //   cloudinaryId: result.public_id, //append publit_id to this one you need it to delete later
      //   description: description,
      //   user: req.user.id,
      // });

      fs.unlinkSync(path);

      // res.status(200).json(newPost);
      // Remove o arquivo temporário após o upload
    } catch (err: any) {
      res.status(400).json({ error: err.message });
      console.error(err);
    }
  },
};
