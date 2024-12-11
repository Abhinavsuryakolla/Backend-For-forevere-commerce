import validator from "validator";
import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECERT);
};
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: "false", message: "user not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    
    if (isMatch) {
      const token = createToken(user._id);
      res.json({ success: "true", token });
    } else {
      res.json({ success: "false", message: "Invalid Email or password" });
    }
  } catch (error) {
    res.json({ success: "false", message: error.message });
  }
};
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if this exist
    const isExist = await userModel.findOne({ email });
    if (isExist) {
      return res.json({ success: "false", message: "user already exist" });
    }
    // validate email and password
    if (!validator.isEmail(email)) {
      return res.json({
        success: "false",
        message: "Please Enter a valid email ",
      });
    }

    if (password.length < 8) {
      return res.json({
        success: "false",
        message: "Please Enter a strong password ",
      });
    }

    // hashing password

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashPassword,
    });

    const user = await newUser.save();

    const token = createToken(user._id);

    res.json({ success: "true", token });
  } catch (error) {
    console.log(error);
    res.json({ success: "false", message: error.message });
  }
};
export const adminLogin = async (req, res) => {
  res.json({ msg: "admin API working" });
};
