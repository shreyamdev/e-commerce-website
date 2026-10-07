HYPED frontend integration/styling fix

1. Replace your current project files with the files in this ZIP (keep your backend/.env secret).
2. The frontend .env is:
   VITE_BACKEND_URL=https://e-commerce-website-y1pa.onrender.com/api
3. From the project root run:
   npm install
   npm run dev
4. Open http://localhost:5173

This patch fixes:
- Tailwind/PostCSS configuration
- missing root index.html
- Windows/Linux filename case mismatches (AuthContext, httpClient, AuthPage)
- CartDrawer import path
- JWT auth flow to match the current backend
- unsupported refresh/logout/me API calls
- fake VITE_API_KEY product request

Important: product/cart/wishlist/order UI is still based partly on the original storefront's local contexts/data. Those features should be end-to-end tested against the backend before calling the integration production-complete.
