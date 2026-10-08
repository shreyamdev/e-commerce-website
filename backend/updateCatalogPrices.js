const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");

dotenv.config();

const priceUpdates = {
  "Air Matrix Pulse Phantom": [7999, 11499],
  "Retro High OG \"Cyber Rust\"": [9499, 13499],
  "Heavyweight Acid-Wash Oversized Hoodie": [3499, 5499],
  "Cyber Samurai Graphic Boxy Tee": [1799, 2699],
  "Tactical Multi-Pocket Parachute Cargo": [3999, 5999],
  "Vortex Technical Weatherproof Bomber": [6999, 9999],
  "V2 Foam Runner \"Oatmeal\"": [7499, 9999],
  "Underground Modular Tactical Chest Rig": [2499, 3999],
  "Air Max Retro 97 \"Silver Bullet\"": [10999, 14999],
  "Acid Wash Raw Hem Graphic Tee": [1899, 2899],
  "Shadow Tech Utility Puffer Vest": [5999, 8499],
  "Skate High Reissue Sneaker": [6499, 8999]
};

async function syncCatalogPrices() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    let updated = 0;
    for (const [name, [price, originalPrice]] of Object.entries(priceUpdates)) {
      const result = await Product.updateOne(
        { name },
        { $set: { price, originalPrice } }
      );
      updated += result.modifiedCount || 0;
    }

    console.log(`INR catalog price sync complete. Updated ${updated} existing product(s).`);
  } catch (error) {
    console.error("Catalog price sync error:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close().catch(() => {});
  }
}

syncCatalogPrices();
