import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import roleRoutes from "./routes/role.js";
import categoryRoutes from "./routes/category.js";
import supplierRoutes from "./routes/supplier.js";
import productRoutes from "./routes/product.js";
import orderRoutes from "./routes/order.js";

const app = express();
const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGODB_URI;

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "http://localhost:4173",
      "http://localhost:5000",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());

mongoose.set("strictQuery", true);

mongoose
  .connect(mongoUri)
  .then(() => console.log("✅ MongoDB connected:", mongoUri))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/role", roleRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/supplier", supplierRoutes);
app.use("/api/product", productRoutes);
app.use("/api/order", orderRoutes);

app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Inventory Backend is running" });
});

app.use((req, res) => {
  res
    .status(404)
    .json({ error: `Route not found: ${req.method} ${req.originalUrl}` });
});

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res
    .status(500)
    .json({ error: "Internal server error", message: err.message });
});

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
