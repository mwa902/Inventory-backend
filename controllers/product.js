import Product from "../models/product.js";

const createProduct = async(req, res) => {
    try{
        const data = req.body;
        const product = new Product(data);
        await product.save();
        return res.status(201).json({ message: "Product created", product: product });
    } catch (error) {
        res
            .status(500)
            .json({ error: "Internal server error", message: error.message });
    }
}

export { createProduct };