const Product = require("../models/Product");

const getProducts = async (req, res) => {
  try {
    const {
      search,
      category,
      minPrice,
      maxPrice,
      sort,
      page = 1,
      limit = 8
    } = req.query;

    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { brand: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } }
      ];
    }

    if (category && category.toLowerCase() !== "all") {
      query.category = { $regex: category, $options: "i" };
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      query.price = {};
      if (minPrice !== undefined) query.price.$gte = Number(minPrice);
      if (maxPrice !== undefined) query.price.$lte = Number(maxPrice);
    }

    let sortOption = { createdAt: -1 };
    if (sort === "price_asc") sortOption = { price: 1 };
    if (sort === "price_desc") sortOption = { price: -1 };
    if (sort === "rating_desc") sortOption = { rating: -1 };
    if (sort === "newest") sortOption = { createdAt: -1 };

    const currentPage = Math.max(Number(page) || 1, 1);
    const itemsPerPage = Math.min(Math.max(Number(limit) || 8, 1), 100);
    const skip = (currentPage - 1) * itemsPerPage;

    const totalProducts = await Product.countDocuments(query);
    const products = await Product.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(itemsPerPage);

    const totalPages = Math.ceil(totalProducts / itemsPerPage);

    res.status(200).json({
      success: true,
      pagination: {
        currentPage,
        itemsPerPage,
        totalProducts,
        totalPages
      },
      products
    });
  } catch (error) {
    console.error("Get products error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, product });
  } catch (error) {
    console.error("Get product error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const createProduct = async (req, res) => {
  try {
    const {
      name, brand, description, price, originalPrice, category, image,
      images, colors, sizes, badge, isTrending, isBestSeller, isNew, newArrival, specs, stock
    } = req.body;

    if (!name || !description || price === undefined || !category) {
      return res.status(400).json({
        success: false,
        message: "Name, description, price and category are required"
      });
    }

    const product = await Product.create({
      name, brand, description, price, originalPrice, category, image,
      images, colors, sizes, badge, isTrending, isBestSeller,
      newArrival: newArrival ?? isNew,
      specs, stock
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product
    });
  } catch (error) {
    console.error("Create product error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    const fields = [
      "name", "brand", "description", "price", "originalPrice", "category", "image",
      "images", "colors", "sizes", "badge", "isTrending", "isBestSeller", "newArrival", "specs", "stock"
    ];

    fields.forEach((field) => {
      if (req.body[field] !== undefined) product[field] = req.body[field];
    });

    const updatedProduct = await product.save();
    res.status(200).json({ success: true, message: "Product updated successfully", product: updatedProduct });
  } catch (error) {
    console.error("Update product error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    await product.deleteOne();
    res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error("Delete product error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
};
