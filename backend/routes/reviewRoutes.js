const express = require("express");

const {
    addReview,
    getProductReviews,
    deleteReview
} = require("../controllers/reviewController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/:productId", protect, addReview);
router.get("/:productId", getProductReviews);
router.delete("/:id", protect, deleteReview);

module.exports = router;