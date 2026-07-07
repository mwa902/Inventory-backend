import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

console.log("JWT SECRET:", process.env.JWT_SECRET);

const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    console.log("Error in verifying token:", error.message);

    res.status(401).json({
      message: "Invalid token",
      error: error.message,
    });
  }
};

export { verifyToken };
