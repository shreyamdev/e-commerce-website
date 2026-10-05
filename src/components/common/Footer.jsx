import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Headphones, 
  ArrowRight, 
  Instagram, 
  Twitter, 
  Youtube, 
  CheckCircle 
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const Footer = () => {
  const { navigateTo, setSelectedCategory } = useStore();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-[#111111] text-white border-t border-neutral-800">
      {/* Trust & Guarantee Strip */}
      <div className="border-b border-neutral-800/80 py-10 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center sm:text-left">
            
            <div className="flex items-center space-x-3.5">
              <div className="w-12 h-12 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-[#FF3E6C] shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-white">100% Authentic</h4>
                <p className="text-[11px] text-neutral-400 mt-0.5">Verified original drops only</p>
              </div>
            </div>

            <div className="flex items-center space-x-3.5">
              <div className="w-12 h-12 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-[#FFA41C] shrink-0">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-white">Express Delivery</h4>
                <p className="text-[11px] text-neutral-400 mt-0.5">Free delivery on orders $100+</p>
              </div>
            </div>

            <div className="flex items-center space-x-3.5">
              <div className="w-12 h-12 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-emerald-400 shrink-0">
                <RotateCcw className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-white">14-Day Returns</h4>
                <p className="text-[11px] text-neutral-400 mt-0.5">Instant doorstep pickup</p>
              </div>
            </div>

            <div className="flex items-center space-x-3.5">
              <div className="w-12 h-12 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-blue-400 shrink-0">
                <Headphones className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-white">24/7 Priority Support</h4>
                <p className="text-[11px] text-neutral-400 mt-0.5">Live chat & express support</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          
          {/* Brand Info & Newsletter */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center font-black">
                H
              </div>
              <span className="text-2xl font-black tracking-tighter uppercase">
                HYPED<span className="text-[#FF3E6C]">.CO</span>
              </span>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              The premier destination for high-end streetwear, vault sneaker drops, and oversized technical apparel. Built by sneakerheads, for sneakerheads.
            </p>

            {/* Newsletter Subscription */}
            <div className="pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-300 block mb-2">
                Join the VIP Drop Ticker
              </span>
              <form onSubmit={handleSubscribe} className="flex max-w-sm">
                <input
                  type="email"
                  required
                  placeholder="Enter your college or personal email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-neutral-900 border border-neutral-700 text-xs px-3.5 py-2.5 rounded-l-xl focus:outline-none focus:border-white flex-1 text-white placeholder-neutral-500"
                />
                <button
                  type="submit"
                  className="bg-[#FF3E6C] hover:bg-[#e0355f] text-white px-4 py-2.5 rounded-r-xl font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
              {subscribed && (
                <p className="text-emerald-400 text-xs font-semibold mt-2 flex items-center space-x-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Welcome to the inner circle! 10% coupon emailed.</span>
                </p>
              )}
            </div>
          </div>

          {/* Quick Nav Columns */}
          <div>
            <h5 className="text-xs font-black uppercase tracking-wider text-neutral-300 mb-4">
              Explore Drops
            </h5>
            <ul className="space-y-2 text-xs text-neutral-400 font-medium">
              <li>
                <button 
                  onClick={() => { setSelectedCategory('sneakers'); navigateTo('shop'); }}
                  className="hover:text-white transition-colors"
                >
                  Sneakers Vault
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setSelectedCategory('hoodies'); navigateTo('shop'); }}
                  className="hover:text-white transition-colors"
                >
                  Acid Wash Hoodies
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setSelectedCategory('t-shirts'); navigateTo('shop'); }}
                  className="hover:text-white transition-colors"
                >
                  Oversized Graphic Tees
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setSelectedCategory('cargo'); navigateTo('shop'); }}
                  className="hover:text-white transition-colors"
                >
                  Tactical Cargo Pants
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setSelectedCategory('jackets'); navigateTo('shop'); }}
                  className="hover:text-white transition-colors"
                >
                  Bombers & Puffer Vests
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-black uppercase tracking-wider text-neutral-300 mb-4">
              Orders & Care
            </h5>
            <ul className="space-y-2 text-xs text-neutral-400 font-medium">
              <li>
                <button onClick={() => navigateTo('order-tracking')} className="hover:text-white transition-colors">
                  Track Live Shipment
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('cart')} className="hover:text-white transition-colors">
                  Shopping Bag
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('wishlist')} className="hover:text-white transition-colors">
                  Saved Wishlist
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('admin')} className="hover:text-white transition-colors">
                  Admin Analytics
                </button>
              </li>
              <li className="text-neutral-500">Shipping Policy (Global)</li>
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-black uppercase tracking-wider text-neutral-300 mb-4">
              Connect With Us
            </h5>
            <div className="flex space-x-3 mb-4">
              <a href="#instagram" className="w-8 h-8 rounded-lg bg-neutral-900 flex items-center justify-center hover:bg-[#FF3E6C] transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#twitter" className="w-8 h-8 rounded-lg bg-neutral-900 flex items-center justify-center hover:bg-sky-500 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#youtube" className="w-8 h-8 rounded-lg bg-neutral-900 flex items-center justify-center hover:bg-red-600 transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
            <p className="text-[11px] text-neutral-500">
              College Team Project: Full-Stack E-Commerce Application Frontend
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-900 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <p>© 2026 HYPED.CO. All rights reserved. Designed for College Project Showcase.</p>
          <div className="flex space-x-6 text-[11px]">
            <span className="hover:text-white cursor-pointer">Privacy Notice</span>
            <span className="hover:text-white cursor-pointer">Terms & Conditions</span>
            <span className="hover:text-white cursor-pointer">Cookie Preferences</span>
          </div>
        </div>
      </div>
    </footer>
  );
};