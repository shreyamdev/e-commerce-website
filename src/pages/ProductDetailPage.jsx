import React, { useEffect, useState } from 'react';
import { 
  Star, 
  Heart, 
  ShoppingBag, 
  Zap, 
  Truck, 
  RotateCcw, 
  ShieldCheck, 
  ChevronDown, 
  ChevronUp, 
  Check, 
  Tag, 
  MapPin, 
  CheckCircle2,
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { api } from '../api/httpClient';
import { ProductCard } from '../components/product/ProductCard';
import { formatINR } from '../utils/currency';

export const ProductDetailPage = () => {
  const { selectedProduct, products = [], navigateTo, refreshProducts } = useStore();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { isAuthenticated } = useAuth();

  const product = selectedProduct;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes ? product.sizes[0] : 'Standard');
  const [selectedColor, setSelectedColor] = useState(product.colors ? product.colors[0].name : 'Default');
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('');
  const [pincodeChecked, setPincodeChecked] = useState(false);
  const [pincodeMessage, setPincodeMessage] = useState('');

  // Accordion state
  const [openAccordions, setOpenAccordions] = useState({
    details: true,
    specs: false,
    shipping: false
  });

  const [addedNotice, setAddedNotice] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewLoading, setReviewLoading] = useState(false);
  const [reviewError, setReviewError] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState('');

  const toggleAccordion = (section) => {
    setOpenAccordions((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const isBackendProductId = (id) => /^[a-f0-9]{24}$/i.test(String(id || ''));

  const loadReviews = async () => {
    if (!product?.id || !isBackendProductId(product.id)) {
      setReviews([]);
      return;
    }

    try {
      const response = await api.get(`/reviews/${product.id}`);
      setReviews(Array.isArray(response.reviews) ? response.reviews : []);
    } catch (error) {
      console.warn('Unable to load reviews:', error);
      setReviews([]);
    }
  };

  useEffect(() => {
    if (!product) return;
    setActiveImageIndex(0);
    setSelectedSize(product.sizes?.[0] || 'Standard');
    setSelectedColor(product.colors?.[0]?.name || 'Default');
    setQuantity(1);
    setReviewError('');
    setReviewSuccess('');
    loadReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product?.id]);

  const handleColorSelect = (color, index) => {
    setSelectedColor(color.name);
    const nextImageIndex = Number.isInteger(color.imageIndex) ? color.imageIndex : index;
    setActiveImageIndex(Math.min(Math.max(nextImageIndex, 0), Math.max(product.images.length - 1, 0)));
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setReviewError('');
    setReviewSuccess('');

    if (!isAuthenticated) {
      navigateTo('auth');
      return;
    }

    if (!product?.id || !isBackendProductId(product.id)) {
      setReviewError('This demo product is not connected to the backend catalog yet.');
      return;
    }

    if (!reviewComment.trim()) {
      setReviewError('Please write a short review comment.');
      return;
    }

    setReviewLoading(true);
    try {
      await api.post(`/reviews/${product.id}`, {
        rating: reviewRating,
        comment: reviewComment.trim()
      });
      setReviewComment('');
      setReviewRating(5);
      setReviewSuccess('Review added successfully.');
      await loadReviews();
      if (refreshProducts) await refreshProducts();
    } catch (error) {
      setReviewError(error.data?.message || error.message || 'Unable to add review.');
    } finally {
      setReviewLoading(false);
    }
  };

  const handlePincodeCheck = (e) => {
    e.preventDefault();
    if (pincode.trim().length >= 4) {
      setPincodeChecked(true);
      setPincodeMessage('Express Delivery available: Arriving soon. Free with qualifying orders.');
    }
  };

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    navigateTo('checkout');
  };

  const isFavorited = isInWishlist(product.id);

  // Related products
  const relatedProducts = products.filter(
    (p) => p.category === product?.category && p.id !== product?.id
  ).slice(0, 4);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-2xl font-black uppercase">Product unavailable</h2>
        <button onClick={() => navigateTo('shop')} className="mt-4 px-6 py-3 bg-black text-white rounded-xl text-xs font-black uppercase">Back to Catalog</button>
      </div>
    );
  }

  const averageReviewRating = reviews.length
    ? reviews.reduce((sum, review) => sum + Number(review.rating || 0), 0) / reviews.length
    : Number(product.rating || 0);
  const displayedReviewCount = reviews.length || Number(product.reviewCount || 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      
      {/* Back button & Breadcrumb */}
      <div className="flex items-center space-x-3 text-xs text-neutral-500">
        <button
          onClick={() => navigateTo('shop')}
          className="flex items-center space-x-1 text-black font-bold hover:text-[#FF3E6C] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Catalog</span>
        </button>
        <span>/</span>
        <span className="uppercase">{product.category}</span>
        <span>/</span>
        <span className="text-neutral-900 font-semibold truncate max-w-xs">{product.name}</span>
      </div>

      {/* Main PDP Grid (Left Gallery, Right Product Details) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Gallery (Thumbnails + Main Zoom Display) */}
        <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
          
          {/* Thumbnails strip */}
          <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-visible shrink-0 pb-2 sm:pb-0">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative w-16 h-20 sm:w-20 sm:h-24 rounded-xl overflow-hidden border-2 transition-all bg-neutral-100 ${
                  activeImageIndex === idx
                    ? 'border-black shadow-md'
                    : 'border-transparent hover:border-neutral-300 opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover object-center" />
              </button>
            ))}
          </div>

          {/* Main Hero Image with Zoom Hover */}
          <div className="flex-1 relative aspect-[4/5] rounded-3xl overflow-hidden bg-neutral-100 group border border-neutral-200/80 shadow-sm">
            <img
              src={product.images[activeImageIndex]}
              alt={product.name}
              className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out cursor-crosshair"
            />
            
            {/* Top Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.badge && (
                <span className="bg-black text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                  {product.badge}
                </span>
              )}
              {product.discountPercent > 0 && (
                <span className="bg-[#FF3E6C] text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                  {product.discountPercent}% OFF
                </span>
              )}
            </div>

            {/* Floating Wishlist Heart */}
            <button
              onClick={() => toggleWishlist(product)}
              className="absolute top-4 right-4 bg-white/90 backdrop-blur-md p-3 rounded-full shadow-lg hover:bg-white transition-all transform hover:scale-110"
              title="Add to Wishlist"
            >
              <Heart
                className={`w-5 h-5 ${
                  isFavorited ? 'text-[#FF3E6C] fill-[#FF3E6C]' : 'text-neutral-700'
                }`}
              />
            </button>
          </div>

        </div>

        {/* Right Info Column (Nike / Amazon / Myntra details) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Brand & Title */}
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-neutral-400">
              {product.brand}
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 uppercase tracking-tight mt-1">
              {product.name}
            </h1>

            {/* Star Rating Badge (Amazon style) */}
            <div className="flex items-center space-x-2 mt-2">
              <div className="flex items-center space-x-1 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                <Star className="w-3.5 h-3.5 text-[#FFA41C] fill-[#FFA41C]" />
                <span className="text-xs font-black text-neutral-900">{averageReviewRating.toFixed(1)}</span>
              </div>
              <span className="text-xs font-semibold text-neutral-500">
                ({displayedReviewCount} customer reviews)
              </span>
              <span className="text-neutral-300">•</span>
              <span className="text-xs font-bold text-emerald-600">Verified Drop</span>
            </div>
          </div>

          {/* Pricing Section with Strikethrough & Savings Pill */}
          <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200/80">
            <div className="flex items-baseline space-x-3">
              <span className="text-3xl font-black text-neutral-900">{formatINR(product.price)}</span>
              {product.originalPrice && (
                <span className="text-base text-neutral-400 line-through">
                  {formatINR(product.originalPrice)}
                </span>
              )}
              {product.discountPercent > 0 && (
                <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2.5 py-1 rounded-full">
                  Save {formatINR(product.originalPrice - product.price)} ({product.discountPercent}% OFF)
                </span>
              )}
            </div>
            <p className="text-[11px] text-neutral-500 mt-1">
              Inclusive of all taxes. Free delivery is available on qualifying orders.
            </p>
          </div>

          {/* Color Variants */}
          {product.colors && (
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-black uppercase text-neutral-800">
                  Select Color: <span className="text-neutral-500 font-semibold">{selectedColor}</span>
                </span>
              </div>
              <div className="flex space-x-3">
                {product.colors.map((color, index) => (
                  <button
                    key={color.name}
                    onClick={() => handleColorSelect(color, index)}
                    className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl border-2 transition-all ${
                      selectedColor === color.name
                        ? 'border-black bg-neutral-100 font-bold'
                        : 'border-neutral-200 hover:border-neutral-400 bg-white'
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-neutral-300 shadow-xs"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="text-xs">{color.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selector with border-2 border-black (Nike requirement) */}
          {product.sizes && (
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-black uppercase text-neutral-800">
                  Select Size: <span className="text-[#FF3E6C] font-semibold">{selectedSize}</span>
                </span>
                <span className="text-xs font-bold text-neutral-500 underline cursor-pointer hover:text-black">
                  Size Guide
                </span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 rounded-xl text-xs font-black uppercase transition-all ${
                      selectedSize === size
                        ? 'border-2 border-black bg-black text-white shadow-md'
                        : 'border border-neutral-200 hover:border-neutral-400 bg-white text-neutral-800'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {/* Urgency Stock Badge */}
              <div className="mt-2 flex items-center space-x-1.5 text-xs text-amber-700 font-bold">
                <Sparkles className="w-3.5 h-3.5 text-[#FFA41C]" />
                <span>Hurry! Only {product.stockCount} items left in stock</span>
              </div>
            </div>
          )}

          {/* Action Buttons: Add to Cart + Buy Now */}
          <div className="space-y-3 pt-2">
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-4 bg-black hover:bg-neutral-800 text-white rounded-2xl font-black text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-transform active:scale-[0.98] shadow-lg"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{addedNotice ? 'Added to Bag! 🎉' : 'Add to Bag'}</span>
              </button>

              <button
                onClick={handleBuyNow}
                className="flex-1 py-4 bg-[#FFA41C] hover:bg-[#e69315] text-black rounded-2xl font-black text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-transform active:scale-[0.98] shadow-lg"
              >
                <Zap className="w-4 h-4 fill-black" />
                <span>Buy Now (1-Click)</span>
              </button>
            </div>
          </div>

          {/* Delivery Pincode Checker (Amazon / Myntra style) */}
          <div className="p-4 bg-white rounded-2xl border border-neutral-200/80 space-y-2">
            <div className="flex items-center space-x-2 text-xs font-bold text-neutral-800">
              <MapPin className="w-4 h-4 text-neutral-600" />
              <span>Check Delivery Pincode & ETA</span>
            </div>
            <form onSubmit={handlePincodeCheck} className="flex gap-2">
              <input
                type="text"
                maxLength="6"
                placeholder="Enter 6-digit Pincode (e.g. 400001)"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="flex-1 text-xs border border-neutral-300 rounded-xl px-3 py-2.5 focus:border-black focus:outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-neutral-900 text-white font-bold text-xs uppercase rounded-xl hover:bg-black"
              >
                Check
              </button>
            </form>
            {pincodeChecked && (
              <p className="text-xs text-emerald-600 font-semibold flex items-center space-x-1.5 pt-1">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{pincodeMessage}</span>
              </p>
            )}
          </div>

          {/* Promotional Coupon Cards (The Souled Store inspired) */}
          <div className="space-y-2">
            <div className="p-3 bg-gradient-to-r from-neutral-900 to-black text-white rounded-xl flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2">
                <Tag className="w-4 h-4 text-[#FFA41C]" />
                <div>
                  <span className="font-bold text-white">Save 20% Extra with code: </span>
                  <span className="font-mono font-bold text-[#FFA41C]">HYPED20</span>
                </div>
              </div>
              <span className="text-[10px] bg-neutral-800 px-2 py-0.5 rounded font-bold text-neutral-300">
                Applicable in Cart
              </span>
            </div>
          </div>

          {/* Accordion Tabs (Specs, Fabrics, Returns) */}
          <div className="border-t border-neutral-200 pt-4 space-y-2">
            
            {/* Description Tab */}
            <div className="border border-neutral-200 rounded-xl overflow-hidden">
              <button
                onClick={() => toggleAccordion('details')}
                className="w-full flex justify-between items-center p-3.5 bg-white text-xs font-bold text-neutral-900 hover:bg-neutral-50"
              >
                <span>Product Description & Concept</span>
                {openAccordions.details ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {openAccordions.details && (
                <div className="p-3.5 pt-0 bg-white text-xs text-neutral-600 leading-relaxed">
                  {product.description}
                </div>
              )}
            </div>

            {/* Specifications Tab */}
            <div className="border border-neutral-200 rounded-xl overflow-hidden">
              <button
                onClick={() => toggleAccordion('specs')}
                className="w-full flex justify-between items-center p-3.5 bg-white text-xs font-bold text-neutral-900 hover:bg-neutral-50"
              >
                <span>Material Specs & Construction</span>
                {openAccordions.specs ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {openAccordions.specs && (
                <div className="p-3.5 pt-0 bg-white text-xs text-neutral-600 space-y-2">
                  {product.specs && Object.entries(product.specs).map(([key, val]) => (
                    <div key={key} className="flex justify-between border-b border-neutral-100 pb-1">
                      <span className="font-semibold text-neutral-800">{key}:</span>
                      <span className="text-neutral-500">{val}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Returns & Exchange Tab */}
            <div className="border border-neutral-200 rounded-xl overflow-hidden">
              <button
                onClick={() => toggleAccordion('shipping')}
                className="w-full flex justify-between items-center p-3.5 bg-white text-xs font-bold text-neutral-900 hover:bg-neutral-50"
              >
                <span>Free Shipping & 14-Day Doorstep Returns</span>
                {openAccordions.shipping ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {openAccordions.shipping && (
                <div className="p-3.5 pt-0 bg-white text-xs text-neutral-600 space-y-1.5 leading-relaxed">
                  <p>• Complimentary express shipping on qualifying domestic orders.</p>
                  <p>• 14 days zero-questions-asked doorstep pickup and full refund/exchange.</p>
                  <p>• 100% genuine quality authentication seal guaranteed.</p>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>

      {/* Customer Reviews & Ratings Section */}
      <div className="pt-12 border-t border-neutral-200 space-y-8">
        <div>
          <h2 className="text-2xl font-black uppercase text-neutral-900">Customer Reviews & Ratings</h2>
          <p className="text-xs text-neutral-500 mt-0.5">Ratings and feedback fetched from the backend review API.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Rating Summary */}
          <div className="md:col-span-4 bg-white p-6 rounded-3xl border border-neutral-200/80 space-y-5">
            <div className="text-center pb-4 border-b border-neutral-100">
              <span className="text-5xl font-black text-neutral-900">{averageReviewRating ? averageReviewRating.toFixed(1) : '0.0'}</span>
              <div className="flex justify-center text-[#FFA41C] my-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.round(averageReviewRating) ? 'fill-[#FFA41C]' : 'text-neutral-300'}`} />
                ))}
              </div>
              <span className="text-xs text-neutral-500 font-semibold">Based on {displayedReviewCount} ratings</span>
            </div>

            {reviews.length > 0 ? (
              <div className="space-y-2 text-xs">
                {[5, 4, 3, 2, 1].map((star) => {
                  const count = reviews.filter((review) => Number(review.rating) === star).length;
                  const percent = Math.round((count / reviews.length) * 100);
                  return (
                    <div key={star} className="flex items-center space-x-3">
                      <span className="w-12 font-bold text-neutral-700">{star} Star</span>
                      <div className="flex-1 bg-neutral-200 h-2 rounded-full overflow-hidden">
                        <div className="bg-[#FFA41C] h-full rounded-full transition-all" style={{ width: `${percent}%` }} />
                      </div>
                      <span className="w-8 text-right text-neutral-400 font-medium">{percent}%</span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-xs text-neutral-500 text-center py-3">No backend reviews yet. Be the first to rate this drop.</p>
            )}
          </div>

          {/* Add Review */}
          <div className="md:col-span-8 bg-white p-6 rounded-3xl border border-neutral-200/80">
            <div className="flex items-center justify-between gap-3 mb-4">
              <div>
                <h3 className="text-sm font-black uppercase text-neutral-900">Write a review</h3>
                <p className="text-[11px] text-neutral-400 mt-1">Your review is saved through the backend API.</p>
              </div>
              {!isAuthenticated && (
                <button onClick={() => navigateTo('auth')} className="text-[11px] font-black uppercase text-[#FF3E6C] hover:underline">Sign in to review</button>
              )}
            </div>

            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-black uppercase text-neutral-700 mb-2">Your Rating</label>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setReviewRating(star)}
                      className="p-1 transition-transform hover:scale-110"
                      aria-label={`Rate ${star} stars`}
                    >
                      <Star className={`w-6 h-6 ${star <= reviewRating ? 'fill-[#FFA41C] text-[#FFA41C]' : 'text-neutral-300'}`} />
                    </button>
                  ))}
                  <span className="ml-2 text-xs font-bold text-neutral-600">{reviewRating}/5</span>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-black uppercase text-neutral-700 mb-2">Comment</label>
                <textarea
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  rows={4}
                  maxLength={500}
                  placeholder="Tell other shoppers what you liked about this drop..."
                  className="w-full text-xs px-3.5 py-3 border border-neutral-300 rounded-xl focus:border-black focus:outline-none resize-none"
                />
              </div>

              {reviewError && <p className="text-xs font-semibold text-red-600 bg-red-50 border border-red-100 rounded-xl p-3">{reviewError}</p>}
              {reviewSuccess && <p className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-xl p-3">{reviewSuccess}</p>}

              <button
                type="submit"
                disabled={reviewLoading}
                className="px-5 py-3 bg-black hover:bg-neutral-800 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all hover:-translate-y-0.5 disabled:opacity-50"
              >
                {reviewLoading ? 'Submitting...' : isAuthenticated ? 'Submit Review' : 'Sign In to Review'}
              </button>
            </form>
          </div>
        </div>

        {/* Backend review list */}
        <div className="space-y-4">
          {reviews.length === 0 ? (
            <div className="bg-white p-8 rounded-2xl border border-neutral-200 text-center text-xs text-neutral-500">
              Reviews from this product will appear here after users submit them.
            </div>
          ) : (
            reviews.map((review) => (
              <div key={review._id} className="bg-white p-5 rounded-2xl border border-neutral-200/80 space-y-2 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-neutral-900">{review.user?.name || 'Customer'}</span>
                      <span className="text-[10px] font-black uppercase text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Backend Review</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex text-[#FFA41C]">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3 h-3 ${i < Number(review.rating) ? 'fill-[#FFA41C]' : 'text-neutral-300'}`} />
                        ))}
                      </div>
                      <span className="text-[11px] text-neutral-400">{review.createdAt ? new Date(review.createdAt).toLocaleDateString('en-IN') : ''}</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed">{review.comment}</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* "You May Also Like" Related Products */}
      {relatedProducts.length > 0 && (
        <div className="pt-12 border-t border-neutral-200 space-y-6">
          <div className="flex justify-between items-end">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#FF3E6C]">Complete the Look</span>
              <h2 className="text-2xl font-black uppercase text-neutral-900">You May Also Like</h2>
            </div>
            <button
              onClick={() => navigateTo('shop')}
              className="text-xs font-bold text-neutral-600 hover:text-black"
            >
              View More Drops →
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
