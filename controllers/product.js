import Product from "../models/product.js";

const getAllProducts = async (req, res) => {
  try {
    const product = await Product.find();
    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching Product:", error);
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await User.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ error: "Product not found", message: error.message });
    }

    res.status(200).json({
      message: "Product Successful Founded",
      user,
    });
  } catch (error) {
    console.error("Error fetching Product by ID:", error);
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Error creating Product:", error);
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedProduct = await User.findByIdAndUpdate(productId, req.body, {
      new: true,
    });
    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error updating user:", error);
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
};

const deleteProductbyId = async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await User.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res
        .status(404)
        .json({ error: "Product not found", message: error.message });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting Product:", error);
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
};

export {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProductbyId,
};
