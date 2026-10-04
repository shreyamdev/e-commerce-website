/*import React, { useState } from 'react';
import { 
  TrendingUp, 
  ShoppingBag, 
  Users, 
  DollarSign, 
  Package, 
  ArrowUpRight, 
  ArrowDownRight, 
  Filter, 
  Plus, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Truck,
  Eye,
  SlidersHorizontal,
  Home
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';

export const AdminDashboard = () => {
  const { navigateTo } = useStore();
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProductSuccess, setNewProductSuccess] = useState(false);

  // Mock Admin Metrics
  const metrics = [
    {
      title: 'Total Revenue',
      value: '$128,450',
      change: '+18.2%',
      isPositive: true,
      sub: 'vs. last month ($108,600)',
      icon: DollarSign,
      color: 'text-emerald-500'
    },
    {
      title: 'Total Orders',
      value: '1,420',
      change: '+8.4%',
      isPositive: true,
      sub: '98 orders today',
      icon: ShoppingBag,
      color: 'text-blue-500'
    },
    {
      title: 'Active Customers',
      value: '8,940',
      change: '+12.6%',
      isPositive: true,
      sub: '74% repeat rate',
      icon: Users,
      color: 'text-[#FF3E6C]'
    },
    {
      title: 'Return Rate',
      value: '1.4%',
      change: '-0.3%',
      isPositive: true,
      sub: 'Industry benchmark: 3.2%',
      icon: Package,
      color: 'text-amber-500'
    }
  ];

  // Mock Recent Orders List
  const [orders, setOrders] = useState([
    {
      id: 'HYP-928104',
      customer: 'Jordan Miller',
      email: 'jordan.m@gmail.com',
      product: 'Air Matrix Pulse Phantom (UK 9)',
      amount: '$159',
      date: '10 mins ago',
      status: 'Processing',
      payment: 'Card •••• 4242'
    },
    {
      id: 'HYP-928103',
      customer: 'Elena Rostova',
      email: 'elena.r@fashion.io',
      product: 'Heavyweight Acid-Wash Hoodie (L)',
      amount: '$79',
      date: '35 mins ago',
      status: 'Shipped',
      payment: 'Apple Pay'
    },
    {
      id: 'HYP-928102',
      customer: 'Marcus Thorne',
      email: 'm.thorne@suburb.net',
      product: 'Cyber Samurai Boxy Tee (XL)',
      amount: '$39',
      date: '1 hour ago',
      status: 'Delivered',
      payment: 'UPI / QR'
    },
    {
      id: 'HYP-928101',
      customer: 'Samantha Lee',
      email: 'sam.lee@college.edu',
      product: 'Retro High OG "Cyber Rust" (UK 8.5)',
      amount: '$189',
      date: '3 hours ago',
      status: 'Delivered',
      payment: 'Card •••• 1092'
    },
    {
      id: 'HYP-928100',
      customer: 'Devon Vance',
      email: 'devon.v@vance.org',
      product: 'Tactical Parachute Cargo (32)',
      amount: '$95',
      date: '5 hours ago',
      status: 'Pending',
      payment: 'Cash on Delivery'
    }
  ]);

  const filteredOrders = orders.filter((o) => {
    if (selectedStatusFilter === 'all') return true;
    return o.status.toLowerCase() === selectedStatusFilter.toLowerCase();
  });

  const getStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>Delivered</span>
          </span>
        );
      case 'shipped':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
            <Truck className="w-3 h-3 text-blue-600" />
            <span>Shipped</span>
          </span>
        );
      case 'processing':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <Clock className="w-3 h-3 text-amber-600" />
            <span>Processing</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-neutral-100 text-neutral-700 border border-neutral-300">
            <span>Pending</span>
          </span>
        );
    }
  };

  const handleAddNewMockProduct = (e) => {
    e.preventDefault();
    setNewProductSuccess(true);
    setTimeout(() => {
      setNewProductSuccess(false);
      setShowAddModal(false);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Admin Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-neutral-200 gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-black text-[#FFA41C] text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Control Center
            </span>
            <span className="text-xs text-neutral-400">College Team Project Demo</span>
          </div>
          <h1 className="text-3xl font-black uppercase tracking-tight text-neutral-900 mt-1">
            Store Admin Dashboard
          </h1>
          <p className="text-xs text-neutral-500">
            Real-time analytics, inventory replenishment, and live drop order logistics
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => navigateTo('home')}
            className="px-4 py-2.5 border border-neutral-300 hover:border-black rounded-xl text-xs font-bold text-neutral-800 transition-colors flex items-center space-x-1.5"
          >
            <Home className="w-4 h-4" />
            <span>Customer Storefront</span>
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-5 py-2.5 bg-black hover:bg-neutral-800 text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center space-x-2 shadow-md transition-transform hover:scale-105"
          >
            <Plus className="w-4 h-4 text-[#FF3E6C]" />
            <span>Add New Drop</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Cards (grid layout required) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                  {item.title}
                </span>
                <div className={`p-2 rounded-xl bg-neutral-50 ${item.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              <div className="mt-4">
                <span className="text-3xl font-black text-neutral-900 tracking-tight">
                  {item.value}
                </span>
                <div className="flex items-center space-x-1.5 mt-1 text-xs">
                  <span className="inline-flex items-center text-emerald-600 font-bold">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                    {item.change}
                  </span>
                  <span className="text-neutral-400">{item.sub}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Grid: Orders Table (8 cols) + Inventory & Stock Status (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Recent Orders Table (8 Columns) */}
        <div className="lg:col-span-8 bg-white p-6 rounded-3xl border border-neutral-200/80 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-100">
            <div>
              <h2 className="text-base font-black uppercase text-neutral-900 tracking-wider">
                Recent Orders Stream
              </h2>
              <p className="text-xs text-neutral-400">Incoming streetwear drop checkouts</p>
            </div>

            {/* Filter by status */}
            <div className="flex items-center space-x-1 bg-neutral-100 p-1 rounded-xl text-xs">
              {['all', 'processing', 'shipped', 'delivered'].map((st) => (
                <button
                  key={st}
                  onClick={() => setSelectedStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-lg font-bold capitalize transition-colors ${
                    selectedStatusFilter === st
                      ? 'bg-white text-black shadow-xs'
                      : 'text-neutral-500 hover:text-black'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Orders Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-neutral-200 text-neutral-400 uppercase font-black tracking-wider text-[10px]">
                  <th className="pb-3">Order ID</th>
                  <th className="pb-3">Customer</th>
                  <th className="pb-3">Product</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 font-medium">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="py-3.5 font-mono font-bold text-neutral-900">{order.id}</td>
                    <td className="py-3.5">
                      <p className="font-bold text-neutral-800">{order.customer}</p>
                      <p className="text-[10px] text-neutral-400">{order.email}</p>
                    </td>
                    <td className="py-3.5 text-neutral-600 max-w-[180px] truncate">{order.product}</td>
                    <td className="py-3.5 font-black text-neutral-900">{order.amount}</td>
                    <td className="py-3.5">{getStatusBadge(order.status)}</td>
                    <td className="py-3.5 text-right">
                      <button 
                        onClick={() => navigateTo('order-tracking')}
                        className="text-neutral-400 hover:text-black p-1 transition-colors"
                        title="View tracking"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock Alerts & Fast Movers (4 Columns) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Low Stock Alert Box */}
          <div className="bg-white p-6 rounded-3xl border border-neutral-200/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <h3 className="text-xs font-black uppercase text-neutral-900 tracking-wider">
                  Low Stock Warnings
                </h3>
              </div>
              <span className="text-[10px] font-black uppercase text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                Action Needed
              </span>
            </div>

            <div className="space-y-3">
              {PRODUCTS.filter((p) => p.stockCount <= 8).slice(0, 4).map((p) => (
                <div key={p.id} className="flex items-center justify-between p-2.5 bg-neutral-50 rounded-xl border border-neutral-100">
                  <div className="flex items-center space-x-3">
                    <img src={p.images[0]} alt="" className="w-10 h-10 object-cover rounded-lg bg-neutral-200" />
                    <div>
                      <p className="font-bold text-xs text-neutral-800 line-clamp-1">{p.name}</p>
                      <p className="text-[10px] text-neutral-400">{p.brand}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-black text-red-500">{p.stockCount} left</span>
                    <button className="block text-[10px] font-bold text-blue-600 hover:underline">
                      Restock
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Marketing & Coupon Summary */}
          <div className="bg-gradient-to-br from-neutral-950 to-neutral-900 text-white p-6 rounded-3xl border border-neutral-800 shadow-md space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-[#FFA41C]">
                Active Promo Codes
              </span>
              <span className="text-emerald-400 text-xs font-bold">4 Live</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between bg-neutral-900 p-2.5 rounded-xl border border-neutral-800">
                <span className="font-mono font-bold text-[#FF3E6C]">HYPED20</span>
                <span className="text-neutral-300">20% Off (624 uses)</span>
              </div>
              <div className="flex justify-between bg-neutral-900 p-2.5 rounded-xl border border-neutral-800">
                <span className="font-mono font-bold text-[#FFA41C]">WELCOME10</span>
                <span className="text-neutral-300">10% Off (312 uses)</span>
              </div>
              <div className="flex justify-between bg-neutral-900 p-2.5 rounded-xl border border-neutral-800">
                <span className="font-mono font-bold text-blue-400">STREET30</span>
                <span className="text-neutral-300">30% Off (189 uses)</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Add New Drop Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setShowAddModal(false)} />
          <div className="relative bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-4 z-10 animate-fade-in">
            <h3 className="text-xl font-black uppercase text-neutral-900">
              Create New Streetwear Drop
            </h3>
            <p className="text-xs text-neutral-500">
              Publish a new sneaker or apparel silhouette to the catalog.
            </p>

            <form onSubmit={handleAddNewMockProduct} className="space-y-3 pt-2">
              <div>
                <label className="block text-xs font-bold uppercase text-neutral-700 mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  defaultValue="Air Jordan 4 Retro 'Military Black'"
                  className="w-full text-xs px-3 py-2 border rounded-xl"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-700 mb-1">Brand</label>
                  <select className="w-full text-xs px-3 py-2 border rounded-xl">
                    <option>Nike</option>
                    <option>Jordan</option>
                    <option>Vortex Labs</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-700 mb-1">Price ($)</label>
                  <input type="number" required defaultValue="210" className="w-full text-xs px-3 py-2 border rounded-xl" />
                </div>
              </div>

              {newProductSuccess ? (
                <div className="p-3 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-xl text-center">
                  Drop created and published successfully! 🎉
                </div>
              ) : (
                <div className="flex space-x-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 py-3 border border-neutral-300 rounded-xl text-xs font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-black text-white rounded-xl text-xs font-black uppercase tracking-wider hover:bg-neutral-800"
                  >
                    Publish Drop
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
