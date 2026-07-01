# Codebase Map

npm workspaces monorepo at `/home/${username}/websites/${sandboxId}/public_html`. The web app ships standalone. Call `enable_pocketbase_integration` to add a database, or `enable_api_server_integration` to add an Express backend — each tool appends its own `## apps/<service>` section to this file.

## apps/web (React + Vite + Tailwind + shadcn/ui, port 3000)

Located at apps/web/. Run: `cd apps/web && npm run dev` (auto-started by the sandbox supervisor).
src/main.jsx — entry point, mounts <App />
src/App.jsx — React Router, all routes defined here
src/index.css — Tailwind theme, CSS variables, Playfair Display & Inter fonts, luxury color palette
src/pages/HomePage.jsx — "/" route, redesigned premium hero with Dzire Gifts logo at top (100vh, refined subtle overlay, elegant headline/subheading, gold + outlined CTAs, trust badges with fade-up animations), collections, best sellers, personalization showcase, craftsmanship story, occasions, materials, testimonials, Instagram gallery, video, packaging, corporate/bulk, newsletter, footer
src/pages/ShopPage.jsx — "/shop" route, Phase 2 product listing with grid/list toggle, advanced filters (Category, Material, Theme, Color, Religion, Occasion, Price, Rating, Availability), sorting (Newest, Best Sellers, Price ↑/↓, Most Reviewed, Top Rated), search, load more + infinite scroll, quick-view modal, wishlist, product comparison, responsive design
src/components/Navbar.jsx — sticky navigation, mega menu, search, wishlist, account, cart, track order
src/components/ProductCard.jsx — reusable product card with image, price, rating, quick view, wishlist, list view variant, interaction props
src/components/ScrollToTop.jsx — resets scroll on route change
src/components/ui/ — shadcn/ui primitives — import from `@/components/ui/<name>`, do not edit the files
src/hooks/use-mobile.jsx — mobile breakpoint detection
src/hooks/use-toast.js — toast notifications
src/lib/utils.js — cn() Tailwind class merge
src/data/site.js — shared site data, categories, featured products, testimonials, materials, occasions, themes, religions, occasions, colors
vault/wiki/skills/design/SKILL.md — frontend craft, styling, typography, motion, and shadcn policy for UI surfaces.
apps/web/plugins/session-journal/ — infrastructure, DO NOT edit. Vite dev plugin injects the browser session journal client; events go over HMR (`import.meta.hot.send('session-journal:event', …)`); the plugin arranges persistence under `vault/temp/SESSION_JOURNAL.md`.
Routes: / → HomePage, /shop → ShopPage
