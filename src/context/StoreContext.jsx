import React, { createContext, useContext, useState, useMemo } from 'react';
import { PRODUCTS } from '../data/products';
const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'shop' | 'product-detail' | 'cart' | 'wishlist' | 'checkout' | 'admin' | 'order-tracking'
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 250]);
  const [minRating, setMinRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('featured'); // 'featured', 'price-asc', 'price-desc', 'rating"', 'newest'
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'compact' | 'list'
  const [placedOrder, setPlacedOrder] = useState(null);

  const selectedProduct = useMemo(() => {
    return PRODUCTS.find((p) => p.id === selectedProductId) || PRODUCTS[0];
  }, [selectedProductId]);

  const navigateTo = (view, product = null) => {
    if (product) {
      setSelectedProductId(product.id || product);
    }
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBrandToggle = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedBrands([]);
    setPriceRange([0, 250]);
    setMinRating(0);
    setInStockOnly(false);
    setSortBy('featured');
  };

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (selectedCategory !== 'all') count++;
    if (selectedBrands.length > 0) count += selectedBrands.length;
    if (priceRange[0] > 0 || priceRange[1] < 250) count++;
    if (minRating > 0) count++;
    if (inStockOnly) count++;
    if (searchQuery.trim().length > 0) count++;
    return count;
  }, [selectedCategory, selectedBrands, priceRange, minRating, inStockOnly, searchQuery]);

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = product.name.toLowerCase().includes(q);
        const matchBrand = product.brand.toLowerCase().includes(q);
        const matchDesc = product.description.toLowerCase().includes(q);
        if (!matchName && !matchBrand && !matchDesc) return false;
      }

      // Brands filter
      if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
        return false;
      }

      // Price range
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false;
      }

      // Min Rating
      if (minRating > 0 && product.rating < minRating) {
        return false;
      }

      // Stock
      if (inStockOnly && !product.inStock) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      // default: featured
      return (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0);
    });
  }, [selectedCategory, searchQuery, selectedBrands, priceRange, minRating, inStockOnly, sortBy]);

  return (
    <StoreContext.Provider
      value={{
        currentView,
        setCurrentView,
        selectedProduct,
        setSelectedProductId,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedBrands,
        setSelectedBrands,
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
        clearAllFilters,
        activeFiltersCount,
        filteredProducts,
        navigateTo,
        placedOrder,
        setPlacedOrder
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
