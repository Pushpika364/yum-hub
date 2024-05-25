import mongoose from "mongoose";
import dotenv from "dotenv/config";

export const connectDB = async () => {
  try {
    await mongoose
      .connect(process.env.MONGODB_URL)
      .then(() => console.log("DB Connected"))
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
  }
};
