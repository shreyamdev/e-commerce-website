import React from 'react';
import { 
  SlidersHorizontal, 
  RotateCcw, 
  Star, 
  Check, 
  ChevronRight 
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { CATEGORIES, BRANDS } from '../../data/products';

export const FilterSidebar = ({ isMobileOpen, onCloseMobile }) => {
  const {
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
    clearAllFilters,
    activeFiltersCount
  } = useStore();

  const content = (
    <div className="space-y-6">
      {/* Header with Clear Button */}
      <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
        <div className="flex items-center space-x-2">
          <SlidersHorizontal className="w-4 h-4 text-neutral-800" />
          <h3 className="font-extrabold text-sm tracking-wider uppercase text-neutral-900">
            Filters
          </h3>
          {activeFiltersCount > 0 && (
            <span className="bg-black text-white text-[10px] font-black px-2 py-0.5 rounded-full">
              {activeFiltersCount}
            </span>
          )}
        </div>
        {activeFiltersCount > 0 && (
          <button
            onClick={clearAllFilters}
            className="text-xs font-bold text-[#FF3E6C] hover:underline flex items-center space-x-1"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Categories Filter */}
      <div>
        <h4 className="font-black text-xs uppercase tracking-wider text-neutral-900 mb-3">
          Categories
        </h4>
        <div className="space-y-1">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-black text-white shadow-sm'
                    : 'text-neutral-600 hover:bg-neutral-100 hover:text-black'
                }`}
              >
                <span>{cat.name}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isSelected ? 'bg-neutral-800 text-neutral-300' : 'bg-neutral-100 text-neutral-500'}`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range Slider (Amazon style) */}
      <div className="pt-4 border-t border-neutral-200">
        <div className="flex justify-between items-center mb-3">
          <h4 className="font-black text-xs uppercase tracking-wider text-neutral-900">
            Max Price
          </h4>
          <span className="text-xs font-black text-[#111111] bg-neutral-100 px-2.5 py-1 rounded-lg border border-neutral-200">
            ${priceRange[1]}
          </span>
        </div>
        <input
          type="range"
          min="30"
          max="250"
          step="10"
          value={priceRange[1]}
          onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
          className="w-full accent-black cursor-pointer h-1.5 bg-neutral-200 rounded-lg"
        />
        <div className="flex justify-between text-[11px] text-neutral-400 mt-2 font-medium">
          <span>Min: $30</span>
          <span>Max: $250</span>
        </div>
      </div>

      {/* Brands Multi-Select Checkboxes */}
      <div className="pt-4 border-t border-neutral-200">
        <h4 className="font-black text-xs uppercase tracking-wider text-neutral-900 mb-3">
          Brands
        </h4>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
          {BRANDS.map((brand) => {
            const isChecked = selectedBrands.includes(brand);
            return (
              <label
                key={brand}
                className="flex items-center space-x-2.5 text-xs text-neutral-700 hover:text-black cursor-pointer select-none group"
              >
                <div
                  onClick={() => handleBrandToggle(brand)}
                  className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                    isChecked
                      ? 'bg-black border-black text-white'
                      : 'border-neutral-300 group-hover:border-black bg-white'
                  }`}
                >
                  {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <span onClick={() => handleBrandToggle(brand)} className="font-medium">
                  {brand}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Star Ratings Filter (Amazon style) */}
      <div className="pt-4 border-t border-neutral-200">
        <h4 className="font-black text-xs uppercase tracking-wider text-neutral-900 mb-3">
          Customer Rating
        </h4>
        <div className="space-y-1.5">
          {[4, 3].map((stars) => (
            <button
              key={stars}
              onClick={() => setMinRating(minRating === stars ? 0 : stars)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors ${
                minRating === stars
                  ? 'bg-amber-100/70 border border-amber-300 font-bold text-neutral-900'
                  : 'hover:bg-neutral-100 text-neutral-700'
              }`}
            >
              <div className="flex items-center space-x-1.5">
                <div className="flex text-[#FFA41C]">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < stars ? 'fill-[#FFA41C] text-[#FFA41C]' : 'text-neutral-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-[11px] font-semibold">& Up</span>
              </div>
              {minRating === stars && (
                <Check className="w-3.5 h-3.5 text-amber-700 stroke-[3]" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Availability / In-Stock Switch */}
      <div className="pt-4 border-t border-neutral-200">
        <label className="flex items-center justify-between cursor-pointer select-none">
          <span className="font-bold text-xs text-neutral-900">In Stock Only</span>
          <div
            onClick={() => setInStockOnly(!inStockOnly)}
            className={`w-10 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
              inStockOnly ? 'bg-black' : 'bg-neutral-300'
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                inStockOnly ? 'translate-x-4' : ''
              }`}
            />
          </div>
        </label>
      </div>

    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside className="hidden lg:block w-64 bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-sm sticky top-24 self-start">
        {content}
      </aside>

      {/* Mobile Drawer Filter */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 overflow-hidden">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-xs" 
            onClick={onCloseMobile} 
          />
          <div className="fixed inset-y-0 left-0 max-w-full flex">
            <div className="w-screen max-w-xs bg-white p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
              <div>
                <div className="flex justify-between items-center pb-4 mb-4 border-b border-neutral-200">
                  <h3 className="font-black text-base uppercase text-neutral-900">Filters</h3>
                  <button 
                    onClick={onCloseMobile}
                    className="p-1 rounded-lg text-neutral-500 hover:bg-neutral-100"
                  >
                    ✕
                  </button>
                </div>
                {content}
              </div>
              <div className="pt-6 border-t border-neutral-200 mt-6">
                <button
                  onClick={onCloseMobile}
                  className="w-full py-3 bg-black text-white rounded-xl font-bold text-xs uppercase tracking-wider"
                >
                  Show Results
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
