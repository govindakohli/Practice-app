import jwt from 'jsonwebtoken';
import User from "../model/userModel.js";

export const isUserAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.UserToken; // Get token from cookie

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated. No token found.",
      });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
