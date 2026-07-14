import mongoose from "mongoose";

const receiptItemSchema = new mongoose.Schema(
  {
    ProductDetail: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: { type: Number, required: true, min: 1, default: 1 },
    unitPrice: { type: Number, required: true, default: 0 },
    subtotal: { type: Number, required: true, default: 0 },
  },
  { _id: false }
);

const receiptSchema = new mongoose.Schema(
  {
    User: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: { type: [receiptItemSchema], required: true, default: [] },
    total: { type: Number, required: true, default: 0 },
    paymentMethod: { type: String, required: false, default: "Cash" },
  },
  { timestamps: true }
);

export default mongoose.model("Receipt", receiptSchema);
