const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { getProfile } = require("../controllers/userController");

const router = express.Router();

router.get("/profile", protect, getProfile);

module.exports = router;