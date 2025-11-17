import jwt from 'jsonwebtoken'
import { User } from "../Models/userModel.js";

export const AuthMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ error: "unauthorized: no token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ error: "invalid token" });
    }

    const user = await User.findOne({ userName: decoded.userName });

    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }

    req.user = user;
    next();

  } catch (error) {
    console.log(`Error in AuthMiddleware: ${error.message}`);
    return res.status(500).json({ error: `internal server error ${error.message}` });
  }
};
