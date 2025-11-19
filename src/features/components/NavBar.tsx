import SearchBar from "./SearchBar";

interface NavBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  cartCount?: number;
}

export default function NavBar({ search, onSearchChange, cartCount = 0 }: NavBarProps) {
  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 24,
        padding: "14px 24px",
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
        marginBottom: 20,
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      {/* Logo */}
      <div
        style={{
          fontWeight: 700,
          fontSize: 22,
          letterSpacing: "0.5px",
          color: "#111827",
          cursor: "pointer",
        }}
      >
        Listings <span style={{ color: "#6366F1" }}>Manager</span>
      </div>

      {/* Search */}
      <div style={{ flex: 1, maxWidth: 650 }}>
        <SearchBar value={search} onChange={onSearchChange} />
      </div>

      {/* Cart */}
      <div
        style={{
          position: "relative",
          cursor: "pointer",
          padding: 8,
          borderRadius: 8,
          transition: "0.2s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#F3F4F6")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
      >
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#1F2937"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.7 13.3a2 2 0 002 1.7h9.6a2 2 0 001.9-1.4l3.3-9.6H6"></path>
        </svg>

        {cartCount > 0 && (
          <span
            style={{
              position: "absolute",
              top: -4,
              right: -4,
              background: "#DC2626",
              color: "#fff",
              fontSize: 10,
              padding: "3px 6px",
              borderRadius: "50%",
              fontWeight: 700,
              minWidth: 18,
              textAlign: "center",
            }}
          >
            {cartCount}
          </span>
        )}
      </div>
    </nav>
  );
}
