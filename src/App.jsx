import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AnnouncementTicker } from './components/common/AnnouncementTicker';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { CartDrawer } from './components/common/CartDrawer';
import { HomePage } from './pages/HomePage';
import { ProductListingPage } from './pages/ProductListingPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { WishlistPage } from './pages/WishlistPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { OrderTrackingPage } from './pages/OrderTrackingPage';
import { ProfilePage } from './pages/ProfilePage';

const AppContent = () => {
  const { currentView } = useStore();

  const renderCurrentView = () => {
    switch (currentView) {
      case 'home':
        return <HomePage />;
      case 'shop':
        return <ProductListingPage />;
      case 'product-detail':
        return <ProductDetailPage />;
      case 'cart':
        return <CartPage />;
      case 'wishlist':
        return <WishlistPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'admin':
        return <AdminDashboard />;
      case 'order-tracking':
        return <OrderTrackingPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F5F6] text-[#111111] antialiased selection:bg-[#FF3E6C] selection:text-white">
      {/* Souled Store Marquee Announcement Bar */}
      <AnnouncementTicker />

      {/* Sticky Glassmorphic Header with Search & Badges */}
      <Header />

      {/* Dynamic Main View */}
      <main className="flex-1">
        {renderCurrentView()}
      </main>

      {/* Slide-over Cart Drawer */}
      <CartDrawer />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export function App() {
  return (
    <StoreProvider>
      <CartProvider>
        <WishlistProvider>
          <AppContent />
        </WishlistProvider>
      </CartProvider>
    </StoreProvider>
  );
}

export default App;
