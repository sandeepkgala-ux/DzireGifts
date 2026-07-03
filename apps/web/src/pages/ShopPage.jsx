import React, {
  useState,
  useMemo,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  LayoutGrid,
  List,
  X,
  Star,
  Heart,
  GitCompare,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import {
  products as staticProducts,
  categoryNames,
  materials,
  themes,
  colors,
  religions,
  occasions,
} from "@/data/site";

const SORTS = {
  newest: { label: "Newest", fn: (a, b) => a.added - b.added },
  best: {
    label: "Best Sellers",
    fn: (a, b) =>
      Number(b.bestSeller) - Number(a.bestSeller) || b.reviews - a.reviews,
  },
  priceLow: { label: "Price: Low to High", fn: (a, b) => a.price - b.price },
  priceHigh: { label: "Price: High to Low", fn: (a, b) => b.price - a.price },
  reviewed: { label: "Most Reviewed", fn: (a, b) => b.reviews - a.reviews },
  rated: { label: "Top Rated", fn: (a, b) => b.rating - a.rating },
};

const PAGE = 6;

const CheckGroup = ({ title, options, selected, onToggle }) => (
  <div className="border-t border-border py-5">
    <h4 className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
      {title}
    </h4>
    <div className="space-y-2">
      {options.map((o) => (
        <label
          key={o}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <span
            className={`h-4 w-4 rounded border flex items-center justify-center transition ${selected.includes(o) ? "bg-gold border-gold" : "border-border group-hover:border-gold"}`}
          >
            {selected.includes(o) && (
              <span className="h-1.5 w-1.5 rounded-sm bg-primary" />
            )}
          </span>
          <input
            type="checkbox"
            className="sr-only"
            checked={selected.includes(o)}
            onChange={() => onToggle(o)}
          />
          <span className="text-sm">{o}</span>
        </label>
      ))}
    </div>
  </div>
);

const ShopPage = () => {
  const [productsList, setProductsList] = useState(staticProducts);
  const [loading, setLoading] = useState(true);

  // Fetch live WooCommerce products on mount
  useEffect(() => {
    async function fetchLiveProducts() {
      try {
        if (!import.meta.env.VITE_API_URL) {
          setLoading(false);
          return;
        }
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/products`,
          {
            params: {
              consumer_key: import.meta.env.VITE_WC_CONSUMER_KEY,
              consumer_secret: import.meta.env.VITE_WC_CONSUMER_SECRET,
              status: "publish",
              per_page: 50,
            },
          },
        );

        if (response.data && Array.isArray(response.data)) {
          const mapped = response.data.map((item) => ({
            id: item.id,
            name: item.name,
            price: Number(item.price || item.regular_price || 0),
            mrp: Number(item.regular_price || item.price || 0),
            rating: Number(item.average_rating || 4.8),
            reviews: item.rating_count || 12,
            img:
              item.images?.[0]?.src ||
              "https://via.placeholder.com/400x400?text=No+Image",
            category: item.categories?.[0]?.name || "Personalized Decor",
            material:
              item.attributes?.find((a) => a.name.toLowerCase() === "material")
                ?.options?.[0] || "Acrylic / MDF",
            theme:
              item.attributes?.find((a) => a.name.toLowerCase() === "theme")
                ?.options?.[0] || "Modern",
            color:
              item.attributes?.find((a) => a.name.toLowerCase() === "color")
                ?.options?.[0] || "Gold / Metallic",
            religion: "All",
            occasion: "Home Decor",
            inStock: item.stock_status === "instock",
            added: new Date(item.date_created).getTime(),
          }));
          setProductsList(mapped);
        }
      } catch (err) {
        console.error("WooCommerce API fallback to local data:", err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchLiveProducts();
  }, []);

  const [view, setView] = useState("grid");
  const [sort, setSort] = useState("best");
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(PAGE);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [quick, setQuick] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [compare, setCompare] = useState([]);
  const [showCompare, setShowCompare] = useState(false);

  const [f, setF] = useState({
    category: [],
    material: [],
    theme: [],
    color: [],
    religion: [],
    occasion: [],
  });
  const [minRating, setMinRating] = useState(0);
  const [maxPrice, setMaxPrice] = useState(8000);
  const [inStockOnly, setInStockOnly] = useState(false);

  const toggle = (key, val) =>
    setF((s) => ({
      ...s,
      [key]: s[key].includes(val)
        ? s[key].filter((x) => x !== val)
        : [...s[key], val],
    }));
  const toggleId = (list, set, p) =>
    set(
      list.some((x) => x.id === p.id)
        ? list.filter((x) => x.id !== p.id)
        : [...list, p],
    );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return productsList
      .filter((p) => {
        if (
          q &&
          !`${p.name} ${p.material} ${p.category} ${p.theme}`
            .toLowerCase()
            .includes(q)
        )
          return false;
        if (f.category.length && !f.category.includes(p.category)) return false;
        if (f.material.length && !f.material.includes(p.material)) return false;
        if (f.theme.length && !f.theme.includes(p.theme)) return false;
        if (f.color.length && !f.color.includes(p.color)) return false;
        if (f.religion.length && !f.religion.includes(p.religion)) return false;
        if (f.occasion.length && !f.occasion.includes(p.occasion)) return false;
        if (p.rating < minRating) return false;
        if (p.price > maxPrice) return false;
        if (inStockOnly && !p.inStock) return false;
        return true;
      })
      .sort(SORTS[sort].fn);
  }, [query, f, minRating, maxPrice, inStockOnly, sort, productsList]);

  useEffect(() => {
    setVisible(PAGE);
  }, [query, f, minRating, maxPrice, inStockOnly, sort]);

  const shown = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;

  const sentinel = useRef(null);
  const loadMore = useCallback(() => setVisible((v) => v + PAGE), []);
  useEffect(() => {
    if (!hasMore || !sentinel.current) return;
    const io = new IntersectionObserver(
      (e) => {
        if (e[0].isIntersecting) loadMore();
      },
      { rootMargin: "200px" },
    );
    io.observe(sentinel.current);
    return () => io.disconnect();
  }, [hasMore, loadMore]);

  const activeCount =
    Object.values(f).flat().length +
    (inStockOnly ? 1 : 0) +
    (minRating ? 1 : 0) +
    (maxPrice < 8000 ? 1 : 0);
  const clearAll = () => {
    setF({
      category: [],
      material: [],
      theme: [],
      color: [],
      religion: [],
      occasion: [],
    });
    setMinRating(0);
    setMaxPrice(8000);
    setInStockOnly(false);
    setQuery("");
  };

  const FilterPanel = (
    <div className="pb-4">
      <div className="border-t border-border py-5">
        <h4 className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
          Price · up to &#8377;{maxPrice.toLocaleString("en-IN")}
        </h4>
        <input
          type="range"
          min="1500"
          max="8000"
          step="100"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-[hsl(var(--gold))]"
        />
      </div>
      <div className="border-t border-border py-5">
        <h4 className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
          Rating
        </h4>
        <div className="flex gap-2">
          {[0, 4, 4.5, 4.8].map((r) => (
            <button
              key={r}
              onClick={() => setMinRating(r)}
              className={`flex items-center gap-1 text-sm px-3 py-1.5 rounded-lg border transition ${minRating === r ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-gold"}`}
            >
              {r === 0 ? (
                "All"
              ) : (
                <>
                  {r}
                  <Star className="h-3 w-3 fill-current" />+
                </>
              )}
            </button>
          ))}
        </div>
      </div>
      <CheckGroup
        title="Category"
        options={categoryNames}
        selected={f.category}
        onToggle={(o) => toggle("category", o)}
      />
      <CheckGroup
        title="Material"
        options={materials}
        selected={f.material}
        onToggle={(o) => toggle("material", o)}
      />
      <CheckGroup
        title="Theme"
        options={themes}
        selected={f.theme}
        onToggle={(o) => toggle("theme", o)}
      />
      <CheckGroup
        title="Color"
        options={colors}
        selected={f.color}
        onToggle={(o) => toggle("color", o)}
      />
      <CheckGroup
        title="Religion"
        options={religions}
        selected={f.religion}
        onToggle={(o) => toggle("religion", o)}
      />
      <CheckGroup
        title="Occasion"
        options={occasions}
        selected={f.occasion}
        onToggle={(o) => toggle("occasion", o)}
      />
      <label className="flex items-center gap-2.5 cursor-pointer border-t border-border pt-5">
        <span
          className={`h-4 w-4 rounded border flex items-center justify-center transition ${inStockOnly ? "bg-gold border-gold" : "border-border"}`}
        >
          {inStockOnly && (
            <span className="h-1.5 w-1.5 rounded-sm bg-primary" />
          )}
        </span>
        <input
          type="checkbox"
          className="sr-only"
          checked={inStockOnly}
          onChange={() => setInStockOnly((v) => !v)}
        />
        <span className="text-sm">In stock only</span>
      </label>
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <Navbar />

      <header className="bg-background border-b border-border/60 pt-24 pb-6">
        <div className="container flex flex-col md:flex-row md:items-end justify-between gap-2">
          <div>
            <span className="text-[0.65rem] uppercase tracking-[0.3em] text-gold font-semibold block">
              The Collection
            </span>
            <h1 className="font-display text-2xl md:text-4xl font-semibold tracking-tight mt-0.5">
              Shop All Nameplates & Gifts
            </h1>
          </div>
          <p className="text-muted-foreground text-xs md:text-sm max-w-md">
            Handcrafted and made-to-order. Engineered with secure back hooks for
            clean wall mounting.
          </p>
        </div>
      </header>
      <div className="container py-8 flex gap-10">
        {/* Sidebar filters (desktop) */}
        <aside className="hidden lg:block w-72 shrink-0">
          <div className="sticky top-24">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-display text-xl">Filters</h3>
              {activeCount > 0 && (
                <button
                  onClick={clearAll}
                  className="text-xs text-gold hover:underline"
                >
                  Clear all ({activeCount})
                </button>
              )}
            </div>
            {FilterPanel}
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 min-w-0">
          {/* Toolbar */}
          <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products, materials, themes..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFiltersOpen(true)}
                className="lg:hidden flex items-center gap-2 px-3 py-2.5 rounded-xl border border-border text-sm"
              >
                <SlidersHorizontal className="h-4 w-4" /> Filters
                {activeCount > 0 && ` (${activeCount})`}
              </button>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="px-3 py-2.5 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"
              >
                {Object.entries(SORTS).map(([k, v]) => (
                  <option key={k} value={k}>
                    {v.label}
                  </option>
                ))}
              </select>
              <div className="hidden sm:flex rounded-xl border border-border overflow-hidden">
                <button
                  onClick={() => setView("grid")}
                  aria-label="Grid view"
                  className={`p-2.5 ${view === "grid" ? "bg-primary text-primary-foreground" : ""}`}
                >
                  <LayoutGrid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setView("list")}
                  aria-label="List view"
                  className={`p-2.5 ${view === "list" ? "bg-primary text-primary-foreground" : ""}`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {loading && (
            <div className="text-center py-12 text-sm text-muted-foreground">
              ⏳ Loading live inventory...
            </div>
          )}

          <p className="text-sm text-muted-foreground mb-5">
            {filtered.length} product{filtered.length !== 1 && "s"}
          </p>

          {filtered.length === 0 ? (
            <div className="text-center py-24 border border-dashed border-border rounded-2xl">
              <p className="font-display text-2xl mb-2">No matches found</p>
              <p className="text-muted-foreground mb-5">
                Try adjusting your filters or search.
              </p>
              <button
                onClick={clearAll}
                className="bg-primary text-primary-foreground px-5 py-2.5 rounded-xl text-sm"
              >
                Clear filters
              </button>
            </div>
          ) : view === "grid" ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {shown.map((p) => (
                <ProductCard
                  key={p.id}
                  p={p}
                  view="grid"
                  onQuickView={setQuick}
                  onWishlist={(x) => toggleId(wishlist, setWishlist, x)}
                  onCompare={(x) => toggleId(compare, setCompare, x)}
                  wishlisted={wishlist.some((w) => w.id === p.id)}
                  compared={compare.some((c) => c.id === p.id)}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {shown.map((p) => (
                <ProductCard
                  key={p.id}
                  p={p}
                  view="list"
                  onQuickView={setQuick}
                  onWishlist={(x) => toggleId(wishlist, setWishlist, x)}
                  onCompare={(x) => toggleId(compare, setCompare, x)}
                  wishlisted={wishlist.some((w) => w.id === p.id)}
                  compared={compare.some((c) => c.id === p.id)}
                />
              ))}
            </div>
          )}

          {hasMore && (
            <div ref={sentinel} className="mt-10 flex justify-center">
              <button
                onClick={loadMore}
                className="border border-border px-6 py-3 rounded-xl text-sm font-medium hover:border-gold transition flex items-center gap-2"
              >
                Load more <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Mobile filter drawer */}
      <AnimatePresence>
        {filtersOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setFiltersOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", ease: "easeOut" }}
              className="absolute left-0 top-0 h-full w-[85%] max-w-sm bg-background p-5 overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-display text-xl">Filters</h3>
                <button
                  onClick={() => setFiltersOpen(false)}
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              {activeCount > 0 && (
                <button
                  onClick={clearAll}
                  className="text-xs text-gold hover:underline mb-2"
                >
                  Clear all ({activeCount})
                </button>
              )}
              {FilterPanel}
              <button
                onClick={() => setFiltersOpen(false)}
                className="w-full bg-primary text-primary-foreground py-3 rounded-xl text-sm font-medium mt-2"
              >
                Show {filtered.length} results
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick view modal */}
      <AnimatePresence>
        {quick && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setQuick(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="relative bg-background rounded-2xl overflow-hidden max-w-3xl w-full grid md:grid-cols-2 max-h-[90vh]"
            >
              <button
                onClick={() => setQuick(null)}
                aria-label="Close"
                className="absolute top-3 right-3 z-10 h-9 w-9 rounded-full bg-background/90 flex items-center justify-center"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="bg-secondary aspect-square md:aspect-auto">
                <img
                  src={quick.img}
                  alt={quick.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-7 overflow-y-auto">
                <span className="text-[0.65rem] uppercase tracking-wider text-gold">
                  {quick.category}
                </span>
                <h3 className="font-display text-2xl mt-1">{quick.name}</h3>
                <div className="flex items-center gap-1 mt-2 text-sm text-muted-foreground">
                  <Star className="h-4 w-4 fill-gold text-gold" />{" "}
                  {quick.rating} <span>&#183; {quick.reviews} reviews</span>
                </div>
                <div className="flex items-baseline gap-2 mt-4">
                  <span className="text-2xl font-semibold">
                    &#8377;{quick.price.toLocaleString("en-IN")}
                  </span>
                  {quick.mrp > quick.price && (
                    <span className="text-muted-foreground line-through">
                      &#8377;{quick.mrp.toLocaleString("en-IN")}
                    </span>
                  )}
                </div>
                <dl className="mt-5 grid grid-cols-2 gap-y-2 text-sm">
                  {[
                    ["Material", quick.material],
                    ["Theme", quick.theme],
                    ["Color", quick.color],
                    ["Occasion", quick.occasion],
                  ].map(([k, v]) => (
                    <React.Fragment key={k}>
                      <dt className="text-muted-foreground">{k}</dt>
                      <dd>{v}</dd>
                    </React.Fragment>
                  ))}
                </dl>
                <p
                  className={`mt-4 text-sm font-medium ${quick.inStock ? "text-leaf" : "text-destructive"}`}
                >
                  {quick.inStock
                    ? "In stock · Made to order"
                    : "Currently out of stock"}
                </p>
                <div className="flex gap-2 mt-6">
                  <Link
                    to={`/product/${quick.id}`}
                    className="flex-1 bg-primary text-primary-foreground py-3 rounded-xl text-sm font-medium text-center hover:opacity-90 transition"
                  >
                    Customize & Buy
                  </Link>
                  <button
                    onClick={() => toggleId(wishlist, setWishlist, quick)}
                    aria-label="Wishlist"
                    className={`h-12 w-12 rounded-xl border border-border flex items-center justify-center ${wishlist.some((w) => w.id === quick.id) ? "text-gold" : ""}`}
                  >
                    <Heart
                      className={`h-5 w-5 ${wishlist.some((w) => w.id === quick.id) ? "fill-gold" : ""}`}
                    />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Compare bar */}
      <AnimatePresence>
        {compare.length > 0 && (
          <motion.div
            initial={{ y: 80 }}
            animate={{ y: 0 }}
            exit={{ y: 80 }}
            className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-primary text-primary-foreground rounded-2xl shadow-xl px-4 py-3 flex items-center gap-4 max-w-[95vw]"
          >
            <GitCompare className="h-5 w-5 shrink-0" />
            <span className="text-sm">{compare.length} to compare</span>
            <button
              onClick={() => setShowCompare(true)}
              className="bg-gold text-primary text-sm font-medium px-4 py-1.5 rounded-lg"
            >
              Compare
            </button>
            <button
              onClick={() => setCompare([])}
              aria-label="Clear compare"
              className="opacity-70 hover:opacity-100"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Compare modal */}
      <AnimatePresence>
        {showCompare && compare.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowCompare(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="relative bg-background rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-auto"
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-display text-2xl">Compare products</h3>
                <button
                  onClick={() => setShowCompare(false)}
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div
                className="grid gap-4"
                style={{
                  gridTemplateColumns: `140px repeat(${compare.length}, minmax(0,1fr))`,
                }}
              >
                <div />
                {compare.map((p) => (
                  <div key={p.id}>
                    <div className="aspect-square rounded-xl overflow-hidden bg-secondary mb-2">
                      <img
                        src={p.img}
                        alt={p.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <p className="font-display leading-snug text-sm">
                      {p.name}
                    </p>
                  </div>
                ))}
                {[
                  ["Price", (p) => `\u20B9${p.price.toLocaleString("en-IN")}`],
                  ["Rating", (p) => `${p.rating} (${p.reviews})`],
                  ["Material", (p) => p.material],
                  ["Theme", (p) => p.theme],
                  ["Color", (p) => p.color],
                  ["Occasion", (p) => p.occasion],
                  [
                    "Availability",
                    (p) => (p.inStock ? "In stock" : "Out of stock"),
                  ],
                ].map(([label, fn]) => (
                  <React.Fragment key={label}>
                    <div className="text-sm text-muted-foreground border-t border-border py-3">
                      {label}
                    </div>
                    {compare.map((p) => (
                      <div
                        key={p.id}
                        className="text-sm border-t border-border py-3"
                      >
                        {fn(p)}
                      </div>
                    ))}
                  </React.Fragment>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShopPage;
