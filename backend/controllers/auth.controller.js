import generateToken from "../config/token.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const singup = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    console.log( name, username, email, password )

    if (!name || !email || !password || !username) {
      return res.status(400).json({ message: "some fields are missing" });
    }

    const existEmail = await User.findOne({ email });
    if (existEmail) {
      return res.status(400).json({ message: "email already Exists" });
    }
    const existUsername = await User.findOne({ username });
    if (existUsername) {
      return res.status(400).json({ message: "username already Exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name: name,
      username: username,
      email: email,
      password: hashPassword,
    });

    const token = generateToken(user._id);
    const cookieOptions = {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    };

    res.cookie("token", token, cookieOptions);
    return res.status(201).json(user);
  } catch (error) {
    console.log("thi is signup error", error);
    return res.status(500).json({ message: "signup error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "some fields are missing" });
    }

    const existEmail = await User.findOne({ email });
    if (!existEmail) {
      return res.status(400).json({ message: "email does not Exists" });
    }

    const user = await User.findOne({ email: email }).select("-password");
    const token = generateToken(user._id);
    const cookieOptions = {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    };

    res.cookie("token", token, cookieOptions);
    return res.status(201).json(user);
  } catch (error) {
    console.log("thi is Login error", error);
    return res.status(500).json({ message: "login error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(201).json({ message: "Logout successfully" });
  } catch (error) {
    console.log("thi is Logout error", error);
    return res.status(500).json({ message: "logout  error" });
  }
};
