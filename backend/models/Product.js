const mongoose = require("mongoose");

const productColorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    hex: { type: String, default: "#111111", trim: true },
    imageIndex: { type: Number, default: 0, min: 0 }
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    brand: { type: String, default: "", trim: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    originalPrice: { type: Number, default: null, min: 0 },
    category: { type: String, required: true, trim: true },
    image: { type: String, default: "" },
    images: { type: [String], default: [] },
    colors: { type: [productColorSchema], default: [] },
    sizes: { type: [String], default: [] },
    badge: { type: String, default: "", trim: true },
    isTrending: { type: Boolean, default: false },
    isBestSeller: { type: Boolean, default: false },
    newArrival: { type: Boolean, default: false },
    specs: { type: mongoose.Schema.Types.Mixed, default: {} },
    stock: { type: Number, required: true, min: 0, default: 0 },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    numReviews: { type: Number, default: 0, min: 0 }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
