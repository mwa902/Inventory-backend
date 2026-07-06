import Supplier from "../models/supplier.js";

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
      return res
        .status(404)
        .json({ error: "Supplier not found", message: error.message });
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
    if (!deleteSupplier) {
      return res
        .status(404)
        .json({ error: "Supplier not found", message: error.message });
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
  createSupplier,
  updateSupplier,
  deleteSupplierbyId,
};
