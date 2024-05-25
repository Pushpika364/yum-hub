import express from "express";
import { addfood, getFood, listFood, removeFood } from "../controllers/foodController.js";
import multer from "multer";

const foodRouter = express.Router();

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

// Routes
foodRouter.get("/getfoods", getFood);
foodRouter.post("/addfoods", upload.single("image"), addfood); 
foodRouter.post("/remove", removeFood);
foodRouter.get("/list", listFood);

export default foodRouter;
