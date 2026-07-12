import Receipt from "../models/receipt.js";
import Product from "../models/product.js";

const getAllReceipt = async (req, res) => {
  try {
    const receipt = await Receipt.find()
      .populate("User")
      .populate("ProductDetail");

    res.status(200).json(receipt);
  } catch (error) {
    console.error("Error fetching Receipt:", error);
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
};

const getReceiptById = async (req, res) => {
  try {
    const receiptId = req.params.id;
    const receipt = await Receipt.findById(receiptId)
      .populate("User")
      .populate("ProductDetail");

    if (!receipt) {
      return res.status(404).json({ error: "Receipt not found" });
    }

    res.status(200).json({
      message: "Receipt Successful Founded",
      receipt,
    });
  } catch (error) {
    console.error("Error fetching Receipt by ID:", error);
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
};

const calculateReceiptTotal = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const safeQuantity = Number(quantity);
    if (Number.isNaN(safeQuantity) || safeQuantity <= 0) {
      return res.status(400).json({ message: "Quantity must be greater than 0" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const unitPrice = Number(product.selling_price ?? product.purchase_price ?? 0);
    const total = safeQuantity * unitPrice;

    res.status(200).json({
      message: "Receipt total calculated successfully",
      productId,
      quantity: safeQuantity,
      unitPrice,
      total,
    });
  } catch (error) {
    console.error("Error calculating Receipt total:", error);
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
};

const createReceipt = async (req, res) => {
  try {
    const newReceipt = new Receipt(req.body);
    const savedReceipt = await newReceipt.save();
    res.status(201).json(savedReceipt);
  } catch (error) {
    console.error("Error creating Receipt:", error);
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
};

const generateReport = async (req, res) => {
  try {
    const { type } = req.query;

    const today = new Date();
    let startDate = new Date();

    if (type === "week") {
      startDate.setDate(today.getDate() - 7);
    } else if (type === "month") {
      startDate = new Date(today.getFullYear(), today.getMonth(), 1);
    } else if (type === "year") {
      startDate = new Date(today.getFullYear(), 0, 1);
    } else {
      return res.status(400).json({ message: "Invalid report type" });
    }

    const receipts = await Receipt.find({
      createdAt: {
        $gte: startDate,
        $lte: today,
      },
    });

    let totalSales = 0;

    receipts.forEach((receipt) => {
      totalSales += Number(receipt.total) || 0;
    });

    res.status(200).json({
      reportType: type,
      totalReceipts: receipts.length,
      totalSales: totalSales,
      receipts,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export {
  getAllReceipt,
  getReceiptById,
  calculateReceiptTotal,
  createReceipt,
  generateReport,
};
