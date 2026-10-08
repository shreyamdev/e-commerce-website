const User = require("../models/User");

const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        console.error("Profile error:", error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};
module.exports = {
    getProfile
};