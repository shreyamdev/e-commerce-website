const express = require("express");

const {
    getProducts,
    getProduct,
    createProduct
} = require("../controllers/productController");

const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/adminMiddleware");

const router = express.Router();

// Public routes
router.get("/", getProducts);
router.get("/:id", getProduct);

// Admin route
router.post("/", protect, adminOnly, createProduct);
module.exports = router;