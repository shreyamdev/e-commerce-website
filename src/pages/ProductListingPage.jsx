/*import React, { useState } from 'react';
import {
  SlidersHorizontal,
  LayoutGrid,
  Grid3X3,
  X,
  ChevronDown,
  ShoppingBag,
  AlertTriangle
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { FilterSidebar } from '../components/product/FilterSidebar';
import { ProductCard } from '../components/product/ProductCard';
import { CATEGORIES } from '../data/products';

export const ProductListingPage = () => {
  const {
    filteredProducts = [],
    // `loading` and `error` must be added to the StoreContext value (see notes).
    // Defaults keep this page working even before the context is updated.
    loading = false,
    error = null,
    selectedCategory,
    setSelectedCategory,
    selectedBrands,
    handleBrandToggle,
    priceRange,
    setPriceRange,
    minRating,
    setMinRating,
    inStockOnly,
    setInStockOnly,
    sortBy,
    setSortBy,
    viewMode,
    setViewMode,
    searchQuery,
    clearAllFilters,
    activeFiltersCount
  } = useStore();

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const currentCategoryName =
    CATEGORIES.find((c) => c.id === selectedCategory)?.name || 'All Drops';

  const gridClasses = `grid gap-4 sm:gap-6 ${
    viewMode === 'compact'
      ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'
      : 'grid-cols-2 md:grid-cols-3'
  }`;

  const badgeClasses =
    'inline-flex items-center space-x-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-full px-3 py-1 text-xs font-semibold';

  const renderProducts = () => {
    // 1. Loading: skeleton cards
    if (loading) {
      return (
        <div className={gridClasses} aria-busy="true" aria-live="polite">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="aspect-[3/4] rounded-2xl bg-neutral-100 animate-pulse"
            />
          ))}
        </div>
      )
    }

    // 2. Error
    if (error) {
      return (
        <div
          role="alert"
          className="bg-white rounded-3xl border border-neutral-200 p-12 text-center flex flex-col items-center justify-center"
        >
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="w-10 h-10 text-red-400" />
          </div>
          <h3 className="text-lg font-black uppercase text-neutral-900">
            Couldn't load drops
          </h3>
          <p className="text-xs text-neutral-500 mt-2 max-w-sm">{String(error)}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-6 py-3 bg-black text-white font-bold text-xs uppercase tracking-wider rounded-full hover:bg-neutral-800 transition-colors shadow-lg"
          >
            Try Again
          </button>
        </div>
      );
    }

    // 3. Empty (no results after filters)
    if (filteredProducts.length === 0) {
      return (
        <div className="bg-white rounded-3xl border border-neutral-200 p-12 text-center flex flex-col items-center justify-center">
          <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mb-4">
            <ShoppingBag className="w-10 h-10 text-neutral-400" />
          </div>
          <h3 className="text-lg font-black uppercase text-neutral-900">
            No matching drops found
          </h3>
          <p className="text-xs text-neutral-500 mt-2 max-w-sm">
            Try loosening your filters, adjusting the price slider, or searching for other
            streetwear keywords.
          </p>
          <button
            onClick={clearAllFilters}
            className="mt-6 px-6 py-3 bg-black text-white font-bold text-xs uppercase tracking-wider rounded-full hover:bg-neutral-800 transition-colors shadow-lg"
          >
            Reset All Filters
          </button>
        </div>
      );
    }

    // 4. Products
    return (
      <div className={gridClasses}>
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb & Title Bar */}
      <div className="mb-6">
        <div className="flex items-center space-x-2 text-xs text-neutral-500 mb-2">
          <span>Home</span>
          <span>/</span>
          <span className="text-black font-semibold">{currentCategoryName}</span>
          {searchQuery && (
            <>
              <span>/</span>
              <span className="text-[#FF3E6C] font-semibold">Search: "{searchQuery}"</span>
            </>
          )}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tight text-neutral-900">
              {currentCategoryName}
            </h1>
            <p className="text-xs text-neutral-500 mt-1">
              {loading ? (
                'Loading drops…'
              ) : error ? (
                'Drops are unavailable right now'
              ) : (
                <>
                  Showing <strong className="text-black">{filteredProducts.length}</strong>{' '}
                  items tailored to your streetwear criteria
                </>
              )}
            </p>
          </div>

          {/* Active Filter Badges */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="text-xs font-bold text-neutral-400">Active:</span>

              {selectedCategory !== 'all' && (
                <span className={badgeClasses}>
                  <span>Category: {currentCategoryName}</span>
                  <button
                    onClick={() => setSelectedCategory('all')}
                    aria-label="Remove category filter"
                  >
                    <X className="w-3.5 h-3.5 hover:text-red-500" />
                  </button>
                </span>
              )}

              {selectedBrands.map((brand) => (
                <span key={brand} className={badgeClasses}>
                  <span>{brand}</span>
                  <button
                    onClick={() => handleBrandToggle(brand)}
                    aria-label={`Remove ${brand} filter`}
                  >
                    <X className="w-3.5 h-3.5 hover:text-red-500" />
                  </button>
                </span>
              ))}

              {priceRange[1] < 250 && (
                <span className={badgeClasses}>
                  <span>Under ${priceRange[1]}</span>
                  <button
                    onClick={() => setPriceRange([0, 250])}
                    aria-label="Remove price filter"
                  >
                    <X className="w-3.5 h-3.5 hover:text-red-500" />
                  </button>
                </span>
              )}

              {minRating > 0 && (
                <span className={badgeClasses}>
                  <span>{minRating}★ & Above</span>
                  <button onClick={() => setMinRating(0)} aria-label="Remove rating filter">
                    <X className="w-3.5 h-3.5 hover:text-red-500" />
                  </button>
                </span>
              )}

              {inStockOnly && (
                <span className={badgeClasses}>
                  <span>In Stock</span>
                  <button
                    onClick={() => setInStockOnly(false)}
                    aria-label="Remove in-stock filter"
                  >
                    <X className="w-3.5 h-3.5 hover:text-red-500" />
                  </button>
                </span>
              )}

              <button
                onClick={clearAllFilters}
                className="text-xs font-bold text-[#FF3E6C] hover:underline px-2"
              >
                Clear All
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Top Sorting and Controls Bar */}
      <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-neutral-200/80 shadow-xs mb-8 flex flex-wrap items-center justify-between gap-4">
        {/* Mobile Filter Toggle Button */}
        <button
          onClick={() => setMobileFilterOpen(true)}
          className="lg:hidden flex items-center space-x-2 px-4 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-xl text-xs font-bold text-neutral-800 transition-colors"
        >
          <SlidersHorizontal className="w-4 h-4 text-neutral-600" />
          <span>Filters</span>
          {activeFiltersCount > 0 && (
            <span className="bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
              {activeFiltersCount}
            </span>
          )}
        </button>

        {/* View Grid Switchers */}
        <div className="hidden sm:flex items-center space-x-1 bg-neutral-100 p-1 rounded-xl">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded-lg transition-colors ${
              viewMode === 'grid'
                ? 'bg-white text-black shadow-xs font-bold'
                : 'text-neutral-500 hover:text-black'
            }`}
            title="Standard Grid"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('compact')}
            className={`p-1.5 rounded-lg transition-colors ${
              viewMode === 'compact'
                ? 'bg-white text-black shadow-xs font-bold'
                : 'text-neutral-500 hover:text-black'
            }`}
            title="Compact Grid"
          >
            <Grid3X3 className="w-4 h-4" />
          </button>
        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center space-x-3 ml-auto">
          <span className="text-xs font-semibold text-neutral-500 hidden sm:inline">
            Sort By:
          </span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-neutral-50 border border-neutral-300 py-2 pl-3.5 pr-8 rounded-xl text-xs font-bold text-neutral-800 hover:border-black focus:outline-none focus:border-black cursor-pointer"
            >
              <option value="featured">Featured / Trending</option>
              <option value="newest">Newest Releases</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Customer Rating</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-neutral-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Main Content Layout (Sidebar + Product Grid) */}
      <div className="flex gap-8">
        <FilterSidebar
          isMobileOpen={mobileFilterOpen}
          onCloseMobile={() => setMobileFilterOpen(false)}
        />

        <div className="flex-1">{renderProducts()}</div>
      </div>
    </div>
  );
};