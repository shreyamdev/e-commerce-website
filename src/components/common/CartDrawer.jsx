/*import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Tag, 
  Truck, 
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useStore } from '../../context/StoreContext';

export const CartDrawer = () => {
  const { 
    isDrawerOpen, 
    setIsDrawerOpen, 
    cartItems, 
    updateQuantity, 
    removeFromCart, 
    subtotal, 
    discountAmount, 
    shippingFee, 
    progressToFreeShipping, 
    amountNeededForFreeShipping, 
    grandTotal, 
    appliedCoupon, 
    couponError, 
    applyCoupon, 
    removeCoupon,
    totalItemsCount
  } = useCart();

  const { navigateTo } = useStore();
  const [promoInput, setPromoInput] = useState('');

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoInput.trim()) {
      applyCoupon(promoInput);
      setPromoInput('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsDrawerOpen(false);
    navigateTo('checkout');
  };

  const handleViewFullCart = () => {
    setIsDrawerOpen(false);
    navigateTo('cart');
  };

  if (!isDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between animate-slide-left">
          
          {/* Drawer Header */}
          <div className="p-6 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/50">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-neutral-900" />
              <h2 className="text-lg font-black tracking-tight text-neutral-900 uppercase">
                Your Bag ({totalItemsCount})
              </h2>
            </div>
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="p-2 text-neutral-400 hover:text-black hover:bg-neutral-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Tracker Bar (The Souled Store / Myntra inspired) */}
          <div className="bg-neutral-900 text-white p-4">
            <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
              <div className="flex items-center space-x-1.5">
                <Truck className="w-4 h-4 text-[#FFA41C]" />
                {amountNeededForFreeShipping === 0 ? (
                  <span className="text-emerald-400 font-bold">You unlocked FREE Express Shipping! 🎉</span>
                ) : (
                  <span>Add <strong className="text-[#FFA41C]">${amountNeededForFreeShipping}</strong> more for <strong>FREE Shipping</strong></span>
                )}
              </div>
              <span className="font-bold text-neutral-300">{progressToFreeShipping}%</span>
            </div>
            <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-[#FFA41C] to-[#FF3E6C] h-full transition-all duration-500 rounded-full"
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mb-4">
                  <ShoppingBag className="w-10 h-10 text-neutral-400" />
                </div>
                <h3 className="text-lg font-bold text-neutral-800">Your bag is completely empty</h3>
                <p className="text-sm text-neutral-500 mt-1 max-w-xs">
                  Discover the latest drops, streetwear silhouettes, and iconic sneakers.
                </p>
                <button
                  onClick={() => {
                    setIsDrawerOpen(false);
                    navigateTo('shop');
                  }}
                  className="mt-6 px-6 py-3 bg-black text-white font-bold text-xs uppercase tracking-wider rounded-full hover:bg-neutral-800 transition-colors shadow-lg"
                >
                  Explore Drops Now
                </button>
              </div>
            ) : (
              cartItems.map((item, index) => {
                const { product, selectedSize, selectedColor, quantity } = item;
                return (
                  <div 
                    key={`${product.id}-${selectedSize}-${selectedColor}-${index}`}
                    className="flex space-x-4 p-3 bg-neutral-50 rounded-2xl border border-neutral-100 hover:border-neutral-200 transition-colors"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-20 h-24 object-cover rounded-xl bg-neutral-200 shrink-0 cursor-pointer"
                      onClick={() => {
                        setIsDrawerOpen(false);
                        navigateTo('product-detail', product);
                      }}
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-[10px] font-black uppercase text-neutral-400 tracking-wider">
                              {product.brand}
                            </span>
                            <h4 
                              onClick={() => {
                                setIsDrawerOpen(false);
                                navigateTo('product-detail', product);
                              }}
                              className="text-xs font-bold text-neutral-900 line-clamp-1 cursor-pointer hover:text-[#FF3E6C] transition-colors"
                            >
                              {product.name}
                            </h4>
                          </div>
                          <button
                            onClick={() => removeFromCart(product.id, selectedSize, selectedColor)}
                            className="text-neutral-400 hover:text-red-500 p-1 transition-colors"
                            title="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-[10px] bg-white border border-neutral-200 px-2 py-0.5 rounded-md font-semibold text-neutral-700">
                            Size: {selectedSize}
                          </span>
                          <span className="text-[10px] bg-white border border-neutral-200 px-2 py-0.5 rounded-md font-semibold text-neutral-700">
                            {selectedColor}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center space-x-1.5">
                          <span className="text-sm font-black text-neutral-900">
                            ${product.price * quantity}
                          </span>
                          {product.originalPrice && (
                            <span className="text-[11px] text-neutral-400 line-through">
                              ${product.originalPrice * quantity}
                            </span>
                          )}
                        </div>

                        {/* Quantity Step Controls */}
                        <div className="flex items-center border border-neutral-200 rounded-lg bg-white overflow-hidden shadow-xs">
                          <button
                            onClick={() => updateQuantity(product.id, selectedSize, selectedColor, -1)}
                            className="p-1 hover:bg-neutral-100 text-neutral-600 transition-colors"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-2.5 text-xs font-bold text-neutral-900">
                            {quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(product.id, selectedSize, selectedColor, 1)}
                            className="p-1 hover:bg-neutral-100 text-neutral-600 transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Drawer Footer with Coupon & Checkout */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-neutral-200 bg-white space-y-4 shadow-lg">
              
              {/* Promo Coupon Box */}
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-xl p-2.5 px-3 text-xs text-emerald-800">
                    <div className="flex items-center space-x-2">
                      <Tag className="w-4 h-4 text-emerald-600" />
                      <span>
                        Coupon <strong>{appliedCoupon.code}</strong> applied ({appliedCoupon.discountPercent}% OFF)
                      </span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-xs font-bold text-red-600 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex space-x-2">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        placeholder="Promo Code (e.g. HYPED20)"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        className="w-full text-xs uppercase px-3 py-2.5 border border-neutral-300 rounded-xl focus:border-black focus:outline-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2.5 bg-neutral-900 text-white rounded-xl text-xs font-bold hover:bg-black transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponError && (
                  <p className="text-[11px] text-red-500 mt-1 flex items-center space-x-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{couponError}</span>
                  </p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-neutral-600 border-t border-neutral-100 pt-3">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="font-semibold text-neutral-900">${subtotal}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Discount ({appliedCoupon.code})</span>
                    <span>-${discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shippingFee === 0 ? <strong className="text-emerald-600 font-bold">FREE</strong> : `$${shippingFee}`}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax</span>
                  <span className="font-semibold text-neutral-900">${Math.round(subtotal * 0.08)}</span>
                </div>
                <div className="flex justify-between text-base font-black text-neutral-900 pt-2 border-t border-neutral-200">
                  <span>Estimated Total</span>
                  <span className="text-[#FF3E6C]">${grandTotal}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={handleProceedToCheckout}
                  className="w-full py-3.5 bg-black hover:bg-neutral-800 text-white rounded-xl font-black text-sm uppercase tracking-wider flex items-center justify-center space-x-2 transition-transform active:scale-[0.99] shadow-xl"
                >
                  <span>Checkout Now</span>
                  <ArrowRight className="w-4 h-4 text-[#FFA41C]" />
                </button>

                <button
                  onClick={handleViewFullCart}
                  className="w-full py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  View Full Cart & Summary
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};/*
