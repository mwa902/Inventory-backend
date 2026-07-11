import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema(
  {
    Name: { type: String, required: true },
    company: { type: String, required: true },
    phone_number: { type: String, required: true },
    status: { type: String, default: "Inactive" },
  },
  { timestamps: true },
);

export default mongoose.model("Supplier", supplierSchema);
