import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  Flame, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  TrendingUp, 
  CheckCircle,
  Footprints,
  Shirt,
  Layers,
  Scissors,
  Wind,
  Watch
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { HERO_SLIDES, CATEGORIES } from '../data/products';
import { ProductCard } from '../components/product/ProductCard';

export const HomePage = () => {
  const { navigateTo, setSelectedCategory, products = [] } = useStore();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState('trending'); // 'trending', 'bestsellers', 'new', 'under100'

  // Auto-rotate hero slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[currentSlide];

  // Filter products by tab
  const tabProducts = products.filter((product) => {
    if (activeTab === 'trending') return product.isTrending;
    if (activeTab === 'bestsellers') return product.isBestSeller;
    if (activeTab === 'new') return product.isNew;
    if (activeTab === 'under100') return product.price < 500;
    return true;
  });

  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'Footprints': return <Footprints className="w-5 h-5" />;
      case 'Shirt': return <Shirt className="w-5 h-5" />;
      case 'Layers': return <Layers className="w-5 h-5" />;
      case 'Scissors': return <Scissors className="w-5 h-5" />;
      case 'Wind': return <Wind className="w-5 h-5" />;
      case 'Watch': return <Watch className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-16 pb-20">
      
      {/* 1. Nike-Style High-Impact Hero Carousel */}
      <section className="relative w-full h-[580px] sm:h-[640px] bg-black overflow-hidden flex items-center">
        {/* Background Image with Dark Vignette Gradient */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000 transform scale-105"
          style={{ backgroundImage: `url(${slide.bgImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
        </div>

        {/* Hero Content Overlay */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
          <div className="max-w-2xl space-y-6">
            
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-black tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-[#FF3E6C] animate-ping" />
              <span>{slide.badge}</span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tighter uppercase leading-[0.95]">
              {slide.title}
            </h1>

            <p className="text-sm sm:text-base text-neutral-300 max-w-lg font-normal leading-relaxed">
              {slide.subtitle}
            </p>

            {/* Dual Action Buttons (Nike inspired) */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={() => {
                  setSelectedCategory(slide.filterCategory);
                  navigateTo('shop');
                }}
                className="px-8 py-4 bg-white text-black font-black text-xs sm:text-sm uppercase tracking-wider rounded-full hover:bg-[#FF3E6C] hover:text-white transition-all transform hover:scale-105 shadow-2xl flex items-center space-x-2"
              >
                <span>{slide.ctaPrimary}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setSelectedCategory('all');
                  navigateTo('shop');
                }}
                className="px-8 py-4 bg-neutral-900/80 backdrop-blur-md text-white font-bold text-xs sm:text-sm uppercase tracking-wider rounded-full border border-neutral-700 hover:border-white transition-all hover:bg-black"
              >
                {slide.ctaSecondary}
              </button>
            </div>

          </div>
        </div>

        {/* Carousel Slide Switchers & Dots */}
        <div className="absolute bottom-8 right-8 z-20 flex items-center space-x-3">
          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white text-white hover:text-black flex items-center justify-center transition-colors backdrop-blur-md border border-white/20"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <div className="flex space-x-2">
            {HERO_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentSlide === idx ? 'w-8 bg-[#FF3E6C]' : 'w-2 bg-white/40'
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white text-white hover:text-black flex items-center justify-center transition-colors backdrop-blur-md border border-white/20"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* 2. Category Chips / Cards (The Souled Store & Myntra inspired) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#FF3E6C]">Curated Drops</span>
            <h2 className="text-2xl font-black uppercase tracking-tight text-neutral-900">Explore by Category</h2>
          </div>
          <button
            onClick={() => { setSelectedCategory('all'); navigateTo('shop'); }}
            className="text-xs font-bold text-neutral-600 hover:text-black flex items-center space-x-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Horizontal Scrollable Container */}
        <div className="flex items-center space-x-4 overflow-x-auto scrollbar-none pb-4 pt-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                navigateTo('shop');
              }}
              className="flex-shrink-0 group flex items-center space-x-3.5 bg-white px-5 py-3.5 rounded-2xl border border-neutral-200/80 shadow-xs hover:shadow-md hover:border-black transition-all transform hover:-translate-y-0.5"
            >
              <div className="w-10 h-10 rounded-xl bg-neutral-100 group-hover:bg-[#FF3E6C] group-hover:text-white text-neutral-800 flex items-center justify-center transition-colors">
                {getCategoryIcon(cat.icon)}
              </div>
              <div className="text-left">
                <span className="text-xs font-black text-neutral-900 block group-hover:text-[#FF3E6C] transition-colors whitespace-nowrap">
                  {cat.name}
                </span>
                <span className="text-[10px] font-semibold text-neutral-400">
                  {products.filter((product) => cat.id === 'all' || product.category === cat.id).length} Items
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 3. Flash Deals Ticker Bar (The Souled Store coupon ticker) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-neutral-950 via-neutral-900 to-black p-6 sm:p-8 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 border border-neutral-800">
          
          <div className="flex items-center space-x-5">
            <div className="w-14 h-14 rounded-2xl bg-[#FF3E6C]/20 border border-[#FF3E6C]/30 flex items-center justify-center text-[#FF3E6C] shrink-0 animate-pulse-glow">
              <Flame className="w-8 h-8 fill-[#FF3E6C]" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 rounded-md bg-[#FF3E6C] text-white text-[10px] font-black uppercase">
                  Flash Deal
                </span>
                <div className="flex items-center space-x-1 text-xs text-neutral-300">
                  <Clock className="w-3.5 h-3.5 text-[#FFA41C]" />
                  <span>Ends in: <strong className="text-white font-mono">04h : 18m : 42s</strong></span>
                </div>
              </div>
              <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight mt-1">
                Extra 20% Off Streetwear Essentials
              </h3>
              <p className="text-xs text-neutral-400 mt-0.5">
                Use code <span className="bg-neutral-800 px-2 py-0.5 rounded border border-neutral-700 text-[#FFA41C] font-mono font-bold">HYPED20</span> at checkout.
              </p>
            </div>
          </div>

          <button
            onClick={() => { setSelectedCategory('all'); navigateTo('shop'); }}
            className="px-6 py-3.5 bg-[#FF3E6C] hover:bg-[#e0355f] text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg hover:shadow-[#FF3E6C]/30 whitespace-nowrap"
          >
            Claim Deal Now
          </button>
        </div>
      </section>

      {/* 4. Tabbed Product Showcase Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#FF3E6C]">Hype Vault</span>
            <h2 className="text-3xl font-black uppercase tracking-tight text-neutral-900">Trending Drops</h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center space-x-2 bg-neutral-200/60 p-1.5 rounded-2xl overflow-x-auto scrollbar-none">
            <button
              onClick={() => setActiveTab('trending')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === 'trending' ? 'bg-black text-white shadow-sm' : 'text-neutral-700 hover:text-black'
              }`}
            >
              Trending Now 🔥
            </button>
            <button
              onClick={() => setActiveTab('bestsellers')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === 'bestsellers' ? 'bg-black text-white shadow-sm' : 'text-neutral-700 hover:text-black'
              }`}
            >
              Best Sellers ⭐
            </button>
            <button
              onClick={() => setActiveTab('new')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === 'new' ? 'bg-black text-white shadow-sm' : 'text-neutral-700 hover:text-black'
              }`}
            >
              Fresh Drops ⚡
            </button>
            <button
              onClick={() => setActiveTab('under100')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === 'under100' ? 'bg-black text-white shadow-sm' : 'text-neutral-700 hover:text-black'
              }`}
            >
              Under ₹500 🏷️
            </button>
          </div>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {tabProducts.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => { setSelectedCategory('all'); navigateTo('shop'); }}
            className="px-8 py-4 bg-neutral-900 hover:bg-black text-white rounded-full font-black text-xs uppercase tracking-widest transition-transform hover:scale-105 shadow-md"
          >
            Explore Complete Catalog ({products.length} Drops)
          </button>
        </div>
      </section>

      {/* 5. Minimalist Nike-Style Collab Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-neutral-950 text-white min-h-[400px] flex items-center p-8 sm:p-14 border border-neutral-800">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-40 filter grayscale contrast-125"
            style={{ backgroundImage: `url(https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1600&q=80)` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />

          <div className="relative z-10 max-w-xl space-y-4">
            <span className="text-[#FFA41C] text-xs font-black uppercase tracking-widest">
              Limited Edition Collaboration
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter leading-none">
              VORTEX LABS <br />
              <span className="text-[#FF3E6C]">ARCHIVE 001</span>
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
              Industrial weather-proof membranes, internal sling harnesses, and heavy-gauge ripstop parachute silhouettes. Built for extreme urban climates.
            </p>
            <div className="pt-2">
              <button
                onClick={() => {
                  setSelectedCategory('jackets');
                  navigateTo('shop');
                }}
                className="px-6 py-3.5 bg-white text-black font-black text-xs uppercase tracking-wider rounded-full hover:bg-[#FF3E6C] hover:text-white transition-all shadow-xl"
              >
                Discover the Capsule
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
