const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");

dotenv.config();

const products = [
    {
        name: "Wireless Mouse",
        description: "Ergonomic wireless mouse with adjustable DPI",
        price: 799,
        category: "Electronics",
        stock: 50
    },
    {
        name: "Mechanical Keyboard",
        description: "RGB mechanical keyboard with blue switches",
        price: 2499,
        category: "Electronics",
        stock: 30
    },
    {
        name: "Bluetooth Headphones",
        description: "Wireless headphones with noise cancellation",
        price: 1999,
        category: "Electronics",
        stock: 25
    },
    {
        name: "Smart Watch",
        description: "Fitness tracking smartwatch with heart-rate monitoring",
        price: 3499,
        category: "Electronics",
        stock: 20
    },
    {
        name: "Cotton T-Shirt",
        description: "Comfortable regular-fit cotton t-shirt",
        price: 599,
        category: "Clothing",
        stock: 100
    },
    {
        name: "Running Shoes",
        description: "Lightweight running shoes for everyday use",
        price: 2299,
        category: "Footwear",
        stock: 40
    },
    {
        name: "Backpack",
        description: "Water-resistant laptop backpack",
        price: 1299,
        category: "Accessories",
        stock: 60
    },
    {
        name: "Coffee Mug",
        description: "Ceramic coffee mug with 350ml capacity",
        price: 399,
        category: "Home",
        stock: 80
    },
    {
        name: "Laptop Stand",
        description: "Adjustable aluminium laptop stand",
        price: 1499,
        category: "Accessories",
        stock: 35
    },
    {
        name: "Desk Lamp",
        description: "LED desk lamp with adjustable brightness",
        price: 899,
        category: "Home",
        stock: 45
    }
];

const seedProducts = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected");

        await Product.deleteMany();

        await Product.insertMany(products);

        console.log("10 products inserted successfully");

        await mongoose.connection.close();

        process.exit(0);

    } catch (error) {
        console.error("Seeding error:", error.message);
        process.exit(1);
    }
};
seedProducts();