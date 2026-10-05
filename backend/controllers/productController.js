const Product = require("../models/Product");

// Get all products
const getProducts = async (req, res) => {
    try {
        const {
            search,
            category,
            minPrice,
            maxPrice,
            sort,
            page = 1,
            limit = 10
        } = req.query;

        const query = {};
        // Search by product name
        if (search) {
            query.name = {
                $regex: search,
                $options: "i"
            };
        }
        // Filter by category
        if (category) {
            query.category = {
                $regex: category,
                $options: "i"
            };
        }
        // Filter by price range
        if (minPrice !== undefined || maxPrice !== undefined) {
            query.price = {};

            if (minPrice !== undefined) {
                query.price.$gte = Number(minPrice);
            }

            if (maxPrice !== undefined) {
                query.price.$lte = Number(maxPrice);
            }
        }
        // Sorting
        let sortOption = { createdAt: -1 };

        if (sort === "price_asc") {
            sortOption = { price: 1 };
        } else if (sort === "price_desc") {
            sortOption = { price: -1 };
        } else if (sort === "rating_desc") {
            sortOption = { rating: -1 };
        } else if (sort === "newest") {
            sortOption = { createdAt: -1 };
        }
        // Pagination
        const currentPage = Math.max(Number(page), 1);
        const itemsPerPage = Math.max(Number(limit), 1);
        const skip = (currentPage - 1) * itemsPerPage;

        const totalProducts = await Product.countDocuments(query);

        const products = await Product.find(query)
            .sort(sortOption)
            .skip(skip)
            .limit(itemsPerPage);

        const totalPages = Math.ceil(totalProducts / itemsPerPage);

        res.status(200).json({
            success: true,
            pagination: {
                currentPage,
                itemsPerPage,
                totalProducts,
                totalPages
            },
            products
        });

    } catch (error) {
        console.error("Get products error:", error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};
// Get single product
const getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            product
        });

    } catch (error) {
        console.error("Get product error:", error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};
// Create product - Admin only
const createProduct = async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            category,
            image,
            stock
        } = req.body;

        if (!name || !description || price === undefined || !category) {
            return res.status(400).json({
                success: false,
                message: "Name, description, price and category are required"
            });
        }

        const product = await Product.create({
            name,
            description,
            price,
            category,
            image,
            stock
        });

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            product
        });

    } catch (error) {
        console.error("Create product error:", error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};
// Update product - Admin only
const updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        const {
            name,
            description,
            price,
            category,
            image,
            stock
        } = req.body;

        product.name = name ?? product.name;
        product.description = description ?? product.description;
        product.price = price ?? product.price;
        product.category = category ?? product.category;
        product.image = image ?? product.image;
        product.stock = stock ?? product.stock;

        const updatedProduct = await product.save();

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            product: updatedProduct
        });

    } catch (error) {
        console.error("Update product error:", error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};
// Delete product - Admin only
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        await product.deleteOne();

        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });

    } catch (error) {
        console.error("Delete product error:", error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};
module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
};