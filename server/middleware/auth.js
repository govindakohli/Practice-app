import jwt from "jsonwebtoken";
import User from "../model/userModel.js"; // Adjust the path as necessary

export const isUserAuthenticated = async (req, res, next) => {
  try {
    // Get the token from cookies
    const token = req.cookies.UserToken;
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Patient not Authenticated!",
      });
    }

    // Verify the token
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    
    // Find the user by decoded token ID
    req.user = await User.findById(decode.id);
    
    // Proceed to the next middleware if the user is authenticated
    next();
  } catch (error) {
    // Handle any errors that occur during authentication
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
