/*import React, { useState } from 'react';
import { Heart, Star, ShoppingBag, Eye, Check } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useStore } from '../../context/StoreContext';

export const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { navigateTo } = useStore();

  const [selectedSize, setSelectedSize] = useState(product.sizes ? product.sizes[0] : null);
  const [selectedColor, setSelectedColor] = useState(product.colors ? product.colors[0].name : null);
  const [showQuickSizes, setShowQuickSizes] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const isFavorited = isInWishlist(product.id);

  const handleQuickAdd = (e, size) => {
    e.stopPropagation();
    addToCart(product, size || selectedSize, selectedColor, 1);
    setAddedAnimation(true);
    setShowQuickSizes(false);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  const handleCardClick = () => {
    navigateTo('product-detail', product);
  };

  return (
    <div 
      onClick={handleCardClick}
      className="group relative bg-white rounded-2xl border border-neutral-100/80 shadow-sm hover:shadow-xl hover:border-neutral-300 transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between"
    >
      {/* Image Container with Hover Zoom */}
      <div className="relative aspect-[4/5] bg-neutral-100 overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Top Badges (Trending, Discount, etc.) */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.badge && (
            <span className="bg-black/90 backdrop-blur-sm text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
              {product.badge}
            </span>
          )}
          {product.discountPercent > 0 && (
            <span className="bg-[#FF3E6C] text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
              {product.discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Floating Wishlist Heart Button (Myntra inspired) */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className="absolute top-3 right-3 bg-white/90 backdrop-blur-md p-2 rounded-full shadow-md hover:bg-white transition-all transform hover:scale-110 active:scale-90 z-10"
          title={isFavorited ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isFavorited
                ? 'text-[#FF3E6C] fill-[#FF3E6C]'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          />
        </button>

        {/* Quick Size Select Bar that slides up on hover (Myntra / Zara inspired) */}
        {product.sizes && (
          <div 
            onClick={(e) => e.stopPropagation()}
            className="absolute bottom-0 inset-x-0 bg-white/95 backdrop-blur-md p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out border-t border-neutral-100 hidden sm:block z-10"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-neutral-600 uppercase">Select Size:</span>
              <span className="text-[10px] font-extrabold text-[#FFA41C]">Quick Add</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={(e) => handleQuickAdd(e, size)}
                  className="px-2 py-1 text-[11px] font-bold rounded-lg border border-neutral-200 hover:border-black hover:bg-black hover:text-white transition-all bg-white"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Rating Row */}
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-extrabold uppercase text-[11px] tracking-wider text-neutral-400">
              {product.brand}
            </span>
            <div className="flex items-center space-x-1 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/60">
              <Star className="w-3 h-3 text-[#FFA41C] fill-[#FFA41C]" />
              <span className="text-[11px] font-black text-neutral-800">{product.rating}</span>
              <span className="text-[10px] text-neutral-400">({product.reviewCount})</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-bold text-sm text-neutral-900 line-clamp-1 group-hover:text-[#FF3E6C] transition-colors">
            {product.name}
          </h3>

          {/* Color Swatch Dots */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center space-x-1.5 mt-2">
              {product.colors.map((color) => (
                <span
                  key={color.name}
                  className="w-3 h-3 rounded-full border border-neutral-300 shadow-xs"
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
              <span className="text-[10px] text-neutral-400 font-medium">
                {product.colors.length} {product.colors.length === 1 ? 'color' : 'colors'}
              </span>
            </div>
          )}
        </div>

        {/* Price & Mobile Quick Add */}
        <div className="mt-3 pt-3 border-t border-neutral-100 flex items-center justify-between">
          <div className="flex items-baseline space-x-2">
            <span className="text-base font-black text-neutral-900">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-neutral-400 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={(e) => handleQuickAdd(e, product.sizes ? product.sizes[0] : null)}
            className={`p-2 rounded-xl border transition-all ${
              addedAnimation
                ? 'bg-emerald-500 text-white border-emerald-500'
                : 'bg-neutral-100 hover:bg-black hover:text-white border-neutral-200 text-neutral-800'
            }`}
            title="Quick Add to Bag"
          >
            {addedAnimation ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};
