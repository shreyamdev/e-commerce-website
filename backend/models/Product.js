const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true,
            trim: true
        },
        price: {
            type: Number,
            required: true,
            min: 0
        },
        category: {
            type: String,
            required: true,
            trim: true
        },
        image: {
            type: String,
            default: ""
        },
        stock: {
            type: Number,
            required: true,
            min: 0,
            default: 0
        },
        rating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5
        },
        numReviews: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Product", productSchema);