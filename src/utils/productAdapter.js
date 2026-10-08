const FALLBACK_IMAGE =
  'https://placehold.co/800x1000?text=HYPED+PRODUCT';

const CATEGORY_MAP = {
  electronics: 'accessories',
  clothing: 't-shirts',
  footwear: 'sneakers',
  accessories: 'accessories',
  home: 'accessories'
};

export const normalizeProduct = (product) => {
  if (!product) return null;

  const rawCategory = String(product.category || 'accessories');
  const category = CATEGORY_MAP[rawCategory.toLowerCase()] || rawCategory.toLowerCase();
  const image = product.image || FALLBACK_IMAGE;
  const images = Array.isArray(product.images) && product.images.length
    ? product.images.filter(Boolean)
    : [image];

  const price = Number(product.price || 0);
  const originalPrice = product.originalPrice === null || product.originalPrice === undefined
    ? null
    : Number(product.originalPrice);
  const rating = Number(product.rating || 0);
  const stock = Number(product.stock || 0);

  const colors = Array.isArray(product.colors)
    ? product.colors.map((color, index) => {
        if (typeof color === 'string') {
          return { name: color, hex: '#111111', imageIndex: index };
        }
        return {
          name: color?.name || `Color ${index + 1}`,
          hex: color?.hex || '#111111',
          imageIndex: Number.isInteger(color?.imageIndex) ? color.imageIndex : index
        };
      })
    : [];

  return {
    ...product,
    id: product._id || product.id,
    _id: product._id || product.id,
    brand: product.brand || rawCategory,
    category,
    price,
    originalPrice,
    discountPercent: originalPrice && originalPrice > price
      ? Math.max(0, Math.round((1 - price / originalPrice) * 100))
      : 0,
    rating,
    reviewCount: Number(product.numReviews || 0),
    badge: product.badge || (rating >= 4.5 ? 'Top Rated' : ''),
    isTrending: Boolean(product.isTrending ?? rating >= 4),
    isBestSeller: Boolean(product.isBestSeller ?? rating >= 4.5),
    isNew: Boolean(product.isNew ?? product.newArrival),
    inStock: stock > 0,
    stockCount: stock,
    images,
    sizes: Array.isArray(product.sizes) && product.sizes.length ? product.sizes : null,
    colors: colors.length ? colors : null,
    description: product.description || '',
    specs: product.specs || {}
  };
};

export const normalizeCart = (cart) => {
  const items = cart?.items || [];

  return items
    .filter((item) => item?.product)
    .map((item) => ({
      product: normalizeProduct(item.product),
      selectedSize: item.selectedSize || 'Standard',
      selectedColor: item.selectedColor || 'Default',
      quantity: Number(item.quantity || 1)
    }));
};
