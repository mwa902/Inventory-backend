import Supplier from "../models/supplier.js";
import Product from "../models/product.js";

const getAllSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.find();
    res.status(200).json(supplier);
  } catch (error) {
    console.error("Error fetching Supplier:", error);
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
};

const getSupplierById = async (req, res) => {
  try {
    const supplierId = req.params.id;
    const supplier = await Supplier.findById(supplierId);
    if (!supplier) {
      return res.status(404).json({ error: "Supplier not found" });
    }

    res.status(200).json({
      message: "Supplier Successful found",
      supplier,
    });
  } catch (error) {
    console.error("Error fetching Supplier by ID:", error);
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
};

const calculateSupplierTotal = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const safeQuantity = Number(quantity);
    if (Number.isNaN(safeQuantity) || safeQuantity <= 0) {
      return res
        .status(400)
        .json({ message: "Quantity must be greater than 0" });
    }

    const product = await Product.findById(productId).populate("supplier");
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const unitPrice = Number(
      product.purchase_price ?? product.selling_price ?? 0,
    );
    const total = safeQuantity * unitPrice;

    res.status(200).json({
      message: "Supplier total calculated successfully",
      supplierId: product.supplier?._id,
      productId,
      quantity: safeQuantity,
      unitPrice,
      total,
    });
  } catch (error) {
    console.error("Error calculating Supplier total:", error);
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
};

const createSupplier = async (req, res) => {
  try {
    const newSupplier = new Supplier(req.body);
    const savedSupplier = await newSupplier.save();
    res.status(201).json(savedSupplier);
  } catch (error) {
    console.error("Error creating Supplier:", error);
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
};

const updateSupplier = async (req, res) => {
  try {
    const supplierId = req.params.id;
    const updatedSupplier = await Supplier.findByIdAndUpdate(
      supplierId,
      req.body,
      {
        new: true,
      },
    );
    if (!updatedSupplier) {
      return res.status(404).json({ error: "Supplier not found" });
    }
    res.status(200).json(updatedSupplier);
  } catch (error) {
    console.error("Error updating Supplier:", error);
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
};

const deleteSupplierbyId = async (req, res) => {
  try {
    const supplierId = req.params.id;
    const deletedSupplier = await Supplier.findByIdAndDelete(supplierId);
    if (!deletedSupplier) {
      return res.status(404).json({ error: "Supplier not found" });
    }
    res.status(200).json({ message: "Supplier deleted successfully" });
  } catch (error) {
    console.error("Error deleting Supplier:", error);
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
};

export {
  getAllSupplier,
  getSupplierById,
  calculateSupplierTotal,
  createSupplier,
  updateSupplier,
  deleteSupplierbyId,
};
