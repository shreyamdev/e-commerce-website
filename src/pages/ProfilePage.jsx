import React, { useState } from 'react';
import { 
  User, 
  Package, 
  MapPin, 
  CreditCard, 
  Bell, 
  ShieldCheck, 
  LogOut, 
  Edit3, 
  CheckCircle2, 
  Heart, 
  Sparkles, 
  Clock, 
  ChevronRight,
  Plus,
  Trash2,
  Check
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useWishlist } from '../context/WishlistContext';

export const ProfilePage = () => {
  const { navigateTo, placedOrder } = useStore();
  const { wishlistCount } = useWishlist();

  const [activeTab, setActiveTab] = useState('profile'); // 'profile' | 'orders' | 'addresses' | 'payments' | 'settings'
  const [isEditing, setIsEditing] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [userData, setUserData] = useState({
    fullName: 'Alex Rivera',
    email: 'alex.hype@college.edu',
    phone: '+1 (555) 234-8901',
    membership: 'VIP Street Member Tier 2',
    hypePoints: 850,
    joinDate: 'March 2025',
    gender: 'Male',
    dob: '1999-08-14'
  });

  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: 'Home (Default)',
      street: '742 Evergreen Terrace, Apt 4B',
      city: 'Metro City',
      state: 'California',
      zip: '90210',
      phone: '+1 (555) 234-8901',
      isDefault: true
    },
    {
      id: 2,
      type: 'College Campus / Dorm',
      street: 'West Quad Hall 302, University Ave',
      city: 'Metro City',
      state: 'California',
      zip: '90212',
      phone: '+1 (555) 234-8901',
      isDefault: false
    }
  ]);

  const [recentOrders, setRecentOrders] = useState([
    {
      id: placedOrder ? placedOrder.orderId : 'HYP-928104',
      item: placedOrder && placedOrder.items.length > 0 ? placedOrder.items[0].product.name : 'Air Matrix Pulse Phantom',
      image: placedOrder && placedOrder.items.length > 0 ? placedOrder.items[0].product.images[0] : 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=400&q=80',
      date: placedOrder ? placedOrder.date : 'Oct 04, 2026',
      total: placedOrder ? `$${placedOrder.total}` : '$159',
      status: 'In Transit',
      itemsCount: placedOrder ? placedOrder.items.length : 1
    },
    {
      id: 'HYP-884210',
      item: 'Retro High OG "Cyber Rust"',
      image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=400&q=80',
      date: 'Sep 21, 2026',
      total: '$189',
      status: 'Delivered',
      itemsCount: 1
    },
    {
      id: 'HYP-771923',
      item: 'Heavyweight Acid-Wash Oversized Hoodie',
      image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=400&q=80',
      date: 'Aug 14, 2026',
      total: '$79',
      status: 'Delivered',
      itemsCount: 2
    }
  ]);

  const [notificationSettings, setNotificationSettings] = useState({
    dropAlerts: true,
    orderSms: true,
    newsletter: false
  });

  const handleProfileSave = (e) => {
    e.preventDefault();
    setIsEditing(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleSetDefaultAddress = (id) => {
    setAddresses(prev => prev.map(a => ({
      ...a,
      isDefault: a.id === id
    })));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      {/* Top Banner / Breadcrumb */}
      <div>
        <div className="flex items-center space-x-2 text-xs text-neutral-500 mb-2">
          <button onClick={() => navigateTo('home')} className="hover:text-black dark:hover:text-white">Home</button>
          <span>/</span>
          <span className="text-black dark:text-white font-semibold">My Account</span>
        </div>
        <h1 className="text-3xl font-black uppercase tracking-tight text-neutral-900 dark:text-white">
          Account & Profile
        </h1>
      </div>

      {/* Main Grid: Left Profile Sidebar + Right Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: User Card & Navigation Tabs */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* User Bio Card */}
          <div className="bg-white dark:bg-neutral-900 p-6 rounded-3xl border border-neutral-200/80 dark:border-neutral-800 shadow-sm text-center relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-[#FFA41C] via-[#FF3E6C] to-black" />
            
            <div className="w-20 h-20 mx-auto rounded-full bg-black dark:bg-neutral-800 text-white flex items-center justify-center font-black text-2xl border-4 border-white dark:border-neutral-700 shadow-md mt-2">
              JD
            </div>

            <h2 className="text-lg font-black text-neutral-900 dark:text-white mt-3">
              {userData.fullName}
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              {userData.email}
            </p>

            {/* Loyalty / Membership Pill */}
            <div className="mt-3 inline-flex items-center space-x-1.5 px-3 py-1 bg-amber-50 dark:bg-neutral-800 border border-amber-200 dark:border-neutral-700 rounded-full text-xs font-bold text-amber-900 dark:text-amber-400">
              <Sparkles className="w-3.5 h-3.5 text-[#FFA41C]" />
              <span>{userData.membership}</span>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-2 mt-6 pt-6 border-t border-neutral-100 dark:border-neutral-800 text-center">
              <div className="bg-neutral-50 dark:bg-neutral-800/50 p-2.5 rounded-2xl">
                <span className="text-lg font-black text-neutral-900 dark:text-white block">
                  {userData.hypePoints}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                  Hype Points
                </span>
              </div>
              <div 
                onClick={() => navigateTo('wishlist')}
                className="bg-neutral-50 dark:bg-neutral-800/50 p-2.5 rounded-2xl cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              >
                <span className="text-lg font-black text-[#FF3E6C] block">
                  {wishlistCount}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                  Wishlist Drops
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Tabs Menu */}
          <div className="bg-white dark:bg-neutral-900 p-3 rounded-3xl border border-neutral-200/80 dark:border-neutral-800 shadow-sm space-y-1">
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                activeTab === 'profile'
                  ? 'bg-black text-white shadow-md'
                  : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
              }`}
            >
              <div className="flex items-center space-x-3">
                <User className="w-4 h-4" />
                <span>Personal Information</span>
              </div>
              <ChevronRight className="w-4 h-4 opacity-70" />
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                activeTab === 'orders'
                  ? 'bg-black text-white shadow-md'
                  : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Package className="w-4 h-4" />
                <span>My Orders & Returns</span>
              </div>
              <ChevronRight className="w-4 h-4 opacity-70" />
            </button>

            <button
              onClick={() => setActiveTab('addresses')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                activeTab === 'addresses'
                  ? 'bg-black text-white shadow-md'
                  : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
              }`}
            >
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4" />
                <span>Saved Addresses</span>
              </div>
              <ChevronRight className="w-4 h-4 opacity-70" />
            </button>

            <button
              onClick={() => setActiveTab('payments')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                activeTab === 'payments'
                  ? 'bg-black text-white shadow-md'
                  : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
              }`}
            >
              <div className="flex items-center space-x-3">
                <CreditCard className="w-4 h-4" />
                <span>Saved Cards & UPI</span>
              </div>
              <ChevronRight className="w-4 h-4 opacity-70" />
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                activeTab === 'settings'
                  ? 'bg-black text-white shadow-md'
                  : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Bell className="w-4 h-4" />
                <span>Notifications & Security</span>
              </div>
              <ChevronRight className="w-4 h-4 opacity-70" />
            </button>

            <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800">
              <button
                onClick={() => navigateTo('home')}
                className="w-full flex items-center space-x-3 px-4 py-3 text-xs font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-2xl transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>

        </div>

        {/* Right Column: Active Tab Content */}
        <div className="lg:col-span-8">
          
          {/* 1. PERSONAL INFORMATION TAB */}
          {activeTab === 'profile' && (
            <div className="bg-white dark:bg-neutral-900 p-6 sm:p-8 rounded-3xl border border-neutral-200/80 dark:border-neutral-800 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-100 dark:border-neutral-800">
                <div>
                  <h3 className="text-base font-black uppercase text-neutral-900 dark:text-white tracking-wider">
                    Personal Details
                  </h3>
                  <p className="text-xs text-neutral-500">Manage your profile information and credentials</p>
                </div>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-4 py-2 border border-neutral-300 dark:border-neutral-700 hover:border-black dark:hover:border-white rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-colors"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
                </button>
              </div>

              {savedSuccess && (
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs text-emerald-800 dark:text-emerald-300 font-bold flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Profile updated successfully!</span>
                </div>
              )}

              <form onSubmit={handleProfileSave} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-700 dark:text-neutral-300 mb-1">Full Name</label>
                    <input
                      type="text"
                      disabled={!isEditing}
                      value={userData.fullName}
                      onChange={(e) => setUserData({ ...userData, fullName: e.target.value })}
                      className="w-full text-xs px-3.5 py-3 border border-neutral-300 dark:border-neutral-700 rounded-xl bg-neutral-50 dark:bg-neutral-800 disabled:opacity-75 focus:outline-none focus:border-black dark:focus:border-white text-neutral-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-700 dark:text-neutral-300 mb-1">Email Address</label>
                    <input
                      type="email"
                      disabled={!isEditing}
                      value={userData.email}
                      onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                      className="w-full text-xs px-3.5 py-3 border border-neutral-300 dark:border-neutral-700 rounded-xl bg-neutral-50 dark:bg-neutral-800 disabled:opacity-75 focus:outline-none focus:border-black dark:focus:border-white text-neutral-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-700 dark:text-neutral-300 mb-1">Phone Number</label>
                    <input
                      type="text"
                      disabled={!isEditing}
                      value={userData.phone}
                      onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                      className="w-full text-xs px-3.5 py-3 border border-neutral-300 dark:border-neutral-700 rounded-xl bg-neutral-50 dark:bg-neutral-800 disabled:opacity-75 focus:outline-none focus:border-black dark:focus:border-white text-neutral-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-700 dark:text-neutral-300 mb-1">Date of Birth</label>
                    <input
                      type="date"
                      disabled={!isEditing}
                      value={userData.dob}
                      onChange={(e) => setUserData({ ...userData, dob: e.target.value })}
                      className="w-full text-xs px-3.5 py-3 border border-neutral-300 dark:border-neutral-700 rounded-xl bg-neutral-50 dark:bg-neutral-800 disabled:opacity-75 focus:outline-none focus:border-black dark:focus:border-white text-neutral-900 dark:text-white"
                    />
                  </div>
                </div>

                {isEditing && (
                  <div className="pt-4 flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-black text-xs uppercase tracking-wider rounded-xl shadow-md hover:bg-neutral-800 transition-colors"
                    >
                      Save Changes
                    </button>
                  </div>
                )}
              </form>
            </div>
          )}

          {/* 2. MY ORDERS TAB */}
          {activeTab === 'orders' && (
            <div className="bg-white dark:bg-neutral-900 p-6 sm:p-8 rounded-3xl border border-neutral-200/80 dark:border-neutral-800 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-100 dark:border-neutral-800">
                <div>
                  <h3 className="text-base font-black uppercase text-neutral-900 dark:text-white tracking-wider">
                    Order History ({recentOrders.length})
                  </h3>
                  <p className="text-xs text-neutral-500">Track shipments, view invoices, and manage returns</p>
                </div>
              </div>

              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div 
                    key={order.id}
                    className="p-4 sm:p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center space-x-4">
                      <img 
                        src={order.image} 
                        alt="" 
                        className="w-16 h-20 object-cover rounded-xl bg-neutral-200 shrink-0" 
                      />
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-mono text-xs font-black text-neutral-900 dark:text-white">
                            {order.id}
                          </span>
                          <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                            order.status === 'Delivered' 
                              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                              : 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-neutral-800 dark:text-neutral-200 mt-1 line-clamp-1">
                          {order.item}
                        </h4>
                        <p className="text-[11px] text-neutral-400 mt-0.5">
                          Ordered on {order.date} • {order.itemsCount} {order.itemsCount === 1 ? 'item' : 'items'}
                        </p>
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3">
                      <span className="text-sm font-black text-neutral-900 dark:text-white">
                        {order.total}
                      </span>
                      <button
                        onClick={() => navigateTo('order-tracking')}
                        className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-xl text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity"
                      >
                        Track Order
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. SAVED ADDRESSES TAB */}
          {activeTab === 'addresses' && (
            <div className="bg-white dark:bg-neutral-900 p-6 sm:p-8 rounded-3xl border border-neutral-200/80 dark:border-neutral-800 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-100 dark:border-neutral-800">
                <div>
                  <h3 className="text-base font-black uppercase text-neutral-900 dark:text-white tracking-wider">
                    Saved Addresses
                  </h3>
                  <p className="text-xs text-neutral-500">Manage delivery locations for faster checkout</p>
                </div>
                <button
                  className="px-3.5 py-2 bg-black dark:bg-white text-white dark:text-black rounded-xl text-xs font-bold flex items-center space-x-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add New</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {addresses.map((addr) => (
                  <div
                    key={addr.id}
                    className={`p-5 rounded-2xl border-2 transition-all flex flex-col justify-between ${
                      addr.isDefault 
                        ? 'border-black dark:border-white bg-neutral-50/70 dark:bg-neutral-800/50' 
                        : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-black uppercase text-neutral-900 dark:text-white">
                          {addr.type}
                        </span>
                        {addr.isDefault && (
                          <span className="text-[10px] bg-black text-white px-2 py-0.5 rounded-full font-bold">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                        {addr.street}<br />
                        {addr.city}, {addr.state} {addr.zip}<br />
                        Phone: {addr.phone}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-neutral-100 dark:border-neutral-800 flex justify-between items-center text-xs">
                      {!addr.isDefault ? (
                        <button
                          onClick={() => handleSetDefaultAddress(addr.id)}
                          className="font-bold text-neutral-800 dark:text-neutral-200 hover:underline"
                        >
                          Set as Default
                        </button>
                      ) : (
                        <span className="text-[11px] text-emerald-600 font-bold flex items-center space-x-1">
                          <Check className="w-3 h-3 stroke-[3]" />
                          <span>Primary Destination</span>
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. SAVED PAYMENTS TAB */}
          {activeTab === 'payments' && (
            <div className="bg-white dark:bg-neutral-900 p-6 sm:p-8 rounded-3xl border border-neutral-200/80 dark:border-neutral-800 shadow-sm space-y-6">
              <div className="pb-4 border-b border-neutral-100 dark:border-neutral-800">
                <h3 className="text-base font-black uppercase text-neutral-900 dark:text-white tracking-wider">
                  Payment Methods & Cards
                </h3>
                <p className="text-xs text-neutral-500">Securely stored payment options for 1-click checkout</p>
              </div>

              <div className="space-y-4">
                <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/40 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-8 bg-neutral-900 text-white rounded-lg flex items-center justify-center font-bold text-xs">
                      VISA
                    </div>
                    <div>
                      <p className="text-xs font-bold text-neutral-900 dark:text-white">Visa ending in •••• 4242</p>
                      <p className="text-[10px] text-neutral-400">Expires 12/28 • Default Payment</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-600">Active</span>
                </div>

                <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/40 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-8 bg-[#FF3E6C] text-white rounded-lg flex items-center justify-center font-bold text-xs">
                      UPI
                    </div>
                    <div>
                      <p className="text-xs font-bold text-neutral-900 dark:text-white">alexrivera@okaxis</p>
                      <p className="text-[10px] text-neutral-400">Verified via Google Pay</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-neutral-400">Connected</span>
                </div>
              </div>
            </div>
          )}

          {/* 5. NOTIFICATIONS & SECURITY SETTINGS TAB */}
          {activeTab === 'settings' && (
            <div className="bg-white dark:bg-neutral-900 p-6 sm:p-8 rounded-3xl border border-neutral-200/80 dark:border-neutral-800 shadow-sm space-y-6">
              <div className="pb-4 border-b border-neutral-100 dark:border-neutral-800">
                <h3 className="text-base font-black uppercase text-neutral-900 dark:text-white tracking-wider">
                  Notification Preferences & Security
                </h3>
                <p className="text-xs text-neutral-500">Configure real-time drop alerts and login authentication</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-neutral-50 dark:bg-neutral-800/50 rounded-2xl">
                  <div>
                    <h4 className="text-xs font-bold text-neutral-900 dark:text-white">Streetwear Drop & Restock Alerts</h4>
                    <p className="text-[11px] text-neutral-400">Instant notifications when limited drops release</p>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={notificationSettings.dropAlerts} 
                    onChange={(e) => setNotificationSettings({ ...notificationSettings, dropAlerts: e.target.checked })}
                    className="w-4 h-4 accent-black cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-neutral-50 dark:bg-neutral-800/50 rounded-2xl">
                  <div>
                    <h4 className="text-xs font-bold text-neutral-900 dark:text-white">SMS Courier OTP & Dispatch Updates</h4>
                    <p className="text-[11px] text-neutral-400">Receive live delivery updates directly on mobile</p>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={notificationSettings.orderSms} 
                    onChange={(e) => setNotificationSettings({ ...notificationSettings, orderSms: e.target.checked })}
                    className="w-4 h-4 accent-black cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};