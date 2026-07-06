import User from "../models/user.js";
import bcrypt from "bcryptjs";

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

    return res
      .status(200)
      .json({ message: "login successfull", userData: user });
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

export { login, register };
