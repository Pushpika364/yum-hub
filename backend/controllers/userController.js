import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credencials" });
    }

    const token = createToken(user._id);
    const { password: pass, ...rest } = user._doc;
    res
      .status(200)
      .cookie("ACCESS_TOKEN", token, { httpOnly: true })
      .json({ success: true, message: "Login successfull!", rest });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

//register user
const registerUser = async (req, res) => {
  const { name, password, email } = req.body;
  try {
    // Chechking is user already exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }
    // Validating email format & strong password
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.body.email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    if (password.length < 5) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }

    //hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = userModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    const token = createToken(user._id);
    const { password: pass, ...rest } = user._doc;

    res
      .status(200)
      .cookie("ACCESS_TOKEN", token, { httpOnly: true })
      .json({ success: true, message: "User registered successfull!", rest });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Internel server error!" });
  }
};

const signOutUser = async (req, res) => {
  try {
    res
      .clearCookie("ACCESS_TOKEN")
      .status(200)
      .json({ success: true, message: "User has been signed out!" });
  } catch (error) {
    nexr(error);
  }
};
export { loginUser, registerUser, signOutUser };
