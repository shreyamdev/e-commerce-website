import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { api } from '../api/httpClient';
import { PRODUCTS as FALLBACK_PRODUCTS } from '../data/products';
import { normalizeProduct } from '../utils/productAdapter';

const StoreContext = createContext();

const VIEW_ALIASES = {
  products: 'shop',
  product: 'product-detail',
  login: 'auth',
  tracking: 'order-tracking'
};

const getHashRoute = () => {
  const raw = window.location.hash.replace(/^#\/?/, '');
  if (!raw) return { view: 'home', productId: null };

  const [path, productId] = raw.split('/');
  const view = VIEW_ALIASES[path] || path || 'home';
  return { view, productId: productId || null };
};

const getRouteHash = (view, productId = null) => {
  const route = productId && view === 'product-detail'
    ? `product-detail/${encodeURIComponent(productId)}`
    : view;
  return `#/${route}`;
};

export const StoreProvider = ({ children }) => {
  const [products, setProducts] = useState(() => FALLBACK_PRODUCTS.map(normalizeProduct));
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsError, setProductsError] = useState(null);

  const initialRoute = getHashRoute();
  const [currentView, setCurrentView] = useState(initialRoute.view || 'home');
  const [selectedProductId, setSelectedProductId] = useState(initialRoute.productId);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategoryState] = useState('all');

  const setSelectedCategory = (category) => {
    const normalized = String(category || 'all').toLowerCase();
    setSelectedCategoryState(normalized === 'all' ? 'all' : normalized);
  };
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [minRating, setMinRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  const [placedOrder, setPlacedOrder] = useState(null);

  const refreshProducts = async () => {
    try {
      setProductsLoading(true);
      setProductsError(null);
      const response = await api.get('/products?limit=100&page=1');
      const remoteProducts = Array.isArray(response.products) ? response.products : [];

      if (remoteProducts.length > 0) {
        setProducts(remoteProducts.map(normalizeProduct).filter(Boolean));
      } else {
        setProducts(FALLBACK_PRODUCTS.map(normalizeProduct));
      }
    } catch (error) {
      console.warn('Using local catalog fallback:', error);
      setProductsError(null);
      setProducts(FALLBACK_PRODUCTS.map(normalizeProduct));
    } finally {
      setProductsLoading(false);
    }
  };

  useEffect(() => {
    refreshProducts();

    const handlePopState = () => {
      const route = getHashRoute();
      setCurrentView(route.view);
      setSelectedProductId(route.productId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  useEffect(() => {
    if (products.length && selectedProductId && !products.some((p) => p.id === selectedProductId)) {
      // Keep the old ID in the URL only if a valid backend product is not available.
      // The detail page will use the first available product instead of crashing.
    }
  }, [products, selectedProductId]);

  const selectedProduct = useMemo(() => {
    return products.find((p) => p.id === selectedProductId) || products[0] || null;
  }, [products, selectedProductId]);

  const navigateTo = (view, product = null) => {
    const normalizedView = VIEW_ALIASES[view] || view;
    const nextProductId = product ? (product.id || product._id || product) : null;

    if (product) setSelectedProductId(nextProductId);
    setCurrentView(normalizedView);

    const nextHash = getRouteHash(normalizedView, nextProductId);
    if (window.location.hash !== nextHash) {
      window.history.pushState(
        { view: normalizedView, productId: nextProductId },
        '',
        nextHash
      );
    }

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
    setPriceRange([0, 100000]);
    setMinRating(0);
    setInStockOnly(false);
    setSortBy('featured');
  };

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (selectedCategory !== 'all') count++;
    if (selectedBrands.length > 0) count += selectedBrands.length;
    if (priceRange[0] > 0 || priceRange[1] < 100000) count++;
    if (minRating > 0) count++;
    if (inStockOnly) count++;
    if (searchQuery.trim().length > 0) count++;
    return count;
  }, [selectedCategory, selectedBrands, priceRange, minRating, inStockOnly, searchQuery]);

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        if (selectedCategory !== 'all' && product.category !== selectedCategory) return false;

        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = product.name.toLowerCase().includes(q);
          const matchBrand = (product.brand || '').toLowerCase().includes(q);
          const matchDesc = (product.description || '').toLowerCase().includes(q);
          if (!matchName && !matchBrand && !matchDesc) return false;
        }

        if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) return false;
        if (product.price < priceRange[0] || product.price > priceRange[1]) return false;
        if (minRating > 0 && product.rating < minRating) return false;
        if (inStockOnly && !product.inStock) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        return (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0);
      });
  }, [products, selectedCategory, searchQuery, selectedBrands, priceRange, minRating, inStockOnly, sortBy]);

  return (
    <StoreContext.Provider
      value={{
        products,
        productsLoading,
        productsError,
        refreshProducts,
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
