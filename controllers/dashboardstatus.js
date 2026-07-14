import Product from "../models/product.js";
import User from "../models/user.js";
import Category from "../models/category.js";
import Supplier from "../models/supplier.js";
import Receipt from "../models/receipt.js";

const getAllData = async (req, res) => {
    try {
        const allProduct = await Product.countDocuments();
        const allUsers = await User.countDocuments();
        const allCategories = await Category.countDocuments();
        const allSuppliers = await Supplier.countDocuments();
        const allReceipts = await Receipt.countDocuments();;
        res.status(200).json({
            products: allProduct,
            users: allUsers,
            categories: allCategories,
            suppliers: allSuppliers,
            receipts: allReceipts
        })
    }
    catch (error) {
        res.status(500).json({
            message: "Error in fetching all data",
            error: error.message
        })
    }
}

export default getAllData