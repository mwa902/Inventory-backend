import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],

    subtotal: Number,
    tax: Number,
    discount: Number,
    totalAmount: Number,

    orderStatus: {
      type: String,
      enum: ["Pending", "Confirmed", "Delivered", "Cancelled"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Order",orderSchema);