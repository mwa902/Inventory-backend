import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    product_name: { type: String, required: true },
    product_description: { type: String, required: true },
    purchase_price: { type: Number, required: true },
    selling_price: { type: Number, required: true },
    Stock: { type: Number, required: true },
    image: { type: String, required: false },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Product", productSchema);
