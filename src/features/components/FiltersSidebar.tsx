import React from "react";

export type SortOption =
  | "relevance"
  | "price_asc"
  | "price_desc"
  | "name_asc"
  | "name_desc";

export interface FiltersSidebarProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  showAllLabel?: string;

  sortBy?: SortOption;
  onChangeSort?: (s: SortOption) => void;
  showSortLabel?: string;

  onClear?: () => void;
}

const styles = {
  root: {
    width: 280,
    padding: 20,
    background: "#ffffff",
    borderRadius: 12,
    boxShadow: "0 6px 20px rgba(16,24,40,0.08)",
    fontFamily:
      "Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
    color: "#0f172a",
  } as React.CSSProperties,
  headerRow: {
    display: "flex",
    gap: 10,
    alignItems: "center",
    marginBottom: 10,
  } as React.CSSProperties,
  title: {
    fontSize: 16,
    fontWeight: 700,
    margin: 0,
    lineHeight: 1,
  } as React.CSSProperties,
  subtitle: {
    fontSize: 12,
    color: "#475569",
    marginTop: 4,
  } as React.CSSProperties,
  divider: {
    height: 1,
    background:
      "linear-gradient(90deg, rgba(234,236,239,1) 0%, rgba(237,242,255,1) 100%)",
    margin: "12px 0",
    borderRadius: 1,
  } as React.CSSProperties,
  categoryButton: (active = false) =>
    ({
      display: "block",
      width: "100%",
      textAlign: "left",
      padding: "8px 10px",
      borderRadius: 8,
      border: "none",
      background: active
        ? "linear-gradient(90deg,#EEF2FF,#E8EEFF)"
        : "transparent",
      color: active ? "#1e293b" : "#0f172a",
      fontWeight: active ? 700 : 600,
      fontSize: 13,
      cursor: "pointer",
      transition: "background 160ms ease, transform 120ms ease",
    } as React.CSSProperties),
  buttonRow: {
    marginTop: 14,
    display: "flex",
    gap: 8,
  } as React.CSSProperties,
  clearBtn: {
    flex: 1,
    padding: "10px 12px",
    borderRadius: 10,
    border: "1px solid #E6E9EE",
    background: "#FFFFFF",
    cursor: "pointer",
    fontWeight: 700,
    fontSize: 13,
    transition: "transform 120ms ease, box-shadow 120ms ease",
  } as React.CSSProperties,
  primaryBtn: {
    padding: "10px 14px",
    borderRadius: 10,
    border: "none",
    background: "linear-gradient(180deg,#0f172a,#07102a)",
    color: "#fff",
    cursor: "pointer",
    fontWeight: 700,
    fontSize: 13,
    boxShadow: "0 6px 14px rgba(11,22,68,0.12)",
    transition: "transform 120ms ease, box-shadow 120ms ease",
  } as React.CSSProperties,
  sortSelect: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 8,
    border: "1px solid #E6E9EE",
    fontSize: 13,
    outline: "none",
    appearance: "none",
    background: "#fff",
  } as React.CSSProperties,
  showAllRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  } as React.CSSProperties,
  showAllBtn: (active = false) =>
    ({
      cursor: "pointer",
      padding: "8px 10px",
      borderRadius: 8,
      background: active
        ? "linear-gradient(90deg,#EEF2FF,#E8EEFF)"
        : "transparent",
      fontWeight: active ? 700 : 600,
      color: active ? "#1e293b" : "#0f172a",
      border: "none",
      fontSize: 13,
    } as React.CSSProperties),
};

function IconFilters() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M3 5h18"
        stroke="#94A3B8"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 12h10"
        stroke="#94A3B8"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 19h4"
        stroke="#94A3B8"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function FiltersSidebar({
  categories,
  selectedCategory,
  onSelectCategory,
  showAllLabel = "All categories",
  sortBy = "relevance",
  onChangeSort,
  showSortLabel = "Sort by",
  onClear,
}: FiltersSidebarProps) {
  const handleClear = () => {
    onSelectCategory("");
    onChangeSort && onChangeSort("relevance");
    onClear && onClear();
  };

  return (
    <aside style={styles.root} aria-labelledby="filters-heading">
      <div style={styles.headerRow}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              background: "linear-gradient(180deg,#F1F5F9,#FFFFFF)",
              display: "grid",
              placeItems: "center",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.6)",
            }}
          >
            <IconFilters />
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <h4 id="filters-heading" style={styles.title}>
            Filters
          </h4>
          <div style={styles.subtitle}>
            Refine products by sort order and category
          </div>
        </div>
      </div>

      <div style={styles.divider} />

      {/* --- SORT (moved to top) --- */}
      <div style={{ marginBottom: 12 }}>
        <label
          htmlFor="sort-select"
          style={{
            display: "block",
            fontSize: 13,
            marginBottom: 8,
            color: "#475569",
            fontWeight: 700,
          }}
        >
          {showSortLabel}
        </label>

        <select
          id="sort-select"
          value={sortBy}
          onChange={(e) => onChangeSort && onChangeSort(e.target.value as SortOption)}
          style={styles.sortSelect}
          aria-label="Sort products"
        >
          <option value="relevance">Relevance</option>
          <option value="price_asc">Price: Low → High</option>
          <option value="price_desc">Price: High → Low</option>
          <option value="name_asc">Name: A → Z</option>
          <option value="name_desc">Name: Z → A</option>
        </select>
      </div>

      {/* --- SHOW ALL + CATEGORY SELECT (after sort) --- */}
      <div style={styles.showAllRow}>
        <button
          onClick={() => onSelectCategory("")}
          style={styles.showAllBtn(selectedCategory === "")}
          aria-pressed={selectedCategory === ""}
        >
          {showAllLabel}
        </button>
        <div style={{ marginLeft: "auto", fontSize: 12, color: "#64748b" }}>
          {categories.length} categories
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 12 }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            style={{
              ...styles.categoryButton(selectedCategory === cat),
            }}
            aria-pressed={selectedCategory === cat}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
          >
            {cat}
          </button>
        ))}
      </div>

      <div style={styles.buttonRow}>
        <button
          onClick={handleClear}
          style={styles.clearBtn}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.boxShadow =
              "0 8px 20px rgba(2,6,23,0.06)";
            (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
            (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
          }}
          aria-label="Clear filters and reset sorting"
        >
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="#0f172a"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Clear
          </span>
        </button>

        <button
          style={styles.primaryBtn}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
            (e.currentTarget as HTMLButtonElement).style.boxShadow =
              "0 10px 30px rgba(8,17,48,0.18)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
            (e.currentTarget as HTMLButtonElement).style.boxShadow =
              "0 6px 14px rgba(11,22,68,0.12)";
          }}
        >
          Done
        </button>
      </div>
    </aside>
  );
}
