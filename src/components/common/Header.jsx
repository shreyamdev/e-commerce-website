import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Heart, 
  ShoppingBag, 
  User, 
  Menu, 
  X, 
  SlidersHorizontal,
  ChevronDown,
  Sparkles,
  Package,
  ShieldCheck,
  Flame,
  Sun,
  Moon
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { CATEGORIES } from '../../data/products';

export const Header = () => {
  const { 
    currentView, 
    navigateTo, 
    searchQuery, 
    setSearchQuery, 
    selectedCategory, 
    setSelectedCategory 
  } = useStore();
  
  const { totalItemsCount, setIsDrawerOpen } = useCart();
  const { wishlistCount } = useWishlist();

 
  const [isDark, setIsDark] = useState(() => {
    try {
      return localStorage.getItem('hyped_theme') === 'dark';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('hyped_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('hyped_theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigateTo('shop');
  };

  const handleNavClick = (view, category = null) => {
    if (category) {
      setSelectedCategory(category);
    }
    navigateTo(view);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
        
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <button 
              onClick={() => handleNavClick('home')}
              className="flex items-center space-x-2 text-left group focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-black dark:bg-neutral-800 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform border border-neutral-800 dark:border-neutral-700">
                <span className="font-extrabold text-xl tracking-tighter text-[#FF3E6C]">H</span>
              </div>
              <div>
                <span className="text-2xl font-black tracking-tighter text-[#111111] dark:text-white uppercase block leading-none">
                  HYPED<span className="text-[#FF3E6C]">.CO</span>
                </span>
                <span className="text-[10px] tracking-widest text-neutral-600 dark:text-neutral-400 uppercase font-semibold">
                  Streets & Soles
                </span>
              </div>
            </button>
          </div>*/

          {/* Amazon-Style Search Bar Setup */}
         /* <div className="hidden md:flex flex-1 max-w-xl mx-4">
            <form 
              onSubmit={handleSearchSubmit}
              className="flex w-full items-center rounded-full border-2 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 hover:border-black dark:hover:border-neutral-500 focus-within:border-black dark:focus-within:border-white focus-within:bg-white dark:focus-within:bg-neutral-900 transition-all overflow-hidden shadow-sm"
            >
             
              <div className="relative border-r border-neutral-200 dark:border-neutral-700">
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    if (currentView !== 'shop') navigateTo('shop');
                  }}
                  className="appearance-none bg-transparent py-2.5 pl-3.5 pr-7 text-xs font-semibold text-neutral-700 dark:text-neutral-300 focus:outline-none cursor-pointer hover:text-black dark:hover:text-white"
                >
                  <option value="all" className="dark:bg-neutral-900">All Items</option>
                  <option value="sneakers" className="dark:bg-neutral-900">Sneakers</option>
                  <option value="hoodies" className="dark:bg-neutral-900">Hoodies</option>
                  <option value="t-shirts" className="dark:bg-neutral-900">T-Shirts</option>
                  <option value="cargo" className="dark:bg-neutral-900">Cargos</option>
                  <option value="jackets" className="dark:bg-neutral-900">Jackets</option>
                  <option value="accessories" className="dark:bg-neutral-900">Accessories</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-neutral-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

        
              <div className="relative flex-1 flex items-center">
                <input
                  type="text"
                  placeholder="Search drops, sneakers, Nike, hoodies, acid-wash..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (currentView !== 'shop' && currentView !== 'home') {
                      navigateTo('shop');
                    }
                  }}
                  className="w-full bg-transparent px-4 py-2.5 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="p-1 mr-2 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 rounded-full"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

            
              <button
                type="submit"
                className="bg-black hover:bg-neutral-800 text-white p-3 px-5 transition-colors flex items-center justify-center"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>
          </div>

      
          <nav className="hidden lg:flex items-center space-x-7 text-sm font-bold tracking-tight text-neutral-800 dark:text-neutral-200">
            <button
              onClick={() => handleNavClick('home')}
              className={`hover:text-[#FF3E6C] transition-colors py-2 relative ${
                currentView === 'home' ? 'text-[#FF3E6C]' : ''
              }`}
            >
              Home
              {currentView === 'home' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#FF3E6C] rounded-full" />
              )}
            </button>

            <button
              onClick={() => handleNavClick('shop', 'all')}
              className={`hover:text-[#FF3E6C] transition-colors py-2 relative ${
                currentView === 'shop' && selectedCategory === 'all' ? 'text-[#FF3E6C]' : ''
              }`}
            >
              All Drops
              {currentView === 'shop' && selectedCategory === 'all' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#FF3E6C] rounded-full" />
              )}
            </button>

            <button
              onClick={() => handleNavClick('shop', 'sneakers')}
              className={`hover:text-[#FF3E6C] transition-colors py-2 relative ${
                selectedCategory === 'sneakers' && currentView === 'shop' ? 'text-[#FF3E6C]' : ''
              }`}
            >
              Sneakers
            </button>

            <button
              onClick={() => handleNavClick('shop', 'hoodies')}
              className={`hover:text-[#FF3E6C] transition-colors py-2 relative ${
                selectedCategory === 'hoodies' && currentView === 'shop' ? 'text-[#FF3E6C]' : ''
              }`}
            >
              Hoodies
            </button>

            <button
              onClick={() => {
                setSelectedCategory('all');
                navigateTo('shop');
              }}
              className="text-[#FF3E6C] flex items-center space-x-1 hover:opacity-80 transition-opacity"
            >
              <Flame className="w-4 h-4 fill-[#FF3E6C]" />
              <span>Sale</span>
            </button>

            <button
              onClick={() => navigateTo('admin')}
              className={`px-3 py-1 text-xs font-semibold rounded-full border transition-all ${
                currentView === 'admin'
                  ? 'bg-neutral-900 dark:bg-white text-white dark:text-black border-neutral-900 dark:border-white'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-700 hover:border-black dark:hover:border-white'
              }`}
            >
              Admin
            </button>
          </nav>

        
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2.5 rounded-full text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 transition-all transform active:scale-95 cursor-pointer shadow-sm"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-[#FFA41C]" />
              ) : (
                <Moon className="w-5 h-5 text-neutral-800" />
              )}
            </button>*/

            {/* Wishlist Icon */}
          /*  <button
             onClick={() => navigateTo('wishlist')}
              className="relative p-2.5 text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors"
              title="View Wishlist"
              aria-label="Wishlist"
            >
              <Heart className={`w-6 h-6 ${wishlistCount > 0 ? 'text-[#FF3E6C] fill-[#FF3E6C]' : ''}`} />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 bg-[#FF3E6C] text-white text-[11px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center shadow-sm animate-pulse-glow">
                  {wishlistCount}
                </span>
              )}
            </button>*/

            {/* Cart Trigger with item count and slide-over activation */}
          /*  <button
              onClick={() => setIsDrawerOpen(true)}
              className="relative flex items-center p-2.5 text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors group"
              title="Open Cart"
              aria-label="Cart"
            >
              <ShoppingBag className="w-6 h-6 text-neutral-900 dark:text-white group-hover:scale-105 transition-transform" />
              {totalItemsCount > 0 && (
                <span className="absolute top-1 right-1 bg-black text-[#FFA41C] text-[11px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center shadow-sm border border-neutral-800">
                  {totalItemsCount}
                </span>
              )}
            </button>

            {/* Profile Dropdown */}
           /* <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center space-x-2 p-1.5 sm:px-3 sm:py-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 transition-colors"
                aria-label="Account menu"
              >
                <div className="w-7 h-7 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-black flex items-center justify-center font-bold text-xs">
                  JD
                </div>
                <span className="hidden sm:inline text-xs font-bold text-neutral-800 dark:text-neutral-200">Alex</span>
                <ChevronDown className="w-3.5 h-3.5 text-neutral-500" />
              </button>

              {profileDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-56 bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-100 dark:border-neutral-800 py-2 z-50 animate-fade-in"
                  onMouseLeave={() => setProfileDropdownOpen(false)}
                >
                  <div className="px-4 py-2 border-b border-neutral-100 dark:border-neutral-800">
                    <p className="text-xs text-neutral-500">Signed in as</p>
                    <p className="text-sm font-bold text-neutral-900 dark:text-white truncate">alex.hype@college.edu</p>
                    <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-extrabold bg-[#FFA41C]/20 text-[#111111] dark:text-[#FFA41C] rounded-full">
                      VIP Street Member
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      navigateTo('order-tracking');
                      setProfileDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:text-black dark:hover:text-white flex items-center space-x-2.5 font-medium"
                  >
                    <Package className="w-4 h-4 text-neutral-500" />
                    <span>Track Active Orders</span>
                  </button>

                  <button
                    onClick={() => {
                      navigateTo('wishlist');
                      setProfileDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:text-black dark:hover:text-white flex items-center space-x-2.5 font-medium"
                  >
                    <Heart className="w-4 h-4 text-[#FF3E6C]" />
                    <span>My Wishlist ({wishlistCount})</span>
                  </button>

                  <button
                    onClick={() => {
                      navigateTo('admin');
                      setProfileDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:text-black dark:hover:text-white flex items-center space-x-2.5 font-medium"
                  >
                    <SlidersHorizontal className="w-4 h-4 text-blue-500" />
                    <span>Admin Dashboard</span>
                  </button>

                  <div className="border-t border-neutral-100 dark:border-neutral-800 mt-2 pt-2 px-4">
                    <p className="text-[11px] text-neutral-400">College Team Project Build v1.0</p>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>*/

        {/* Mobile Search Input Bar */}
     /*   <div className="md:hidden pb-3">
          <form 
            onSubmit={handleSearchSubmit}
            className="flex items-center rounded-full border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-3 py-2 text-sm focus-within:border-black dark:focus-within:border-white focus-within:bg-white dark:focus-within:bg-neutral-900"
          >
            <Search className="w-4 h-4 text-neutral-400 mr-2" />
            <input
              type="text"
              placeholder="Search sneakers, hoodies, drops..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-xs text-neutral-900 dark:text-white focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-neutral-400 p-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </form>
        </div>
      </div>*/

      {/* Mobile Drawer Menu */}
     /* {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}>
          <div 
            className="w-4/5 max-w-sm h-full bg-white dark:bg-neutral-900 p-6 shadow-2xl flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-neutral-200 dark:border-neutral-800">
                <span className="text-xl font-black tracking-tighter text-[#111111] dark:text-white">
                  HYPED<span className="text-[#FF3E6C]">.CO</span>
                </span>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-6 flex flex-col space-y-4">
                <button
                  onClick={() => handleNavClick('home')}
                  className="text-left font-bold text-lg text-neutral-900 dark:text-white hover:text-[#FF3E6C]"
                >
                  Home
                </button>
                <button
                  onClick={() => handleNavClick('shop', 'all')}
                  className="text-left font-bold text-lg text-neutral-900 dark:text-white hover:text-[#FF3E6C]"
                >
                  All Drops
                </button>
                <button
                  onClick={() => handleNavClick('shop', 'sneakers')}
                  className="text-left font-bold text-lg text-neutral-900 dark:text-white hover:text-[#FF3E6C]"
                >
                  Sneakers Vault
                </button>
                <button
                  onClick={() => handleNavClick('shop', 'hoodies')}
                  className="text-left font-bold text-lg text-neutral-900 dark:text-white hover:text-[#FF3E6C]"
                >
                  Hoodies & Fleece
                </button>
                <button
                  onClick={() => handleNavClick('shop', 'cargo')}
                  className="text-left font-bold text-lg text-neutral-900 dark:text-white hover:text-[#FF3E6C]"
                >
                  Cargo & Pants
                </button>
                <button
                  onClick={() => handleNavClick('admin')}
                  className="text-left font-bold text-lg text-blue-600 hover:text-blue-400"
                >
                  Store Admin Panel
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800">
              <div className="flex items-center space-x-3 bg-neutral-100 dark:bg-neutral-800 p-3 rounded-xl">
                <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold text-xs">
                  JD
                </div>
                <div>
                  <p className="text-sm font-bold text-neutral-900 dark:text-white">Alex Rivera</p>
                  <p className="text-xs text-neutral-500">alex.hype@college.edu</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};