import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: "string", required: true },
    email: { type: "string", required: true, unique: true },
    password: { type: "string", required: true },
    cartData: { type: Object, default: {} },
  },
  { minimize: false },
  { timestamps: true }
);

const userModel = mongoose.model.user || mongoose.model("User", userSchema);
export default userModel;
