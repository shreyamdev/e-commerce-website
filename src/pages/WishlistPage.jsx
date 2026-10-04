import React from 'react';
import { Heart, ShoppingBag, ArrowLeft, Trash2, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/product/ProductCard';

export const WishlistPage = () => {
  const { wishlistItems, clearWishlist, wishlistCount } = useWishlist();
  const { addToCart, setIsDrawerOpen } = useCart();
  const { navigateTo } = useStore();

  const handleMoveAllToCart = () => {
    wishlistItems.forEach((product) => {
      addToCart(product, product.sizes ? product.sizes[0] : null, null, 1);
    });
    setIsDrawerOpen(true);
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="max-w-md mx-auto bg-white p-10 rounded-3xl border border-neutral-200/80 shadow-sm flex flex-col items-center">
          <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mb-4">
            <Heart className="w-10 h-10 text-[#FF3E6C]" />
          </div>
          <h2 className="text-2xl font-black uppercase text-neutral-900 tracking-tight">
            Your Wishlist is Empty
          </h2>
          <p className="text-xs text-neutral-500 mt-2 mb-6">
            Tap the heart icon on any sneaker or apparel drop to save it to your personal vault!
          </p>
          <button
            onClick={() => navigateTo('shop')}
            className="px-8 py-3.5 bg-black text-white font-black text-xs uppercase tracking-wider rounded-full hover:bg-neutral-800 transition-transform hover:scale-105 shadow-lg"
          >
            Explore Drops
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-200 pb-4 gap-4">
        <div>
          <button
            onClick={() => navigateTo('shop')}
            className="flex items-center space-x-1.5 text-xs font-bold text-neutral-500 hover:text-black mb-1 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Continue Shopping</span>
          </button>
          <h1 className="text-3xl font-black uppercase tracking-tight text-neutral-900">
            My Wishlist ({wishlistCount} saved)
          </h1>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={clearWishlist}
            className="px-4 py-2 border border-neutral-200 hover:border-red-400 text-neutral-600 hover:text-red-600 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Wishlist</span>
          </button>

          <button
            onClick={handleMoveAllToCart}
            className="px-5 py-2.5 bg-black hover:bg-neutral-800 text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center space-x-2 transition-all shadow-md"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Move All to Bag</span>
          </button>
        </div>
      </div>

      {/* Grid of Wishlist items */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {wishlistItems.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
