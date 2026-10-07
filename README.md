# ⚡ HYPED.CO | Next-Gen Streetwear & Sneaker E-Commerce Storefront

A modern, responsive, and production-ready React + Vite + Tailwind CSS frontend application built for a Full-Stack E-Commerce college team project.



---

## 🎨 Theme & Color Palette

Configured in `tailwind.config.js`:
- `brand-primary`: `#111111` (Deep slate / black - Nike inspired)
- `brand-accent`: `#FF3E6C` (Vibrant electric pink/red - Myntra inspired)
- `brand-yellow`: `#FFA41C` (Gold - Amazon ratings & buy buttons)
- `brand-bg`: `#F5F5F6` (High-contrast neutral backdrop)

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18+ (tested on Node v22)
- **npm**: v9+ (tested on npm v10)



### 2. Install Dependencies (if not already installed)
```bash
npm install
```

### 3. Run the Development Server
```bash
npm run dev
```
Open your browser at 

### 4. Build for Production
```bash
npm run build
npm run preview
```

---

## 📂 Project Structure

```
ecommerce-storefront/
├── index.html                   # HTML mount point with Google Fonts (Inter & Montserrat)
├── package.json                 # Dependencies: React 18, Vite, Tailwind CSS, Lucide React, Canvas Confetti
├── tailwind.config.js           # Custom brand colors, keyframe animations, marquee, and shadows
├── postcss.config.js            # PostCSS configuration for Tailwind & Autoprefixer
├── vite.config.js               # Vite bundler configuration
└── src/
    ├── main.jsx                 # Application entry point
    ├── App.jsx                  # Root layout, providers, and view router
    ├── index.css                # Tailwind base directives and modern scrollbar styles
    ├── context/
    │   ├── CartContext.jsx      # Slide drawer, item count, coupon engine, subtotals, free shipping meter
    │   ├── WishlistContext.jsx  # Wishlist state persistence, badge counter, toggle actions
    │   └── StoreContext.jsx     # Navigation views, Amazon-style filters, search sync, catalog sorting
    ├── data/
    │   └── products.js          # Catalog of 12+ detailed streetwear/sneaker drops, coupons, slides, reviews
    ├── components/
    │   ├── common/
    │   │   ├── AnnouncementTicker.jsx # Souled Store animated marquee ticker with promo codes
    │   │   ├── Header.jsx             # Sticky glassmorphic navbar with Amazon-style search & action badges
    │   │   ├── CartDrawer.jsx         # Slide-over cart drawer with free shipping progress & promo codes
    │   │   └── Footer.jsx             # Authenticity guarantee badges, newsletter, and category directory
    │   └── product/
    │       ├── ProductCard.jsx        # Reusable card: image zoom, floating heart, discount pill, quick-add
    │       └── FilterSidebar.jsx      # Amazon-style faceted filters (categories, price slider, brands, ratings)
    └── pages/
        ├── HomePage.jsx               # Hero carousel, category chips, flash deal ticker, tabbed drops grid
        ├── ProductListingPage.jsx     # PLP with sidebar filters, removable filter badges, sorting dropdown
        ├── ProductDetailPage.jsx     # PDP with thumbnail gallery, zoom lens, pincode ETA, reviews breakdown
        ├── CartPage.jsx               # Dedicated full cart page with cost breakdown box
        ├── WishlistPage.jsx           # Dedicated wishlist page with one-click "Move All to Bag"
        ├── CheckoutPage.jsx           # Multi-step checkout (Address -> Payment -> Status Timeline Tracker)
        ├── OrderTrackingPage.jsx      # Real-time shipment journey with carrier checkpoints
        └── AdminDashboard.jsx         # Store admin panel with KPI stats cards, recent orders, & low-stock alerts
```

---

## 💡 Tested Coupons & Demo Features
Try these coupons in the Cart Drawer or Checkout:
- `HYPED20` — 20% Off Storewide
- `WELCOME10` — 10% Welcome Discount
- `STREET30` — 30% Streetwear Fiesta

### Demo Navigation & Shortcuts
- Click **"Admin"** in the top navigation or user menu to inspect the Store Admin Dashboard.
- Click **"Track Active Orders"** in the profile dropdown to inspect live carrier checkpoints.
- Use the **Step 1 - 5** simulation buttons on the Checkout confirmation screen to preview each order milestone in the status timeline tracker.
