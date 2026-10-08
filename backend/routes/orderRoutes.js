const express = require("express");

const {
    createOrder,
    getMyOrders,
    getOrderById,
    cancelOrder,
    getAllOrders,
    updateOrderStatus
} = require("../controllers/orderController");

const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/adminMiddleware");

const router = express.Router();

// User routes
router.post("/", protect, createOrder);
router.get("/my-orders", protect, getMyOrders);

// Admin routes
router.get("/", protect, adminOnly, getAllOrders);

// Specific order routes
router.get("/:id", protect, getOrderById);
router.put("/:id/cancel", protect, cancelOrder);
router.put("/:id/status", protect, adminOnly, updateOrderStatus);

module.exports = router;