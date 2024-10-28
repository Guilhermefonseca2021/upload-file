import express from "express"
const postsRoutes = express.Router();
import postsController from './src/controllers/post'
import upload from "./src/middleware/multer"

postsRoutes.post("/addPost", upload.single("file"), postsController.addPost)

export default postsRoutes;