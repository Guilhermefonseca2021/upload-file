import { existsSync, mkdirSync } from "fs";
import multer from "multer"
import { resolve } from "path";


const path = resolve(__dirname, ".", "public", "images");
const port = process.env.PORT || 3333;

// Verifica se o diretório existe; se não, cria o diretório
if (!existsSync(path)) {
  mkdirSync(path, { recursive: true });
}

export default multer({
  storage: multer.diskStorage({}),
  fileFilter: (req: any, file, cb) => {
    let ext = path.toLowerCase();
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== 
".png" && ext !== ".PNG") {
      req.fileValidationError = "Forbidden extension";
    }
    cb(null, true);
  },
});