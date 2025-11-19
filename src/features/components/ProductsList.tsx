import React, { useEffect, useMemo, useState } from "react";
import { useProducts } from "../../api/useProducts";
import ProductCard from "../components/ProductCard";
import FiltersSidebar, { type SortOption } from "../components/FiltersSidebar";
import useDebounce from "../../api/useDebounce";
import NavBar from "../components/NavBar";
import productsData from "../../mocks/data/products.json";
import Pagination from "./Pagination";

// STATE COMPONENTS
import LoadingState from "../states/LoadingState";
import ErrorState from "../states/ErrorState";
import EmptyState from "../states/EmptyState";

export default function ProductsList() {
  const [search, setSearch] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [sortBy, setSortBy] = useState<SortOption>("relevance");

  const [page, setPage] = useState<number>(1);
  const pageSize = 8;

  const debouncedSearch = useDebounce(search, 300);

  const { data, isLoading, isError, error } = useProducts(
    page,
    pageSize,
    category,
    debouncedSearch
  );

  const categories = useMemo(() => {
    const set = new Set<string>();
    (productsData as any[]).forEach((p) => p.category && set.add(p.category));
    return Array.from(set);
  }, []);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, category]);

  const onPageChange = (p: number) => {
    const normalized = Math.max(1, Math.min(p, data?.totalPages ?? 1));
    setPage(normalized);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const sortedItems = useMemo(() => {
    if (!data?.items) return [];

    const items = [...data.items];

    switch (sortBy) {
      case "price_asc":
        items.sort((a, b) => Number(a.price) - Number(b.price));
        break;
      case "price_desc":
        items.sort((a, b) => Number(b.price) - Number(a.price));
        break;
      case "name_asc":
        items.sort((a, b) => String(a.name).localeCompare(String(b.name)));
        break;
      case "name_desc":
        items.sort((a, b) => String(b.name).localeCompare(String(a.name)));
        break;
      case "relevance":
      default:
        break;
    }

    return items;
  }, [data?.items, sortBy]);

  // -------------------------
  // HANDLE STATES
  // -------------------------

  if (isLoading) return <LoadingState />;
  if (isError) return <ErrorState />;
  if (!data || data.items.length === 0) return <EmptyState />;

  // -------------------------
  // SUCCESS UI
  // -------------------------

  return (
    <div
      style={{
        padding: 16,
        background: "linear-gradient(135deg, #e7eef8 0%, #fff 100%)",
        minHeight: "100vh",
      }}
    >
      <NavBar search={search} onSearchChange={setSearch} cartCount={0} />

      <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
        <FiltersSidebar
          categories={categories}
          selectedCategory={category}
          onSelectCategory={setCategory}
          sortBy={sortBy}
          onChangeSort={setSortBy}
          onClear={() => {
            setCategory("");
            setSortBy("relevance");
            setSearch("");
            setPage(1);
          }}
        />

        <main style={{ flex: 1 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 12,
            }}
          >
            <h2 style={{ margin: "0 0 12px 0" }}>
              Products (page {data.page} / {data.totalPages})
            </h2>

            <div style={{ marginLeft: 12, fontSize: 13, color: "#374151" }}>
              Sorted: {sortBy.replace("_", " ")}
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: 16,
              justifyItems: "center",
            }}
          >
            {sortedItems.map((p) => (
              <ProductCard
                key={p.id}
                productId={p.id}
                badge={!p.inStock ? "OUT OF STOCK" : undefined}
                image={p.imageUrl}
                category={p.category}
                title={p.name}
                desc={p.description}
                newPrice={`₹${p.price}`}
                oldPrice={`₹${Math.round(Number(p.price) * (1.1 + Math.random() * 0.3))}`}   
                reviews={`${Math.floor(Math.random() * 400) + 100} Reviews`}   
                feats={["Great Value", "Top Rated", "Fast Delivery"].sort(() => 0.5 - Math.random()).slice(0, 2)}   
                stock={p.inStock ? "In Stock" : "Out of Stock"}
              />
            ))}
          </div>

          <div style={{ marginTop: 20 }}>
            <Pagination
              currentPage={data.page}
              totalPages={data.totalPages}
              onPageChange={onPageChange}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
