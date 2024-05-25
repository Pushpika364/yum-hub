import express from "express";
import cors from "cors";
import path from "path";  // Make sure to import path
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import 'dotenv/config';

// App config
const app = express();
const PORT = 4000;

// Middleware
app.use(express.json());
app.use(cors());

// Serve static files from the "uploads" directory
app.use('/uploads', express.static(path.join(path.resolve(), 'uploads')));

// DB Connection
connectDB();

// API endpoints
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/order", orderRouter);

app.listen(PORT, () => {
  console.log(`Server Started on http://localhost:${PORT}`);
});
