HYPED frontend styling fix

Copy these files into the project root:
- tailwind.config.js
- postcss.config.js

Replace src/main.jsx with main.jsx.fixed (rename it to main.jsx).

Then restart Vite:
Ctrl+C
npm run dev

Reason: the project uses Tailwind directives in src/index.css, but Tailwind/PostCSS config files were missing, so the Tailwind utility classes were not being generated and the UI appeared as unstyled HTML.
