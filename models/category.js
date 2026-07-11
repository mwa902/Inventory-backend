import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    category_name: { type: "string", required: true },
    description: { type: "string", required: true },
  },
  { timestamps: true },
);

export default mongoose.model("Category", categorySchema);
