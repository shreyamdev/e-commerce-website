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
  const rating = Number(product.rating || 0);
  const stock = Number(product.stock || 0);
  const price = Number(product.price || 0);

  return {
    ...product,
    id: product._id || product.id,
    _id: product._id || product.id,
    brand: product.brand || rawCategory,
    category,
    price,
    originalPrice: product.originalPrice || null,
    discountPercent: product.originalPrice
      ? Math.max(0, Math.round((1 - price / product.originalPrice) * 100))
      : 0,
    rating,
    reviewCount: Number(product.numReviews || 0),
    badge: rating >= 4.5 ? 'Top Rated' : '',
    isTrending: rating >= 4,
    isBestSeller: rating >= 4.5,
    isNew: false,
    inStock: stock > 0,
    stockCount: stock,
    images: Array.isArray(product.images) && product.images.length
      ? product.images
      : [image],
    sizes: product.sizes || null,
    colors: product.colors || null,
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
      selectedSize: 'Standard',
      selectedColor: 'Default',
      quantity: Number(item.quantity || 1)
    }));
};
