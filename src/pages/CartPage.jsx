import React, { useState } from 'react';
import { 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Tag, 
  Truck, 
  ShieldCheck, 
  AlertCircle,
  ArrowLeft
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useStore } from '../context/StoreContext';
import { formatINR } from '../utils/currency';

export const CartPage = () => {
  const { 
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
  const [couponCodeInput, setCouponCodeInput] = useState('');

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCodeInput.trim()) {
      applyCoupon(couponCodeInput);
      setCouponCodeInput('');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="max-w-md mx-auto bg-white p-10 rounded-3xl border border-neutral-200/80 shadow-sm flex flex-col items-center">
          <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mb-4">
            <ShoppingBag className="w-10 h-10 text-neutral-400" />
          </div>
          <h2 className="text-2xl font-black uppercase text-neutral-900 tracking-tight">
            Your Bag is Empty
          </h2>
          <p className="text-xs text-neutral-500 mt-2 mb-6">
            Looks like you haven't added any drops to your shopping bag yet. Explore our curated collections!
          </p>
          <button
            onClick={() => navigateTo('shop')}
            className="px-8 py-3.5 bg-black text-white font-black text-xs uppercase tracking-wider rounded-full hover:bg-neutral-800 transition-transform hover:scale-105 shadow-lg"
          >
            Start Shopping Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Breadcrumb & Title */}
      <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
        <div>
          <button
            onClick={() => navigateTo('shop')}
            className="flex items-center space-x-1.5 text-xs font-bold text-neutral-500 hover:text-black mb-1 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Continue Shopping</span>
          </button>
          <h1 className="text-3xl font-black uppercase tracking-tight text-neutral-900">
            Shopping Bag ({totalItemsCount} items)
          </h1>
        </div>
      </div>

      {/* Free Express Shipping Meter */}
      <div className="bg-black text-white p-4 sm:p-5 rounded-2xl shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-neutral-900 flex items-center justify-center text-[#FFA41C]">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider">
              {amountNeededForFreeShipping === 0 ? (
                <span className="text-emerald-400">You qualify for FREE Express Shipping! 🎉</span>
              ) : (
                <span>Add <strong className="text-[#FFA41C]">{formatINR(amountNeededForFreeShipping)}</strong> more to unlock <strong>FREE Shipping</strong></span>
              )}
            </p>
            <p className="text-[11px] text-neutral-400">Complimentary 2-day delivery across domestic hubs</p>
          </div>
        </div>

        <div className="w-full sm:w-48 bg-neutral-800 h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-[#FFA41C] to-[#FF3E6C] h-full rounded-full transition-all duration-500"
            style={{ width: `${progressToFreeShipping}%` }}
          />
        </div>
      </div>

      {/* Main Grid: Items List (Left) + Summary Box (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Items */}
        <div className="lg:col-span-8 space-y-4">
          {cartItems.map((item, index) => {
            const { product, selectedSize, selectedColor, quantity } = item;
            return (
              <div
                key={`${product.id}-${selectedSize}-${selectedColor}-${index}`}
                className="bg-white p-4 sm:p-5 rounded-2xl border border-neutral-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-20 h-24 sm:w-24 sm:h-28 object-cover rounded-xl bg-neutral-100 cursor-pointer"
                    onClick={() => navigateTo('product-detail', product)}
                  />
                  <div>
                    <span className="text-[10px] font-black uppercase text-neutral-400 tracking-wider">
                      {product.brand}
                    </span>
                    <h3 
                      onClick={() => navigateTo('product-detail', product)}
                      className="text-sm font-bold text-neutral-900 cursor-pointer hover:text-[#FF3E6C] transition-colors"
                    >
                      {product.name}
                    </h3>
                    
                    <div className="flex items-center space-x-2 mt-2">
                      <span className="text-xs bg-neutral-100 border border-neutral-200 px-2.5 py-0.5 rounded-lg font-semibold text-neutral-700">
                        Size: {selectedSize}
                      </span>
                      <span className="text-xs bg-neutral-100 border border-neutral-200 px-2.5 py-0.5 rounded-lg font-semibold text-neutral-700">
                        {selectedColor}
                      </span>
                    </div>

                    <div className="flex items-baseline space-x-2 mt-2">
                      <span className="text-sm font-black text-neutral-900">
                        {formatINR(product.price)} each
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-neutral-400 line-through">
                          {formatINR(product.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-4 pt-2 sm:pt-0 border-t sm:border-t-0 border-neutral-100">
                  <div className="text-right">
                    <span className="text-base font-black text-neutral-900">
                      {formatINR(product.price * quantity)}
                    </span>
                  </div>

                  <div className="flex items-center space-x-3">
                    {/* Quantity controls */}
                    <div className="flex items-center border border-neutral-300 rounded-xl bg-neutral-50 overflow-hidden">
                      <button
                        onClick={() => updateQuantity(product.id, selectedSize, selectedColor, -1)}
                        className="p-1.5 hover:bg-neutral-200 text-neutral-700 transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs font-bold text-neutral-900">
                        {quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(product.id, selectedSize, selectedColor, 1)}
                        className="p-1.5 hover:bg-neutral-200 text-neutral-700 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(product.id, selectedSize, selectedColor)}
                      className="p-2 text-neutral-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Price Breakdown Sticky Box */}
        <div className="lg:col-span-4">
          <div className="bg-white p-6 rounded-3xl border border-neutral-200/80 shadow-sm sticky top-28 space-y-6">
            <h2 className="text-base font-black uppercase text-neutral-900 tracking-wider pb-3 border-b border-neutral-100">
              Order Summary
            </h2>

            {/* Promo Code Input */}
            <div>
              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-800">
                  <div className="flex items-center space-x-2">
                    <Tag className="w-4 h-4 text-emerald-600" />
                    <span>Coupon <strong>{appliedCoupon.code}</strong> applied</span>
                  </div>
                  <button onClick={removeCoupon} className="text-xs font-bold text-red-600 hover:underline">
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="space-y-2">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Coupon (e.g. HYPED20)"
                      value={couponCodeInput}
                      onChange={(e) => setCouponCodeInput(e.target.value)}
                      className="flex-1 text-xs uppercase px-3.5 py-2.5 border border-neutral-300 rounded-xl focus:border-black focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2.5 bg-black text-white font-bold text-xs uppercase rounded-xl hover:bg-neutral-800"
                    >
                      Apply
                    </button>
                  </div>
                  {couponError && (
                    <p className="text-[11px] text-red-500 flex items-center space-x-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{couponError}</span>
                    </p>
                  )}
                </form>
              )}
            </div>

            {/* Cost Breakdown */}
            <div className="space-y-3 text-xs text-neutral-600 border-t border-neutral-100 pt-4">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-semibold text-neutral-900">{formatINR(subtotal)}</span>
              </div>
              {appliedCoupon && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Coupon Discount ({appliedCoupon.code})</span>
                  <span>-{formatINR(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Estimated Shipping</span>
                <span>{shippingFee === 0 ? <strong className="text-emerald-600 font-bold">FREE</strong> : formatINR(shippingFee)}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Sales Tax (8%)</span>
                <span className="font-semibold text-neutral-900">{formatINR(Math.round(subtotal * 0.08))}</span>
              </div>
              <div className="flex justify-between text-lg font-black text-neutral-900 pt-3 border-t border-neutral-200">
                <span>Total Amount</span>
                <span className="text-[#FF3E6C]">{formatINR(grandTotal)}</span>
              </div>
            </div>

            {/* Proceed to Checkout Action */}
            <button
              onClick={() => navigateTo('checkout')}
              className="w-full py-4 bg-black hover:bg-neutral-800 text-white rounded-2xl font-black text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-transform active:scale-[0.98] shadow-xl"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4 text-[#FFA41C]" />
            </button>

            <div className="flex items-center justify-center space-x-2 text-[11px] text-neutral-400">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>100% Encrypted & Safe 256-bit Checkout</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
