const Wishlist = require("../models/Wishlist");
const Product = require("../models/Product");

// Add product to wishlist
const addToWishlist = async (req, res) => {
    try {
        const { productId } = req.body;

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        let wishlist = await Wishlist.findOne({ user: req.user.id });

        if (!wishlist) {
            wishlist = await Wishlist.create({
                user: req.user.id,
                products: [productId]
            });
        } else {
            if (wishlist.products.some(id => id.toString() === productId)) {
                return res.status(400).json({
                    success: false,
                    message: "Product already in wishlist"
                });
            }

            wishlist.products.push(productId);
            await wishlist.save();
        }

        const updatedWishlist = await Wishlist.findById(wishlist._id)
            .populate("products");

        res.status(200).json({
            success: true,
            message: "Product added to wishlist",
            wishlist: updatedWishlist
        });

    } catch (error) {
        console.error("Add wishlist error:", error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};
// Get wishlist
const getWishlist = async (req, res) => {
    try {
        const wishlist = await Wishlist.findOne({
            user: req.user.id
        }).populate("products");

        if (!wishlist) {
            return res.status(200).json({
                success: true,
                wishlist: {
                    products: []
                }
            });
        }

        res.status(200).json({
            success: true,
            wishlist
        });

    } catch (error) {
        console.error("Get wishlist error:", error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};
// Remove product from wishlist
const removeFromWishlist = async (req, res) => {
    try {
        const { productId } = req.params;

        const wishlist = await Wishlist.findOne({
            user: req.user.id
        });

        if (!wishlist) {
            return res.status(404).json({
                success: false,
                message: "Wishlist not found"
            });
        }

        wishlist.products = wishlist.products.filter(
            id => id.toString() !== productId
        );

        await wishlist.save();

        const updatedWishlist = await Wishlist.findById(wishlist._id)
            .populate("products");

        res.status(200).json({
            success: true,
            message: "Product removed from wishlist",
            wishlist: updatedWishlist
        });

    } catch (error) {
        console.error("Remove wishlist error:", error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};
// Clear wishlist
const clearWishlist = async (req, res) => {
    try {
        const wishlist = await Wishlist.findOne({
            user: req.user.id
        });

        if (!wishlist) {
            return res.status(200).json({
                success: true,
                message: "Wishlist already empty"
            });
        }

        wishlist.products = [];
        await wishlist.save();

        res.status(200).json({
            success: true,
            message: "Wishlist cleared successfully"
        });

    } catch (error) {
        console.error("Clear wishlist error:", error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};
module.exports = {
    addToWishlist,
    getWishlist,
    removeFromWishlist,
    clearWishlist
};