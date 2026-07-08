import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const createAuthToken = async(user) => {
  console.log(process.env.JWT_SECRET);
  console.log(process.env.JWT_EXPIRES_IN);
  return await jwt.sign(
    {user}, 
    process.env.JWT_SECRET, 
    // {
    //   expiresIn: process.env.JWT_EXPIRES_IN
    // }
  );
}

const decodeAuthToken = async(token) => {
  const isVerified = await jwt.verify(token, process.env.JWT_SECRET);
  if (!isVerified) {
    return new Error("Invalid token");
  }
  return await jwt.decode(token, process.env.JWT_SECRET);
}

const decodeToken = async(req, res) => {
  try {
  const data = req.body;
  const token = data.token;
    const decoded = await decodeAuthToken(token);
    return res.status(200).json({ message: "Token decoded", decoded: decoded });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
}

const login = async (req, res) => {
  try {
    const data = req.body;
    console.log("Login data:", data);
    const user = await User.findOne({ email: data.email }).populate("role");
    if (!user) {
      return res.status(401).json({ message: "Invalid email" });
    }
    const isMatch = await bcrypt.compare(data.password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = await createAuthToken(user);
    return res
      .status(200)
      .json({ message: "login successfull", userData: user, token: token });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
};

const register = async (req, res) => {
  try {
    const data = req.body;
    console.log("Register data:", data);
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = new User({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: data.role,
    });
    await user.save();
    return res
      .status(201)
      .json({ message: "User registered successfully", userData: user });
  } catch (error) {
    console.error("Error during registration:", error);
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
};

export { login, register , decodeToken};
