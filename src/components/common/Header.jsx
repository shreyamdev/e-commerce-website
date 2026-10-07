import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Heart, 
  ShoppingBag, 
  User, 
  Menu, 
  X, 
  ChevronDown,
  Flame,
  Sun,
  Moon,
  LogOut,
  LogIn,
  ShieldCheck,
  Package,
  Layers,
  ArrowRight
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
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

  // Safe Auth Hook consumption with fallback
  let authData = { user: null, isAuthenticated: false, logout: () => {}, hasRole: () => false };
  try {
    if (typeof useAuth === 'function') {
      const auth = useAuth();
      if (auth) authData = auth;
    }
  } catch (err) {
    // Graceful fallback if AuthProvider is still loading
  }
  const { user, isAuthenticated, logout, hasRole } = authData;

  // Dark Mode Theme State
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

  // Dropdown & Menu States
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);

  const profileRef = useRef(null);
  const categoryRef = useRef(null);

  // Click outside listener for dropdowns
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileDropdownOpen(false);
      }
      if (categoryRef.current && !categoryRef.current.contains(e.target)) {
        setCategoryDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Safe categories list
  const categoryList = Array.isArray(CATEGORIES) && CATEGORIES.length > 0 
    ? CATEGORIES 
    : ['All', 'Sneakers', 'Hoodies', 'T-Shirts', 'Accessories', 'Collectibles'];

  const getCatLabel = (cat) => (typeof cat === 'object' && cat !== null ? (cat.name || cat.label || cat.id) : cat);
  const getCatValue = (cat) => (typeof cat === 'object' && cat !== null ? (cat.id || cat.slug || cat.name) : cat);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigateTo('shop');
    setMobileMenuOpen(false);
  };

  const handleNavClick = (view, category = null) => {
    if (category !== null && setSelectedCategory) {
      setSelectedCategory(category);
    }
    navigateTo(view);
    setMobileMenuOpen(false);
    setProfileDropdownOpen(false);
    setCategoryDropdownOpen(false);
  };

  const handleSignOut = () => {
    if (logout) logout();
    setProfileDropdownOpen(false);
    navigateTo('home');
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-3 md:gap-6">
          
          {/* Left: Mobile Toggle & Brand Logo */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <button 
              onClick={() => handleNavClick('home')}
              className="flex items-center space-x-2.5 text-left group focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center shadow-md group-hover:scale-105 transition-transform border border-neutral-800 dark:border-neutral-200">
                <Flame className="w-5 h-5 fill-current" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tighter uppercase font-heading text-neutral-950 dark:text-white leading-none">
                  HYPED<span className="text-rose-500">.</span>CO
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-400 dark:text-neutral-500">
                  Exclusive Streetwear
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            <button
              onClick={() => handleNavClick('home')}
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-colors ${
                currentView === 'home'
                  ? 'text-black dark:text-white bg-neutral-100 dark:bg-neutral-800'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-neutral-800/50'
              }`}
            >
              Home
            </button>

            {/* Catalog Dropdown */}
            <div className="relative" ref={categoryRef}>
              <button
                onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold transition-colors ${
                  currentView === 'shop'
                    ? 'text-black dark:text-white bg-neutral-100 dark:bg-neutral-800'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-neutral-800/50'
                }`}
              >
                <span>Explore Catalog</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${categoryDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {categoryDropdownOpen && (
                <div className="absolute left-0 mt-2 w-56 rounded-2xl bg-white dark:bg-neutral-900 shadow-2xl border border-neutral-200 dark:border-neutral-800 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <button
                    onClick={() => handleNavClick('shop', 'All')}
                    className="w-full text-left px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-rose-500 hover:bg-neutral-50 dark:hover:bg-neutral-800 flex items-center justify-between"
                  >
                    <span>View All Drops</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <div className="my-1 border-t border-neutral-100 dark:border-neutral-800" />
                  {categoryList.map((cat, idx) => {
                    const label = getCatLabel(cat);
                    const val = getCatValue(cat);
                    return (
                      <button
                        key={idx}
                        onClick={() => handleNavClick('shop', val)}
                        className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                          selectedCategory === val
                            ? 'font-bold text-black dark:text-white bg-neutral-100 dark:bg-neutral-800'
                            : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800'
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <button
              onClick={() => handleNavClick('order-tracking')}
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-colors ${
                currentView === 'order-tracking'
                  ? 'text-black dark:text-white bg-neutral-100 dark:bg-neutral-800'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-neutral-800/50'
              }`}
            >
              Track Order
            </button>
          </nav>

          {/* Center: Search Bar */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-md mx-2 relative items-center">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery || ''}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search kicks, streetwear, hoodies..."
              className="w-full pl-10 pr-9 py-2.5 text-sm bg-neutral-100 dark:bg-neutral-800/80 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 rounded-xl border border-transparent focus:border-neutral-400 dark:focus:border-neutral-600 focus:bg-white dark:focus:bg-neutral-900 transition-all outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </form>

          {/* Right: Actions (Theme Toggle, Wishlist, Cart, Profile) */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-black dark:hover:text-white transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => handleNavClick('shop')}
              className="relative p-2.5 rounded-xl text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-black dark:hover:text-white transition-colors"
              aria-label="View Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-[11px] font-black rounded-full flex items-center justify-center shadow-md animate-pulse">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Drawer Trigger */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="relative p-2.5 rounded-xl text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-black dark:hover:text-white transition-colors group"
              aria-label="Open Cart Bag"
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {totalItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-black dark:bg-white text-white dark:text-black text-[11px] font-black rounded-full flex items-center justify-center shadow-md">
                  {totalItemsCount}
                </span>
              )}
            </button>

            {/* User Profile / Auth Menu */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className={`p-2.5 rounded-xl transition-colors flex items-center gap-1.5 ${
                  isAuthenticated
                    ? 'bg-neutral-100 dark:bg-neutral-800 text-black dark:text-white'
                    : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                }`}
                aria-label="User account menu"
              >
                {isAuthenticated ? (
                  <div className="w-6 h-6 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center text-xs font-black">
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                ) : (
                  <User className="w-5 h-5" />
                )}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${profileDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Profile Dropdown Card */}
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white dark:bg-neutral-900 shadow-2xl border border-neutral-200 dark:border-neutral-800 py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  {isAuthenticated ? (
                    <>
                      {/* Authenticated User Header */}
                      <div className="px-4 py-2 border-b border-neutral-100 dark:border-neutral-800">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-bold text-neutral-900 dark:text-white truncate">
                            {user?.name || 'Streetwear Collector'}
                          </p>
                          {user?.role && (
                            <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-500 border border-rose-500/20">
                              {user.role}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate mt-0.5">
                          {user?.email || 'authenticated'}
                        </p>
                      </div>

                      {/* Menu Links */}
                      <div className="py-1">
                        <button
                          onClick={() => handleNavClick('profile')}
                          className="w-full text-left px-4 py-2.5 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 flex items-center gap-2.5"
                        >
                          <User className="w-4 h-4 text-neutral-400" />
                          <span>My Profile</span>
                        </button>

                        <button
                          onClick={() => handleNavClick('order-tracking')}
                          className="w-full text-left px-4 py-2.5 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 flex items-center gap-2.5"
                        >
                          <Package className="w-4 h-4 text-neutral-400" />
                          <span>Track Order</span>
                        </button>

                        {/* Admin Dashboard (Role Protected) */}
                        {(user?.role === 'admin' || (hasRole && hasRole('admin'))) && (
                          <button
                            onClick={() => handleNavClick('admin')}
                            className="w-full text-left px-4 py-2.5 text-sm font-bold text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/30 flex items-center gap-2.5"
                          >
                            <ShieldCheck className="w-4 h-4 text-amber-500" />
                            <span>Admin Dashboard</span>
                          </button>
                        )}
                      </div>

                      {/* Sign Out Button */}
                      <div className="pt-1 border-t border-neutral-100 dark:border-neutral-800">
                        <button
                          onClick={handleSignOut}
                          className="w-full text-left px-4 py-2.5 text-sm font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 flex items-center gap-2.5"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Unauthenticated Greeting */}
                      <div className="px-4 py-2 border-b border-neutral-100 dark:border-neutral-800">
                        <p className="text-sm font-bold text-neutral-900 dark:text-white">
                          Welcome to HYPED.CO
                        </p>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                          Sign in for priority drop access
                        </p>
                      </div>

                      <div className="p-3">
                        <button
                          onClick={() => handleNavClick('auth')}
                          className="w-full py-2.5 px-4 rounded-xl bg-black dark:bg-white text-white dark:text-black text-sm font-bold shadow-md hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                        >
                          <LogIn className="w-4 h-4" />
                          <span>Sign In / Register</span>
                        </button>
                      </div>

                      <div className="border-t border-neutral-100 dark:border-neutral-800 pt-1">
                        <button
                          onClick={() => handleNavClick('order-tracking')}
                          className="w-full text-left px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 flex items-center gap-2.5"
                        >
                          <Package className="w-4 h-4 text-neutral-400" />
                          <span>Track Guest Order</span>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-neutral-200 dark:border-neutral-800 space-y-4 animate-in slide-in-from-top-4 duration-200">
            {/* Mobile Search */}
            <form onSubmit={handleSearchSubmit} className="relative">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery || ''}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search kicks, streetwear..."
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 rounded-xl outline-none"
              />
            </form>

            {/* Mobile Nav Links */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleNavClick('home')}
                className="p-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-sm font-bold text-left"
              >
                Home
              </button>
              <button
                onClick={() => handleNavClick('shop', 'All')}
                className="p-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-sm font-bold text-left"
              >
                All Drops
              </button>
              <button
                onClick={() => handleNavClick('order-tracking')}
                className="p-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-sm font-bold text-left"
              >
                Track Order
              </button>
              <button
                onClick={() => handleNavClick(isAuthenticated ? 'profile' : 'auth')}
                className="p-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-sm font-bold text-left flex items-center justify-between"
              >
                <span>{isAuthenticated ? 'My Profile' : 'Sign In'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Categories Carousel / Chips */}
            <div>
              <p className="text-xs uppercase font-bold tracking-wider text-neutral-400 mb-2">
                Browse Categories
              </p>
              <div className="flex flex-wrap gap-1.5">
                {categoryList.map((cat, idx) => {
                  const label = getCatLabel(cat);
                  const val = getCatValue(cat);
                  return (
                    <button
                      key={idx}
                      onClick={() => handleNavClick('shop', val)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                        selectedCategory === val
                          ? 'bg-black dark:bg-white text-white dark:text-black'
                          : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300'
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

      </div>
    </header>
  );
};

export default Header;