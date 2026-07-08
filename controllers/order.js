import Order from "../models/order.js";
import Product from "../models/product.js";

const getAllOrders = async (req, res) => {
  try {
    const order = await Order.find();
    res.status(200).json(order);
  } catch (error) {
    console.error("Error fetching Order:", error);
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findById(orderId);
    if (!order) {
      return res
        .status(404)
        .json({ error: "Order not found", message: error.message });
    }

    res.status(200).json({
      message: "Order Successful Founded",
      order,
    });
  } catch (error) {
    console.error("Error fetching Order by ID:", error);
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
};

const createOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Error creating Order:", error);
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
};

const confirmOrder = async (req, res) => {
  try {
    const { order_id, status } = req.body;

    if (!order_id || !status) {
      return res.status(400).json({
        success: false,
        message: "Order ID and status are required",
      });
    }

    const order = await Order.findById(order_id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (status === "Confirmed") {
      order.status = "Confirmed";
      await order.save();

      const product = await Product.findById(order.product);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      product.stock += order.quantity;
      await product.save();

      return res
        .status(200)
        .json({
          success: true,
          message: "Order confirmed successfully.",
          currentStock: product.stock,
        });
    }

    if (status === "Cancelled") {
      order.status = "Cancelled";
      await order.save();

      return res
        .status(200)
        .json({ success: true, message: "Order cancelled successfully." });
    }

    return res.status(400).json({ success: false, message: "Invalid status" });
  } catch (error) {
    console.error(error);

    return res
      .status(500)
      .json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
  }
};

export { getAllOrders, getOrderById, createOrder, confirmOrder };
