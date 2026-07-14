import Receipt from "../models/receipt.js";
import Product from "../models/product.js";

const getAllReceipt = async (req, res) => {
  try {
    const receipts = await Receipt.find()
      .populate("User")
      .populate("items.ProductDetail");

    res.status(200).json(receipts);
  } catch (error) {
    console.error("Error fetching Receipt:", error);
    res.status(500).json({ error: "Internal server error", message: error.message });
  }
};

const getReceiptById = async (req, res) => {
  try {
    const receipt = await Receipt.findById(req.params.id)
      .populate("User")
      .populate("items.ProductDetail");

    if (!receipt) {
      return res.status(404).json({ error: "Receipt not found" });
    }

    res.status(200).json({ message: "Receipt Successful Founded", receipt });
  } catch (error) {
    console.error("Error fetching Receipt by ID:", error);
    res.status(500).json({ error: "Internal server error", message: error.message });
  }
};

// Calculate totals for a list of items before saving
// Body: { items: [{ productId, quantity }] }
const calculateReceiptTotal = async (req, res) => {
  try {
    const { items } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "items must be a non-empty array" });
    }

    let grandTotal = 0;
    const calculated = [];

    for (const item of items) {
      const { productId, quantity } = item;

      if (!productId) {
        return res.status(400).json({ message: "Each item must have a productId" });
      }

      const safeQuantity = Number(quantity);
      if (Number.isNaN(safeQuantity) || safeQuantity <= 0) {
        return res.status(400).json({ message: "Quantity must be greater than 0" });
      }

      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: `Product not found: ${productId}` });
      }

      const unitPrice = Number(product.selling_price ?? product.purchase_price ?? 0);
      const subtotal = safeQuantity * unitPrice;
      grandTotal += subtotal;

      calculated.push({ productId, quantity: safeQuantity, unitPrice, subtotal });
    }

    res.status(200).json({
      message: "Receipt total calculated successfully",
      items: calculated,
      total: grandTotal,
    });
  } catch (error) {
    console.error("Error calculating Receipt total:", error);
    res.status(500).json({ error: "Internal server error", message: error.message });
  }
};

// Create a receipt
// Body: { User, items: [{ ProductDetail, quantity }], paymentMethod }
// The controller looks up each product price and calculates totals automatically
const createReceipt = async (req, res) => {
  try {
    const { User, items, paymentMethod } = req.body;

    if (!User) {
      return res.status(400).json({ message: "User is required" });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "items must be a non-empty array" });
    }

    let grandTotal = 0;
    const resolvedItems = [];

    for (const item of items) {
      const { ProductDetail: productId, quantity } = item;

      if (!productId) {
        return res.status(400).json({ message: "Each item must have a ProductDetail (product ID)" });
      }

      const safeQuantity = Number(quantity);
      if (Number.isNaN(safeQuantity) || safeQuantity <= 0) {
        return res.status(400).json({ message: "Quantity must be greater than 0" });
      }

      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: `Product not found: ${productId}` });
      }

      const unitPrice = Number(item.unitPrice ?? product.selling_price ?? product.purchase_price ?? 0);
      const subtotal = safeQuantity * unitPrice;
      grandTotal += subtotal;

      resolvedItems.push({
        ProductDetail: productId,
        quantity: safeQuantity,
        unitPrice,
        subtotal,
      });
    }

    const newReceipt = new Receipt({
      User,
      items: resolvedItems,
      total: grandTotal,
      paymentMethod: paymentMethod || "Cash",
    });

    const savedReceipt = await newReceipt.save();

    // Re-fetch with populated fields for the response
    const populated = await Receipt.findById(savedReceipt._id)
      .populate("User")
      .populate("items.ProductDetail");

    res.status(201).json(populated);
  } catch (error) {
    console.error("Error creating Receipt:", error);
    res.status(500).json({ error: "Internal server error", message: error.message });
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
      createdAt: { $gte: startDate, $lte: today },
    });

    let totalSales = 0;
    receipts.forEach((receipt) => {
      totalSales += Number(receipt.total) || 0;
    });

    res.status(200).json({
      reportType: type,
      totalReceipts: receipts.length,
      totalSales,
      receipts,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  getAllReceipt,
  getReceiptById,
  calculateReceiptTotal,
  createReceipt,
  generateReport,
};
