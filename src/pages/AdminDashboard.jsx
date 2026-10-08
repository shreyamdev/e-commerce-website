import React, { useEffect, useMemo, useState } from 'react';
import {
  TrendingUp,
  ShoppingBag,
  Users,
  Package,
  Plus,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Truck,
  Eye,
  Home,
  Trash2,
  RefreshCw,
  ShieldCheck
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useAuth } from '../context/AuthContext';
import { api } from '../api/httpClient';
import { formatINR } from '../utils/currency';

const STATUS_OPTIONS = ['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'];

export const AdminDashboard = () => {
  const { navigateTo, products = [], refreshProducts } = useStore();
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [actionError, setActionError] = useState('');
  const [newProductSuccess, setNewProductSuccess] = useState('');
  const [form, setForm] = useState({
    name: '',
    brand: '',
    description: '',
    price: '',
    originalPrice: '',
    category: 'sneakers',
    stock: '10',
    image: ''
  });

  const loadOrders = async () => {
    try {
      setLoading(true);
      setActionError('');
      const response = await api.get('/orders');
      setOrders(Array.isArray(response.orders) ? response.orders : []);
    } catch (error) {
      setActionError(error.data?.message || error.message || 'Could not load orders.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const filteredOrders = orders.filter((order) => {
    if (selectedStatusFilter === 'all') return true;
    return order.status === selectedStatusFilter;
  });

  const metrics = useMemo(() => {
    const activeOrders = orders.filter((order) => order.status !== 'Cancelled');
    const revenue = activeOrders.reduce((sum, order) => sum + Number(order.totalAmount || 0), 0);
    const customers = new Set(
      orders.map((order) => order.user?._id || order.user?.id || order.user).filter(Boolean)
    );
    const cancelled = orders.filter((order) => order.status === 'Cancelled').length;

    return [
      { title: 'Revenue', value: formatINR(revenue), sub: 'All non-cancelled orders', icon: TrendingUp },
      { title: 'Total Orders', value: orders.length.toLocaleString('en-IN'), sub: 'From backend order API', icon: ShoppingBag },
      { title: 'Customers', value: customers.size.toLocaleString('en-IN'), sub: 'Unique order users', icon: Users },
      { title: 'Cancelled Rate', value: orders.length ? `${((cancelled / orders.length) * 100).toFixed(1)}%` : '0.0%', sub: 'Current order set', icon: Package }
    ];
  }, [orders]);

  const getStatusBadge = (status) => {
    const map = {
      Delivered: ['bg-emerald-50 text-emerald-700 border-emerald-200', CheckCircle2],
      Shipped: ['bg-blue-50 text-blue-700 border-blue-200', Truck],
      Confirmed: ['bg-violet-50 text-violet-700 border-violet-200', CheckCircle2],
      Pending: ['bg-amber-50 text-amber-700 border-amber-200', Clock],
      Cancelled: ['bg-red-50 text-red-700 border-red-200', AlertTriangle]
    };
    const [classes, Icon] = map[status] || map.Pending;

    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${classes}`}>
        <Icon className="w-3 h-3" />
        {status}
      </span>
    );
  };

  const updateStatus = async (orderId, status) => {
    try {
      setActionError('');
      await api.put(`/orders/${orderId}/status`, { status });
      await loadOrders();
    } catch (error) {
      setActionError(error.data?.message || error.message || 'Unable to update order status.');
    }
  };

  const deleteProduct = async (productId) => {
    const confirmed = window.confirm('Delete this product from the backend catalog?');
    if (!confirmed) return;

    try {
      setActionError('');
      await api.delete(`/products/${productId}`);
      await refreshProducts();
    } catch (error) {
      setActionError(error.data?.message || error.message || 'Unable to delete product.');
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setActionError('');
    setNewProductSuccess('');

    try {
      await api.post('/products', {
        name: form.name.trim(),
        brand: form.brand.trim(),
        description: form.description.trim(),
        price: Number(form.price),
        originalPrice: form.originalPrice ? Number(form.originalPrice) : null,
        category: form.category,
        stock: Number(form.stock),
        image: form.image.trim(),
        images: form.image.trim() ? [form.image.trim()] : [],
        sizes: [],
        colors: []
      });
      await refreshProducts();
      setForm({ name: '', brand: '', description: '', price: '', originalPrice: '', category: 'sneakers', stock: '10', image: '' });
      setNewProductSuccess('Product created successfully.');
      setTimeout(() => {
        setNewProductSuccess('');
        setShowAddModal(false);
      }, 1200);
    } catch (error) {
      setActionError(error.data?.message || error.message || 'Unable to create product.');
    }
  };

  const lowStock = products.filter((product) => Number(product.stockCount || 0) <= 8).slice(0, 6);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-black text-[#FFA41C] text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">Control Center</span>
            <span className="text-xs text-neutral-400">Signed in as {user?.email || 'admin'}</span>
          </div>
          <h1 className="text-3xl font-black uppercase tracking-tight text-neutral-900 mt-1">Store Admin Dashboard</h1>
          <p className="text-xs text-neutral-500">Live orders and product catalog powered by the backend APIs.</p>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={() => navigateTo('home')} className="px-4 py-2.5 border border-neutral-300 hover:border-black rounded-xl text-xs font-bold text-neutral-800 transition-all hover:-translate-y-0.5 flex items-center gap-1.5">
            <Home className="w-4 h-4" />
            Customer Storefront
          </button>
          <button onClick={() => { refreshProducts(); loadOrders(); }} className="p-2.5 border border-neutral-300 hover:border-black rounded-xl transition-all hover:-translate-y-0.5" title="Refresh dashboard">
            <RefreshCw className="w-4 h-4" />
          </button>
          <button onClick={() => setShowAddModal(true)} className="px-5 py-2.5 bg-black hover:bg-neutral-800 text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-md transition-all hover:-translate-y-0.5">
            <Plus className="w-4 h-4 text-[#FF3E6C]" /> Add Product
          </button>
        </div>
      </div>

      {actionError && <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs font-semibold text-red-700">{actionError}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {metrics.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black uppercase tracking-wider text-neutral-500">{item.title}</span>
                <div className="p-2 rounded-xl bg-neutral-100"><Icon className="w-4 h-4" /></div>
              </div>
              <div className="text-2xl font-black text-neutral-900 mt-4">{item.value}</div>
              <p className="text-[11px] text-neutral-400 mt-1">{item.sub}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-white p-6 rounded-3xl border border-neutral-200 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-100">
            <div>
              <h2 className="text-base font-black uppercase text-neutral-900 tracking-wider">Live Orders</h2>
              <p className="text-xs text-neutral-400">Directly fetched from <code>/api/orders</code>.</p>
            </div>
            <div className="flex flex-wrap gap-1 bg-neutral-100 p-1 rounded-xl">
              {['all', ...STATUS_OPTIONS].map((status) => (
                <button
                  key={status}
                  onClick={() => setSelectedStatusFilter(status)}
                  className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold capitalize transition-all ${selectedStatusFilter === status ? 'bg-white text-black shadow-sm' : 'text-neutral-500 hover:text-black'}`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="py-16 text-center text-xs text-neutral-500">Loading orders…</div>
          ) : filteredOrders.length === 0 ? (
            <div className="py-16 text-center text-xs text-neutral-500">No orders in this filter.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-neutral-200 text-neutral-400 uppercase font-black tracking-wider text-[10px]">
                    <th className="pb-3 pr-4">Order</th>
                    <th className="pb-3 pr-4">Customer</th>
                    <th className="pb-3 pr-4">Amount</th>
                    <th className="pb-3 pr-4">Status</th>
                    <th className="pb-3 text-right">Update</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {filteredOrders.map((order) => (
                    <tr key={order._id} className="hover:bg-neutral-50 transition-colors">
                      <td className="py-3.5 pr-4 font-mono font-bold text-neutral-900">{String(order._id).slice(-8)}</td>
                      <td className="py-3.5 pr-4">
                        <p className="font-bold text-neutral-800">{order.user?.name || 'Customer'}</p>
                        <p className="text-[10px] text-neutral-400">{order.user?.email || '—'}</p>
                      </td>
                      <td className="py-3.5 pr-4 font-black text-neutral-900">{formatINR(order.totalAmount)}</td>
                      <td className="py-3.5 pr-4">{getStatusBadge(order.status)}</td>
                      <td className="py-3.5 text-right">
                        <select
                          value={order.status}
                          onChange={(e) => updateStatus(order._id, e.target.value)}
                          className="text-[10px] font-bold border border-neutral-200 rounded-lg px-2 py-1.5 bg-white hover:border-black focus:outline-none"
                        >
                          {STATUS_OPTIONS.map((status) => <option key={status}>{status}</option>)}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-neutral-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-neutral-100">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <h3 className="text-xs font-black uppercase tracking-wider">Low Stock</h3>
            </div>
            {lowStock.length === 0 ? (
              <p className="text-xs text-neutral-500">No low-stock products.</p>
            ) : (
              lowStock.map((product) => (
                <div key={product.id} className="flex items-center justify-between gap-3 p-2.5 bg-neutral-50 rounded-xl border border-neutral-100">
                  <div className="flex items-center gap-3 min-w-0">
                    <img src={product.images?.[0]} alt="" className="w-10 h-10 object-cover rounded-lg bg-neutral-200" />
                    <div className="min-w-0">
                      <p className="font-bold text-xs text-neutral-800 truncate">{product.name}</p>
                      <p className="text-[10px] text-neutral-400">{product.brand}</p>
                    </div>
                  </div>
                  <span className="text-xs font-black text-red-500 shrink-0">{product.stockCount} left</span>
                </div>
              ))
            )}
          </div>

          <div className="bg-gradient-to-br from-neutral-950 to-neutral-900 text-white p-6 rounded-3xl shadow-md">
            <div className="flex items-center gap-2 text-[#FFA41C]">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-xs font-black uppercase tracking-wider">Backend Connected</span>
            </div>
            <p className="text-xs text-neutral-300 mt-3 leading-relaxed">Products, order counts, stock data and order status actions are now powered by the real backend endpoints.</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-neutral-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-neutral-100 flex items-center justify-between">
          <div>
            <h2 className="text-base font-black uppercase tracking-wider">Backend Product Catalog</h2>
            <p className="text-xs text-neutral-400">{products.length} products currently loaded from the backend.</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-neutral-50 text-[10px] uppercase tracking-wider text-neutral-400 font-black">
                <th className="px-6 py-3">Product</th>
                <th className="px-6 py-3">Price</th>
                <th className="px-6 py-3">Stock</th>
                <th className="px-6 py-3">Rating</th>
                <th className="px-6 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={product.images?.[0]} alt="" className="w-11 h-11 object-cover rounded-lg bg-neutral-100" />
                      <div>
                        <p className="font-bold text-neutral-900">{product.name}</p>
                        <p className="text-[10px] text-neutral-400 uppercase">{product.brand} · {product.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-black">{formatINR(product.price)}</td>
                  <td className="px-6 py-4 font-bold">{product.stockCount}</td>
                  <td className="px-6 py-4">{product.rating.toFixed(1)} ★</td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => navigateTo('product-detail', product)} className="p-2 rounded-lg hover:bg-neutral-100 transition-colors" title="View product"><Eye className="w-4 h-4" /></button>
                    <button onClick={() => deleteProduct(product.id)} className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors" title="Delete product"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowAddModal(false)} />
          <div className="relative bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl z-10">
            <h3 className="text-xl font-black uppercase text-neutral-900">Add Product</h3>
            <p className="text-xs text-neutral-500 mt-1 mb-5">Create a real product in MongoDB through the admin API.</p>

            <form onSubmit={handleAddProduct} className="space-y-3">
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Product name" className="w-full text-xs px-3 py-3 border rounded-xl focus:border-black focus:outline-none" />
              <div className="grid grid-cols-2 gap-3">
                <input value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} placeholder="Brand" className="w-full text-xs px-3 py-3 border rounded-xl focus:border-black focus:outline-none" />
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full text-xs px-3 py-3 border rounded-xl focus:border-black focus:outline-none">
                  {['sneakers', 'hoodies', 't-shirts', 'cargo', 'jackets', 'accessories'].map((category) => <option key={category}>{category}</option>)}
                </select>
              </div>
              <textarea required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} placeholder="Description" className="w-full text-xs px-3 py-3 border rounded-xl focus:border-black focus:outline-none resize-none" />
              <div className="grid grid-cols-3 gap-3">
                <input required type="number" min="0" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="Price (₹)" className="w-full text-xs px-3 py-3 border rounded-xl focus:border-black focus:outline-none" />
                <input type="number" min="0" value={form.originalPrice} onChange={(e) => setForm({ ...form, originalPrice: e.target.value })} placeholder="MRP (₹)" className="w-full text-xs px-3 py-3 border rounded-xl focus:border-black focus:outline-none" />
                <input required type="number" min="0" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} placeholder="Stock" className="w-full text-xs px-3 py-3 border rounded-xl focus:border-black focus:outline-none" />
              </div>
              <input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="Image URL (optional)" className="w-full text-xs px-3 py-3 border rounded-xl focus:border-black focus:outline-none" />

              {newProductSuccess && <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-xs font-bold">{newProductSuccess}</div>}
              {actionError && <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-bold">{actionError}</div>}

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 py-3 border rounded-xl text-xs font-bold hover:border-black transition-colors">Cancel</button>
                <button type="submit" className="flex-1 py-3 bg-black text-white rounded-xl text-xs font-black uppercase hover:bg-neutral-800 transition-all hover:-translate-y-0.5">Create Product</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
