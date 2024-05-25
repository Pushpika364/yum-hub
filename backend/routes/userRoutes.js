import express from "express";
import {loginUser, registerUser, signOutUser} from "../controllers/userController.js";

const  userRouter = express.Router();

userRouter.post("/register",registerUser)
userRouter.post("/login",loginUser)
userRouter.get("/signout",signOutUser)

export default userRouter;