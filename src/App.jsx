import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { StoreProvider, useStore } from './context/StoreContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';

// Common Layout Components
import { Header } from './components/common/Header';
import { AnnouncementTicker } from './components/common/AnnouncementTicker';
import { CartDrawer } from './components/cart/CartDrawer';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

// Page Views
import { HomePage } from './pages/HomePage';
import { ProductListingPage } from './pages/ProductListingPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderTrackingPage } from './pages/OrderTrackingPage';
import { ProfilePage } from './pages/ProfilePage';
import { AdminDashboard } from './pages/AdminDashboard';
import { AuthPage } from './pages/AuthPage';

// Default Global Footer
const StoreFooter = () => (
  <footer className="bg-neutral-900 text-neutral-300 border-t border-neutral-800 mt-20 transition-colors">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <span className="text-xl font-black tracking-tighter uppercase text-white font-heading">
            HYPED<span className="text-rose-500">.</span>CO
          </span>
          <p className="mt-3 text-xs text-neutral-400 leading-relaxed">
            The premier marketplace for authentic streetwear, limited edition kicks, and verified drops worldwide.
          </p>
        </div>
        <div>
          <h4 className="text-xs uppercase font-bold tracking-wider text-white mb-3">Quick Navigation</h4>
          <ul className="space-y-2 text-xs text-neutral-400">
            <li><a href="#drops" className="hover:text-white transition-colors">Upcoming Drops</a></li>
            <li><a href="#catalog" className="hover:text-white transition-colors">Catalog Archive</a></li>
            <li><a href="#collabs" className="hover:text-white transition-colors">Limited Collabs</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs uppercase font-bold tracking-wider text-white mb-3">Customer Care</h4>
          <ul className="space-y-2 text-xs text-neutral-400">
            <li><a href="#tracking" className="hover:text-white transition-colors">Order Tracking</a></li>
            <li><a href="#auth" className="hover:text-white transition-colors">Authenticity Guarantee</a></li>
            <li><a href="#returns" className="hover:text-white transition-colors">Returns & Refunds</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs uppercase font-bold tracking-wider text-white mb-3">VIP Drop List</h4>
          <p className="text-xs text-neutral-400 mb-3">Get 10 minutes early access to hyped releases.</p>
          <div className="flex gap-2">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="w-full px-3 py-2 text-xs rounded-lg bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500 outline-none focus:border-neutral-500"
            />
            <button className="px-4 py-2 text-xs font-bold rounded-lg bg-white text-black hover:bg-neutral-200 transition-colors">
              Join
            </button>
          </div>
        </div>
      </div>
      <div className="mt-12 pt-6 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500">
        <p>&copy; {new Date().getFullYear()} HYPED.CO Inc. All rights reserved.</p>
        <p className="mt-2 sm:mt-0">100% Verified Authentic Sneakers & Apparel</p>
      </div>
    </div>
  </footer>
);

// View Switcher Container
const AppContent = () => {
  const { currentView } = useStore();

  const renderActiveView = () => {
    switch (currentView) {
      case 'home':
        return <HomePage />;
      case 'shop':
      case 'products':
        return <ProductListingPage />;
      case 'product-detail':
      case 'product':
        return <ProductDetailPage />;
      case 'cart':
        return <CartPage />;
      case 'checkout':
        return (
          <ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>
        );
      case 'order-tracking':
      case 'tracking':
        return <OrderTrackingPage />;
      case 'profile':
        return (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        );
      case 'admin':
        return (
          <ProtectedRoute requiredRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        );
      case 'auth':
      case 'login':
        return <AuthPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 flex flex-col font-sans transition-colors duration-300">
      {/* Top Flash Deals & Coupon Ticker */}
      {AnnouncementTicker && <AnnouncementTicker />}

      {/* Main Glassmorphic Header */}
      <Header />

      {/* Active Page View */}
      <main className="flex-grow">
        {renderActiveView()}
      </main>

      {/* Slide-over Cart Drawer */}
      {CartDrawer && <CartDrawer />}

      {/* Global Footer */}
      <StoreFooter />
    </div>
  );
};

export function App() {
  return (
    <AuthProvider>
      <StoreProvider>
        <CartProvider>
          <WishlistProvider>
            <AppContent />
          </WishlistProvider>
        </CartProvider>
      </StoreProvider>
    </AuthProvider>
  );
}

export default App;