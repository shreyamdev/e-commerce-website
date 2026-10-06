const Review = require("../models/Review");
const Product = require("../models/Product");

// Add review
const addReview = async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const { productId } = req.params;

        if (!rating || !comment) {
            return res.status(400).json({
                success: false,
                message: "Rating and comment are required"
            });
        }

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        const existingReview = await Review.findOne({
            product: productId,
            user: req.user.id
        });

        if (existingReview) {
            return res.status(400).json({
                success: false,
                message: "You have already reviewed this product"
            });
        }

        const review = await Review.create({
            product: productId,
            user: req.user.id,
            rating,
            comment
        });
        // Update product rating
        const reviews = await Review.find({ product: productId });

        const totalRating = reviews.reduce(
            (sum, item) => sum + item.rating,
            0
        );

        product.rating = totalRating / reviews.length;
        product.numReviews = reviews.length;

        await product.save();

        const populatedReview = await Review.findById(review._id)
            .populate("user", "name");

        res.status(201).json({
            success: true,
            message: "Review added successfully",
            review: populatedReview
        });

    } catch (error) {
        console.error("Add review error:", error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};
// Get product reviews
const getProductReviews = async (req, res) => {
    try {
        const reviews = await Review.find({
            product: req.params.productId
        })
            .populate("user", "name")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            reviews
        });

    } catch (error) {
        console.error("Get reviews error:", error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};
// Delete own review
const deleteReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);

        if (!review) {
            return res.status(404).json({
                success: false,
                message: "Review not found"
            });
        }

        if (review.user.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Not authorized to delete this review"
            });
        }

        const productId = review.product;

        await review.deleteOne();

        const reviews = await Review.find({
            product: productId
        });

        const product = await Product.findById(productId);

        if (product) {
            const totalRating = reviews.reduce(
                (sum, item) => sum + item.rating,
                0
            );

            product.rating = reviews.length
                ? totalRating / reviews.length
                : 0;

            product.numReviews = reviews.length;

            await product.save();
        }

        res.status(200).json({
            success: true,
            message: "Review deleted successfully"
        });

    } catch (error) {
        console.error("Delete review error:", error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};
module.exports = {
    addReview,
    getProductReviews,
    deleteReview
};