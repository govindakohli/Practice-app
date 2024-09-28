import User from "../model/userModel.js";
import jwt from "jsonwebtoken";

// Token generation function
export const generateToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken(); // This should be a method in the user schema
  const cookieName = "UserToken";
  
  res.status(statusCode)
    .cookie(cookieName, token, {
      expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
      httpOnly: true,  // Prevent access to cookie via JavaScript
      secure: process.env.NODE_ENV === "production", // Only allow cookies over HTTPS in production
      sameSite: "None", // Allow cross-site cookies (for frontend-backend communication)
    })
    .json({
      success: true,
      message,
      user,
      token,
    });
};

// Login Route
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide all details!",
      });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }

    const isPasswordMatched = await user.compareUserPassword(password);
    if (!isPasswordMatched) {
      return res.status(400).json({
        success: false,
        message: "Invalid password!",
      });
    }

    generateToken(user, "User logged in successfully", 200, res);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
