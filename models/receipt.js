import mongoose from "mongoose";

const receiptSchema = new mongoose.Schema(
  {
    User: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
    ProducDetail: {
      type: mongoose.Schema.ObjectId,
      ref: "product",
      required: true,
    },
    total: { type: String, required: true },
    paymentMethod: { type: String, required: false, default: "Cash" },
  },
  { timestamp: true },
);

export default mongoose.model("Receipt", receiptSchema);
