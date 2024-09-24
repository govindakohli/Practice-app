export const generateToken = (user, message, statusCode, res) => {
    const token = user.generateJsonWebToken();
    const cookieName = "UserToken";
    res
      .status(statusCode)
      .cookie(cookieName, token, {
        expires: new Date(
          Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Ensures the cookie is sent only over HTTPS
        sameSite: "None",  // Ensures the cookie is sent with cross-site requests (use "Lax" or "Strict" if you don't need cross-site)
      })
      .json({
        status: true,
        message,
        user,
        token,
      });
  };