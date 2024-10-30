import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./database/db";
import userRoutes from "./routes";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
); 

app.use(userRoutes);

connectDB().then(() => { 
  app.listen(process.env.PORT || 3333, () => {
    console.log(`Server is Fire at http://localhost:${process.env.port}`);
    app.use(express.static("public"));
  });
});
