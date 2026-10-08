const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");

dotenv.config();

// Catalog synced from the storefront so frontend and backend use the same products.
// This script removes only the old demo seed items and replaces the HYPED catalog.
const legacyProductNames = [
  "Wireless Mouse",
  "Mechanical Keyboard",
  "Bluetooth Headphones",
  "Smart Watch",
  "Cotton T-Shirt",
  "Running Shoes",
  "Backpack",
  "Coffee Mug",
  "Laptop Stand",
  "Desk Lamp"
];
const products = [
  {
    "name": "Air Matrix Pulse Phantom",
    "brand": "Nike",
    "description": "Engineered for street-level velocity. The Air Matrix Pulse phantom combines responsive dual-pod cushioning with lightweight aerodynamic mesh upper and high-traction rubber waffle outsole.",
    "price": 7999,
    "originalPrice": 11499,
    "category": "sneakers",
    "image": "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1000&q=80",
    "images": [
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1000&q=80"
    ],
    "stock": 8,
    "rating": 4.9,
    "numReviews": 1420,
    "badge": "Trending 🔥",
    "isTrending": true,
    "isBestSeller": true,
    "newArrival": false,
    "colors": [
      {
        "name": "Onyx Black",
        "hex": "#111111",
        "imageIndex": 0
      },
      {
        "name": "Pure Platinum",
        "hex": "#E5E7EB",
        "imageIndex": 1
      },
      {
        "name": "Crimson Pulse",
        "hex": "#FF3E6C",
        "imageIndex": 2
      }
    ],
    "sizes": [
      "UK 7",
      "UK 8",
      "UK 9",
      "UK 10",
      "UK 11"
    ],
    "specs": {
      "Style Code": "NK-AMP-9021",
      "Upper Material": "Engineered Breathable Mesh & Leather overlays",
      "Midsole": "Dual-density foam with Zoom Air cushioning",
      "Closure": "Lace-Up system with reflective accents",
      "Origin": "Imported (Authenticity Verified)"
    }
  },
  {
    "name": "Retro High OG \"Cyber Rust\"",
    "brand": "Jordan",
    "description": "An immortal silhouette reborn with distressed suede panels, iconic wings emblem, and aged sail midsoles for that quintessential high-end vintage aesthetic.",
    "price": 9499,
    "originalPrice": 13499,
    "category": "sneakers",
    "image": "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1000&q=80",
    "images": [
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1579338559194-a162d19bf842?auto=format&fit=crop&w=1000&q=80"
    ],
    "stock": 4,
    "rating": 4.8,
    "numReviews": 980,
    "badge": "Iconic Drop",
    "isTrending": true,
    "isBestSeller": true,
    "newArrival": false,
    "colors": [
      {
        "name": "Rust & Obsidian",
        "hex": "#8B4513",
        "imageIndex": 0
      },
      {
        "name": "Classic Shadow",
        "hex": "#374151",
        "imageIndex": 1
      }
    ],
    "sizes": [
      "UK 7.5",
      "UK 8.5",
      "UK 9.5",
      "UK 10.5"
    ],
    "specs": {
      "Style Code": "JD-RET-5541",
      "Upper Material": "Premium Full-Grain Suede & Leather",
      "Sole Material": "Durable vulcanized rubber cupsole",
      "Collar Height": "High-Top padded support",
      "Origin": "Imported"
    }
  },
  {
    "name": "Heavyweight Acid-Wash Oversized Hoodie",
    "brand": "Vortex Labs",
    "description": "Cut from 480 GSM French Terry loopback cotton. Features a double-layered hood without drawstrings for a clean architectural drape, dropped shoulders, and ribbed cuffs.",
    "price": 3499,
    "originalPrice": 5499,
    "category": "hoodies",
    "image": "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80",
    "images": [
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1000&q=80"
    ],
    "stock": 15,
    "rating": 4.9,
    "numReviews": 654,
    "badge": "Street Essential",
    "isTrending": true,
    "isBestSeller": false,
    "newArrival": true,
    "colors": [
      {
        "name": "Washed Charcoal",
        "hex": "#262626",
        "imageIndex": 0
      },
      {
        "name": "Vintage Olive",
        "hex": "#4B5320",
        "imageIndex": 1
      },
      {
        "name": "Faded Plum",
        "hex": "#4A235A",
        "imageIndex": 2
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "specs": {
      "GSM": "480 GSM Ultra-Heavyweight",
      "Fabric": "100% Combed Organic Cotton",
      "Fit": "Oversized Boxy Silhouette",
      "Wash Care": "Cold machine wash inside out",
      "Origin": "Crafted in Portugal"
    }
  },
  {
    "name": "Cyber Samurai Graphic Boxy Tee",
    "brand": "The Souled Street",
    "description": "Vibrant cyberpunk neon screen print on dense 240 GSM pre-shrunk cotton. Boxy cut with reinforced crew neck collar that holds structure wash after wash.",
    "price": 1799,
    "originalPrice": 2699,
    "category": "t-shirts",
    "image": "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80",
    "images": [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=80"
    ],
    "stock": 22,
    "rating": 4.7,
    "numReviews": 820,
    "badge": "Anime Collab ⚡",
    "isTrending": true,
    "isBestSeller": true,
    "newArrival": false,
    "colors": [
      {
        "name": "Jet Black",
        "hex": "#111111",
        "imageIndex": 0
      },
      {
        "name": "Off White",
        "hex": "#F3F4F6",
        "imageIndex": 1
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "specs": {
      "GSM": "240 GSM Pre-Shrunk Single Jersey",
      "Print": "High-density puff screen print",
      "Fit": "Relaxed Drop Shoulder",
      "Neckline": "Thick 1.25\" rib knit crew",
      "Origin": "Made in India"
    }
  },
  {
    "name": "Tactical Multi-Pocket Parachute Cargo",
    "brand": "Off-Grid Co.",
    "description": "Ripstop nylon construction equipped with 8 ergonomic magnetic cargo pockets, bungee cord hem adjusters to switch from wide flare to stacked jogger cuffs in seconds.",
    "price": 3999,
    "originalPrice": 5999,
    "category": "cargo",
    "image": "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1000&q=80",
    "images": [
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1000&q=80"
    ],
    "stock": 7,
    "rating": 4.8,
    "numReviews": 432,
    "badge": "Best Seller ⭐",
    "isTrending": false,
    "isBestSeller": true,
    "newArrival": false,
    "colors": [
      {
        "name": "Military Olive",
        "hex": "#3B4D3C",
        "imageIndex": 0
      },
      {
        "name": "Stealth Black",
        "hex": "#18181B",
        "imageIndex": 1
      },
      {
        "name": "Desert Dune",
        "hex": "#C2B280",
        "imageIndex": 2
      }
    ],
    "sizes": [
      "30",
      "32",
      "34",
      "36"
    ],
    "specs": {
      "Material": "DWR Water-Resistant Ripstop Nylon",
      "Hardware": "YKK zippers & magnetic pocket clasps",
      "Waistband": "Elasticated waist with heavy webbed belt",
      "Fit": "Adjustable Parachute Silhouette",
      "Origin": "Imported"
    }
  },
  {
    "name": "Vortex Technical Weatherproof Bomber",
    "brand": "Vortex Labs",
    "description": "Futuristic silhouette designed with waterproof seam-sealed membrane, interior utility sling straps for easy hands-free carry when indoors, and thermal insulation.",
    "price": 6999,
    "originalPrice": 9999,
    "category": "jackets",
    "image": "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=80",
    "images": [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=1000&q=80"
    ],
    "stock": 5,
    "rating": 4.9,
    "numReviews": 512,
    "badge": "Limited Drop",
    "isTrending": true,
    "isBestSeller": false,
    "newArrival": true,
    "colors": [
      {
        "name": "Matte Obsidian",
        "hex": "#1C1917",
        "imageIndex": 0
      },
      {
        "name": "Silver Slate",
        "hex": "#94A3B8",
        "imageIndex": 1
      }
    ],
    "sizes": [
      "M",
      "L",
      "XL"
    ],
    "specs": {
      "Shell": "Triple-layer breathable Gore-tex style laminate",
      "Lining": "Quilted aerospace thermal polyester",
      "Utility": "Interior carry harness & sleeve card pocket",
      "Pockets": "4 exterior storm flap pockets",
      "Origin": "Crafted in Japan"
    }
  },
  {
    "name": "V2 Foam Runner \"Oatmeal\"",
    "brand": "Yeezy Inspired",
    "description": "One-piece molded EVA foam shoe engineered using harvested algae technology. Sculptural cutouts provide maximum ventilation and ultra-cushioned stride.",
    "price": 7499,
    "originalPrice": 9999,
    "category": "sneakers",
    "image": "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=1000&q=80",
    "images": [
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1512374382149-233c42b6a83b?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?auto=format&fit=crop&w=1000&q=80"
    ],
    "stock": 18,
    "rating": 4.6,
    "numReviews": 1102,
    "badge": "Future Wave",
    "isTrending": false,
    "isBestSeller": true,
    "newArrival": false,
    "colors": [
      {
        "name": "Oatmeal Mist",
        "hex": "#D7CEC7",
        "imageIndex": 0
      },
      {
        "name": "Pitch Black",
        "hex": "#171717",
        "imageIndex": 1
      }
    ],
    "sizes": [
      "UK 7",
      "UK 8",
      "UK 9",
      "UK 10",
      "UK 11"
    ],
    "specs": {
      "Construction": "Single mold injected EVA & Algae foam",
      "Weight": "210g ultra-featherweight",
      "Cushioning": "Cloud-step responsive footbed",
      "Care": "Waterproof and easy to hand wipe clean",
      "Origin": "Imported"
    }
  },
  {
    "name": "Underground Modular Tactical Chest Rig",
    "brand": "Underground Clan",
    "description": "Ballistic Cordura 1000D harness bag featuring multi-compartment internal organizers, quick-release Cobra-style metal buckles, and Molle attachment loops.",
    "price": 2499,
    "originalPrice": 3999,
    "category": "accessories",
    "image": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80",
    "images": [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80"
    ],
    "stock": 12,
    "rating": 4.7,
    "numReviews": 310,
    "badge": "Hot Drop 🔥",
    "isTrending": true,
    "isBestSeller": false,
    "newArrival": true,
    "colors": [
      {
        "name": "Tactical Black",
        "hex": "#111111",
        "imageIndex": 0
      },
      {
        "name": "Camo Smoke",
        "hex": "#4B5563",
        "imageIndex": 1
      }
    ],
    "sizes": [
      "One Size Fits All"
    ],
    "specs": {
      "Material": "1000D Cordura Waterproof Fabric",
      "Buckles": "Industrial zinc-alloy quick release",
      "Straps": "Fully adjustable 4-point chest harness",
      "Dimensions": "24cm x 17cm x 5cm",
      "Origin": "Handcrafted"
    }
  },
  {
    "name": "Air Max Retro 97 \"Silver Bullet\"",
    "brand": "Nike",
    "description": "Inspired by Japanese bullet trains, the fluid water-ripple piping and full-length visible Max Air unit give you unprecedented comfort and unmatched street status.",
    "price": 10999,
    "originalPrice": 14999,
    "category": "sneakers",
    "image": "https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=1000&q=80",
    "images": [
      "https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1597045566677-8cf032ed6634?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=1000&q=80"
    ],
    "stock": 6,
    "rating": 4.9,
    "numReviews": 2240,
    "badge": "Nike Classic",
    "isTrending": true,
    "isBestSeller": true,
    "newArrival": false,
    "colors": [
      {
        "name": "Metallic Silver",
        "hex": "#C0C0C0",
        "imageIndex": 0
      },
      {
        "name": "Triple White",
        "hex": "#F9FAFB",
        "imageIndex": 1
      }
    ],
    "sizes": [
      "UK 8",
      "UK 9",
      "UK 10",
      "UK 11"
    ],
    "specs": {
      "Style Code": "NK-AM97-SLV",
      "Upper": "Synthetic leather with 3M reflective wave bands",
      "Cushioning": "Full-length transparent Air-Sole unit",
      "Traction": "Waffle patterned rubber tread",
      "Origin": "Imported"
    }
  },
  {
    "name": "Acid Wash Raw Hem Graphic Tee",
    "brand": "Underground Clan",
    "description": "Enzyme-stone washed for 12 hours to achieve that authentic vintage softness. Features raw edge distress details and hand-printed gothic typography.",
    "price": 1899,
    "originalPrice": 2899,
    "category": "t-shirts",
    "image": "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=80",
    "images": [
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=1000&q=80"
    ],
    "stock": 19,
    "rating": 4.7,
    "numReviews": 390,
    "badge": "Vintage Wash",
    "isTrending": false,
    "isBestSeller": false,
    "newArrival": true,
    "colors": [
      {
        "name": "Mineral Stone",
        "hex": "#71717A",
        "imageIndex": 0
      },
      {
        "name": "Faded Earth",
        "hex": "#78350F",
        "imageIndex": 1
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "specs": {
      "Fabric": "100% Ring-Spun Heavyweight Cotton",
      "GSM": "260 GSM Heavy Gauge",
      "Treatment": "Manual mineral acid wash finish",
      "Fit": "Oversized Skate Cut",
      "Origin": "Crafted in USA"
    }
  },
  {
    "name": "Shadow Tech Utility Puffer Vest",
    "brand": "Off-Grid Co.",
    "description": "Warmth without bulk. Constructed with synthetic down fill, water-resistant matte nylon shell, oversized funnel collar, and dual-direction two-way tactical zipper.",
    "price": 5999,
    "originalPrice": 8499,
    "category": "jackets",
    "image": "https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=1000&q=80",
    "images": [
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=1000&q=80"
    ],
    "stock": 9,
    "rating": 4.8,
    "numReviews": 280,
    "badge": "Winter Drop ❄️",
    "isTrending": true,
    "isBestSeller": false,
    "newArrival": true,
    "colors": [
      {
        "name": "Gloss Carbon",
        "hex": "#18181B",
        "imageIndex": 0
      },
      {
        "name": "Ice Grey",
        "hex": "#CBD5E1",
        "imageIndex": 1
      }
    ],
    "sizes": [
      "M",
      "L",
      "XL"
    ],
    "specs": {
      "Insulation": "Eco-down 600 fill power thermal",
      "Shell": "Windproof ripstop microfiber nylon",
      "Zippers": "Dual waterproof two-way zipper",
      "Fit": "Boxy streetwear layering fit",
      "Origin": "Imported"
    }
  },
  {
    "name": "Skate High Reissue Sneaker",
    "brand": "The Souled Street",
    "description": "Iconic vulcanized skate silhouette made with reinforced double-stitched canvas, padded collar for ankle protection, and honeycomb gum rubber waffle soles.",
    "price": 6499,
    "originalPrice": 8999,
    "category": "sneakers",
    "image": "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1000&q=80",
    "images": [
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1000&q=80"
    ],
    "stock": 14,
    "rating": 4.5,
    "numReviews": 780,
    "badge": "Limited Restock 🔥",
    "isTrending": false,
    "isBestSeller": true,
    "newArrival": false,
    "colors": [
      {
        "name": "Black & Gum",
        "hex": "#27272A",
        "imageIndex": 0
      },
      {
        "name": "Electric Red",
        "hex": "#DC2626",
        "imageIndex": 1
      }
    ],
    "sizes": [
      "UK 7",
      "UK 8",
      "UK 9",
      "UK 10"
    ],
    "specs": {
      "Upper": "12oz Heavyweight Canvas & Suede toecap",
      "Insole": "UltraCush ergonomic foam insole",
      "Outsole": "Original vulcanized gum rubber",
      "Fit": "True to size standard fit",
      "Origin": "Imported"
    }
  }
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    await Product.deleteMany({
      $or: [
        { name: { $in: legacyProductNames } },
        { name: { $in: products.map((product) => product.name) } }
      ]
    });

    await Product.insertMany(products);
    console.log(`${products.length} HYPED products inserted successfully`);

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error.message);
    process.exit(1);
  }
};

seedProducts();
