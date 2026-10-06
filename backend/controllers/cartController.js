const Cart = require("../models/Cart");
const Product = require("../models/Product");

// Add product to cart
const addToCart = async (req, res) => {
    try {
        const { productId, quantity = 1 } = req.body;

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        if (product.stock < quantity) {
            return res.status(400).json({
                success: false,
                message: "Insufficient stock"
            });
        }

        let cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            cart = await Cart.create({
                user: req.user.id,
                items: [{ product: productId, quantity }]
            });
        } else {
            const existingItem = cart.items.find(
                item => item.product.toString() === productId
            );

            if (existingItem) {
                const newQuantity = existingItem.quantity + quantity;

                if (newQuantity > product.stock) {
                    return res.status(400).json({
                        success: false,
                        message: "Insufficient stock"
                    });
                }

                existingItem.quantity = newQuantity;
            } else {
                cart.items.push({
                    product: productId,
                    quantity
                });
            }

            await cart.save();
        }

        const updatedCart = await Cart.findById(cart._id)
            .populate("items.product");

        res.status(200).json({
            success: true,
            message: "Product added to cart",
            cart: updatedCart
        });

    } catch (error) {
        console.error("Add to cart error:", error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};
// Get cart
const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id })
            .populate("items.product");

        if (!cart) {
            return res.status(200).json({
                success: true,
                message: "Cart is empty",
                cart: {
                    items: [],
                    subtotal: 0
                }
            });
        }

        let subtotal = 0;

        cart.items.forEach(item => {
            subtotal += item.product.price * item.quantity;
        });

        res.status(200).json({
            success: true,
            cart,
            subtotal
        });

    } catch (error) {
        console.error("Get cart error:", error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};
// Update cart item quantity
const updateCartItem = async (req, res) => {
    try {
        const { quantity } = req.body;
        const { productId } = req.params;

        if (!quantity || quantity < 1) {
            return res.status(400).json({
                success: false,
                message: "Quantity must be at least 1"
            });
        }

        const cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            });
        }

        const item = cart.items.find(
            item => item.product.toString() === productId
        );

        if (!item) {
            return res.status(404).json({
                success: false,
                message: "Product not found in cart"
            });
        }

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        if (quantity > product.stock) {
            return res.status(400).json({
                success: false,
                message: "Insufficient stock"
            });
        }

        item.quantity = quantity;

        await cart.save();

        const updatedCart = await Cart.findById(cart._id)
            .populate("items.product");

        res.status(200).json({
            success: true,
            message: "Cart updated successfully",
            cart: updatedCart
        });

    } catch (error) {
        console.error("Update cart error:", error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};
// Remove item from cart
const removeFromCart = async (req, res) => {
    try {
        const { productId } = req.params;

        const cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            });
        }

        cart.items = cart.items.filter(
            item => item.product.toString() !== productId
        );

        await cart.save();

        const updatedCart = await Cart.findById(cart._id)
            .populate("items.product");

        res.status(200).json({
            success: true,
            message: "Product removed from cart",
            cart: updatedCart
        });

    } catch (error) {
        console.error("Remove cart item error:", error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};
// Clear cart
const clearCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            return res.status(200).json({
                success: true,
                message: "Cart already empty"
            });
        }

        cart.items = [];

        await cart.save();

        res.status(200).json({
            success: true,
            message: "Cart cleared successfully"
        });

    } catch (error) {
        console.error("Clear cart error:", error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};
module.exports = {
    addToCart,
    getCart,
    updateCartItem,
    removeFromCart,
    clearCart
};