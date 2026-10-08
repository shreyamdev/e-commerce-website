export const CATEGORIES = [
  { id: 'all', name: 'All Drops', icon: 'Sparkles', count: 24 },
  { id: 'sneakers', name: 'Sneakers', icon: 'Footprints', count: 8 },
  { id: 'hoodies', name: 'Hoodies & Sweatshirts', icon: 'Shirt', count: 6 },
  { id: 't-shirts', name: 'Oversized Tees', icon: 'Layers', count: 5 },
  { id: 'cargo', name: 'Cargo & Pants', icon: 'Scissors', count: 3 },
  { id: 'jackets', name: 'Jackets & Outerwear', icon: 'Wind', count: 4 },
  { id: 'accessories', name: 'Accessories', icon: 'Watch', count: 3 },
];

export const BRANDS = [
  'Nike',
  'Jordan',
  'Vortex Labs',
  'The Souled Street',
  'Off-Grid Co.',
  'Yeezy Inspired',
  'Underground Clan',
];

export const PRODUCTS = [
  {
    id: 'prod-001',
    name: 'Air Matrix Pulse Phantom',
    brand: 'Nike',
    category: 'sneakers',
    price: 7999,
    originalPrice: 11499,
    discountPercent: 30,
    rating: 4.9,
    reviewCount: 1420,
    badge: 'Trending 🔥',
    isTrending: true,
    isBestSeller: true,
    isNew: false,
    inStock: true,
    stockCount: 8,
    colors: [
      { name: 'Onyx Black', hex: '#111111' },
      { name: 'Pure Platinum', hex: '#E5E7EB' },
      { name: 'Crimson Pulse', hex: '#FF3E6C' }
    ],
    sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
    images: [
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Engineered for street-level velocity. The Air Matrix Pulse phantom combines responsive dual-pod cushioning with lightweight aerodynamic mesh upper and high-traction rubber waffle outsole.',
    specs: {
      'Style Code': 'NK-AMP-9021',
      'Upper Material': 'Engineered Breathable Mesh & Leather overlays',
      'Midsole': 'Dual-density foam with Zoom Air cushioning',
      'Closure': 'Lace-Up system with reflective accents',
      'Origin': 'Imported (Authenticity Verified)'
    }
  },
  {
    id: 'prod-002',
    name: 'Retro High OG "Cyber Rust"',
    brand: 'Jordan',
    category: 'sneakers',
    price: 9499,
    originalPrice: 13499,
    discountPercent: 30,
    rating: 4.8,
    reviewCount: 980,
    badge: 'Iconic Drop',
    isTrending: true,
    isBestSeller: true,
    isNew: false,
    inStock: true,
    stockCount: 4,
    colors: [
      { name: 'Rust & Obsidian', hex: '#8B4513' },
      { name: 'Classic Shadow', hex: '#374151' }
    ],
    sizes: ['UK 7.5', 'UK 8.5', 'UK 9.5', 'UK 10.5'],
    images: [
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1579338559194-a162d19bf842?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'An immortal silhouette reborn with distressed suede panels, iconic wings emblem, and aged sail midsoles for that quintessential high-end vintage aesthetic.',
    specs: {
      'Style Code': 'JD-RET-5541',
      'Upper Material': 'Premium Full-Grain Suede & Leather',
      'Sole Material': 'Durable vulcanized rubber cupsole',
      'Collar Height': 'High-Top padded support',
      'Origin': 'Imported'
    }
  },
  {
    id: 'prod-003',
    name: 'Heavyweight Acid-Wash Oversized Hoodie',
    brand: 'Vortex Labs',
    category: 'hoodies',
    price: 3499,
    originalPrice: 5499,
    discountPercent: 38,
    rating: 4.9,
    reviewCount: 654,
    badge: 'Street Essential',
    isTrending: true,
    isBestSeller: false,
    isNew: true,
    inStock: true,
    stockCount: 15,
    colors: [
      { name: 'Washed Charcoal', hex: '#262626' },
      { name: 'Vintage Olive', hex: '#4B5320' },
      { name: 'Faded Plum', hex: '#4A235A' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Cut from 480 GSM French Terry loopback cotton. Features a double-layered hood without drawstrings for a clean architectural drape, dropped shoulders, and ribbed cuffs.',
    specs: {
      'GSM': '480 GSM Ultra-Heavyweight',
      'Fabric': '100% Combed Organic Cotton',
      'Fit': 'Oversized Boxy Silhouette',
      'Wash Care': 'Cold machine wash inside out',
      'Origin': 'Crafted in Portugal'
    }
  },
  {
    id: 'prod-004',
    name: 'Cyber Samurai Graphic Boxy Tee',
    brand: 'The Souled Street',
    category: 't-shirts',
    price: 1799,
    originalPrice: 2699,
    discountPercent: 34,
    rating: 4.7,
    reviewCount: 820,
    badge: 'Anime Collab ⚡',
    isTrending: true,
    isBestSeller: true,
    isNew: false,
    inStock: true,
    stockCount: 22,
    colors: [
      { name: 'Jet Black', hex: '#111111' },
      { name: 'Off White', hex: '#F3F4F6' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Vibrant cyberpunk neon screen print on dense 240 GSM pre-shrunk cotton. Boxy cut with reinforced crew neck collar that holds structure wash after wash.',
    specs: {
      'GSM': '240 GSM Pre-Shrunk Single Jersey',
      'Print': 'High-density puff screen print',
      'Fit': 'Relaxed Drop Shoulder',
      'Neckline': 'Thick 1.25" rib knit crew',
      'Origin': 'Made in India'
    }
  },
  {
    id: 'prod-005',
    name: 'Tactical Multi-Pocket Parachute Cargo',
    brand: 'Off-Grid Co.',
    category: 'cargo',
    price: 3999,
    originalPrice: 5999,
    discountPercent: 35,
    rating: 4.8,
    reviewCount: 432,
    badge: 'Best Seller ⭐',
    isTrending: false,
    isBestSeller: true,
    isNew: false,
    inStock: true,
    stockCount: 7,
    colors: [
      { name: 'Military Olive', hex: '#3B4D3C' },
      { name: 'Stealth Black', hex: '#18181B' },
      { name: 'Desert Dune', hex: '#C2B280' }
    ],
    sizes: ['30', '32', '34', '36'],
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Ripstop nylon construction equipped with 8 ergonomic magnetic cargo pockets, bungee cord hem adjusters to switch from wide flare to stacked jogger cuffs in seconds.',
    specs: {
      'Material': 'DWR Water-Resistant Ripstop Nylon',
      'Hardware': 'YKK zippers & magnetic pocket clasps',
      'Waistband': 'Elasticated waist with heavy webbed belt',
      'Fit': 'Adjustable Parachute Silhouette',
      'Origin': 'Imported'
    }
  },
  {
    id: 'prod-006',
    name: 'Vortex Technical Weatherproof Bomber',
    brand: 'Vortex Labs',
    category: 'jackets',
    price: 6999,
    originalPrice: 9999,
    discountPercent: 32,
    rating: 4.9,
    reviewCount: 512,
    badge: 'Limited Drop',
    isTrending: true,
    isBestSeller: false,
    isNew: true,
    inStock: true,
    stockCount: 5,
    colors: [
      { name: 'Matte Obsidian', hex: '#1C1917' },
      { name: 'Silver Slate', hex: '#94A3B8' }
    ],
    sizes: ['M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Futuristic silhouette designed with waterproof seam-sealed membrane, interior utility sling straps for easy hands-free carry when indoors, and thermal insulation.',
    specs: {
      'Shell': 'Triple-layer breathable Gore-tex style laminate',
      'Lining': 'Quilted aerospace thermal polyester',
      'Utility': 'Interior carry harness & sleeve card pocket',
      'Pockets': '4 exterior storm flap pockets',
      'Origin': 'Crafted in Japan'
    }
  },
  {
    id: 'prod-007',
    name: 'V2 Foam Runner "Oatmeal"',
    brand: 'Yeezy Inspired',
    category: 'sneakers',
    price: 7499,
    originalPrice: 9999,
    discountPercent: 25,
    rating: 4.6,
    reviewCount: 1102,
    badge: 'Future Wave',
    isTrending: false,
    isBestSeller: true,
    isNew: false,
    inStock: true,
    stockCount: 18,
    colors: [
      { name: 'Oatmeal Mist', hex: '#D7CEC7' },
      { name: 'Pitch Black', hex: '#171717' }
    ],
    sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
    images: [
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1512374382149-233c42b6a83b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'One-piece molded EVA foam shoe engineered using harvested algae technology. Sculptural cutouts provide maximum ventilation and ultra-cushioned stride.',
    specs: {
      'Construction': 'Single mold injected EVA & Algae foam',
      'Weight': '210g ultra-featherweight',
      'Cushioning': 'Cloud-step responsive footbed',
      'Care': 'Waterproof and easy to hand wipe clean',
      'Origin': 'Imported'
    }
  },
  {
    id: 'prod-008',
    name: 'Underground Modular Tactical Chest Rig',
    brand: 'Underground Clan',
    category: 'accessories',
    price: 2499,
    originalPrice: 3999,
    discountPercent: 35,
    rating: 4.7,
    reviewCount: 310,
    badge: 'Hot Drop 🔥',
    isTrending: true,
    isBestSeller: false,
    isNew: true,
    inStock: true,
    stockCount: 12,
    colors: [
      { name: 'Tactical Black', hex: '#111111' },
      { name: 'Camo Smoke', hex: '#4B5563' }
    ],
    sizes: ['One Size Fits All'],
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Ballistic Cordura 1000D harness bag featuring multi-compartment internal organizers, quick-release Cobra-style metal buckles, and Molle attachment loops.',
    specs: {
      'Material': '1000D Cordura Waterproof Fabric',
      'Buckles': 'Industrial zinc-alloy quick release',
      'Straps': 'Fully adjustable 4-point chest harness',
      'Dimensions': '24cm x 17cm x 5cm',
      'Origin': 'Handcrafted'
    }
  },
  {
    id: 'prod-009',
    name: 'Air Max Retro 97 "Silver Bullet"',
    brand: 'Nike',
    category: 'sneakers',
    price: 10999,
    originalPrice: 14999,
    discountPercent: 17,
    rating: 4.9,
    reviewCount: 2240,
    badge: 'Nike Classic',
    isTrending: true,
    isBestSeller: true,
    isNew: false,
    inStock: true,
    stockCount: 6,
    colors: [
      { name: 'Metallic Silver', hex: '#C0C0C0' },
      { name: 'Triple White', hex: '#F9FAFB' }
    ],
    sizes: ['UK 8', 'UK 9', 'UK 10', 'UK 11'],
    images: [
      'https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1597045566677-8cf032ed6634?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Inspired by Japanese bullet trains, the fluid water-ripple piping and full-length visible Max Air unit give you unprecedented comfort and unmatched street status.',
    specs: {
      'Style Code': 'NK-AM97-SLV',
      'Upper': 'Synthetic leather with 3M reflective wave bands',
      'Cushioning': 'Full-length transparent Air-Sole unit',
      'Traction': 'Waffle patterned rubber tread',
      'Origin': 'Imported'
    }
  },
  {
    id: 'prod-010',
    name: 'Acid Wash Raw Hem Graphic Tee',
    brand: 'Underground Clan',
    category: 't-shirts',
    price: 1899,
    originalPrice: 2899,
    discountPercent: 30,
    rating: 4.7,
    reviewCount: 390,
    badge: 'Vintage Wash',
    isTrending: false,
    isBestSeller: false,
    isNew: true,
    inStock: true,
    stockCount: 19,
    colors: [
      { name: 'Mineral Stone', hex: '#71717A' },
      { name: 'Faded Earth', hex: '#78350F' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Enzyme-stone washed for 12 hours to achieve that authentic vintage softness. Features raw edge distress details and hand-printed gothic typography.',
    specs: {
      'Fabric': '100% Ring-Spun Heavyweight Cotton',
      'GSM': '260 GSM Heavy Gauge',
      'Treatment': 'Manual mineral acid wash finish',
      'Fit': 'Oversized Skate Cut',
      'Origin': 'Crafted in USA'
    }
  },
  {
    id: 'prod-011',
    name: 'Shadow Tech Utility Puffer Vest',
    brand: 'Off-Grid Co.',
    category: 'jackets',
    price: 5999,
    originalPrice: 8499,
    discountPercent: 29,
    rating: 4.8,
    reviewCount: 280,
    badge: 'Winter Drop ❄️',
    isTrending: true,
    isBestSeller: false,
    isNew: true,
    inStock: true,
    stockCount: 9,
    colors: [
      { name: 'Gloss Carbon', hex: '#18181B' },
      { name: 'Ice Grey', hex: '#CBD5E1' }
    ],
    sizes: ['M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Warmth without bulk. Constructed with synthetic down fill, water-resistant matte nylon shell, oversized funnel collar, and dual-direction two-way tactical zipper.',
    specs: {
      'Insulation': 'Eco-down 600 fill power thermal',
      'Shell': 'Windproof ripstop microfiber nylon',
      'Zippers': 'Dual waterproof two-way zipper',
      'Fit': 'Boxy streetwear layering fit',
      'Origin': 'Imported'
    }
  },
  {
    id: 'prod-012',
    name: 'Skate High Reissue Sneaker',
    brand: 'The Souled Street',
    category: 'sneakers',
    price: 6499,
    originalPrice: 8999,
    discountPercent: 30,
    rating: 4.5,
    reviewCount: 780,
    badge: 'Limited Restock 🔥',
    isTrending: false,
    isBestSeller: true,
    isNew: false,
    inStock: true,
    stockCount: 14,
    colors: [
      { name: 'Black & Gum', hex: '#27272A' },
      { name: 'Electric Red', hex: '#DC2626' }
    ],
    sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10'],
    images: [
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Iconic vulcanized skate silhouette made with reinforced double-stitched canvas, padded collar for ankle protection, and honeycomb gum rubber waffle soles.',
    specs: {
      'Upper': '12oz Heavyweight Canvas & Suede toecap',
      'Insole': 'UltraCush ergonomic foam insole',
      'Outsole': 'Original vulcanized gum rubber',
      'Fit': 'True to size standard fit',
      'Origin': 'Imported'
    }
  }
];

export const HERO_SLIDES = [
  {
    id: 1,
    badge: 'NEW SEASON DROP // FW26',
    title: 'IGNITE THE STREETS',
    subtitle: 'High-octane technical streetwear engineered with dual-density materials & unapologetic silhouette cuts.',
    ctaPrimary: 'Shop Latest Drop',
    ctaSecondary: 'View Lookbook',
    filterCategory: 'sneakers',
    bgImage: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1920&q=80',
    accentColor: '#FF3E6C'
  },
  {
    id: 2,
    badge: 'COLLECTOR SERIES',
    title: 'AIR MATRIX PULSE',
    subtitle: 'The future of cushioned street momentum. Ultra-breathable weave meets architectural heel pods.',
    ctaPrimary: 'Explore Air Matrix',
    ctaSecondary: 'Sneaker Vault',
    filterCategory: 'sneakers',
    bgImage: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1920&q=80',
    accentColor: '#FFA41C'
  },
  {
    id: 3,
    badge: 'LIMITED ARCHIVE',
    title: 'HEAVYWEIGHT DRAPE',
    subtitle: '480 GSM pure French Terry fleece hoodies tailored for cold nights and city lights.',
    ctaPrimary: 'Shop Hoodies',
    ctaSecondary: 'Best Sellers',
    filterCategory: 'hoodies',
    bgImage: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1920&q=80',
    accentColor: '#3B82F6'
  }
];

export const FLASH_DEALS = [
  { text: '⚡ FLASH SALE: USE CODE "HYPED20" FOR EXTRA 20% OFF' },
  { text: '🚚 FREE EXPRESS SHIPPING ON ALL ORDERS OVER ₹100' },
  { text: '🔥 DROPPING NOW: CYBER SAMURAI SPECIAL EDITION' },
  { text: '⭐ RATED 4.9/5 BY OVER 25,000+ SNEAKERHEADS WORLDWIDE' },
  { text: '🔄 HASSLE-FREE 14-DAY DOORSTEP RETURNS & EXCHANGES' }
];

export const VALID_COUPONS = {
  'HYPED20': { discountPercent: 20, description: '20% Off Storewide' },
  'WELCOME10': { discountPercent: 10, description: '10% Welcome Discount' },
  'STREET30': { discountPercent: 30, description: '30% Streetwear Fiesta' },
  'FESTIVE15': { discountPercent: 15, description: '15% Seasonal Special' }
};

export const REVIEWS_MOCK = [
  {
    id: 'r1',
    author: 'Marcus K.',
    rating: 5,
    date: '2 days ago',
    verified: true,
    title: 'Mind-blowing silhouette and unbelievable comfort',
    content: 'Hands down the best purchase I made this year. The cushioning feels like stepping on bouncy clouds, and the materials feel even better in person than the photos.',
    helpfulCount: 42
  },
  {
    id: 'r2',
    author: 'Aria Chen',
    rating: 5,
    date: '1 week ago',
    verified: true,
    title: 'Perfect oversized fit & premium fabric weight',
    content: 'The drape is unmatched! True boxy streetwear fit. The color does not bleed in wash and collars stay totally crisp.',
    helpfulCount: 29
  },
  {
    id: 'r3',
    author: 'Devon Patel',
    rating: 4,
    date: '2 weeks ago',
    verified: true,
    title: 'Extremely high quality, shipping was lightning fast',
    content: 'Ordered on Tuesday afternoon and arrived Thursday morning in Mumbai. Packaging was pristine with authenticity cards.',
    helpfulCount: 18
  }
];
