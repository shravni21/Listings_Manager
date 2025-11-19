export interface SearchBarProps {
  value: string;
  onChange: (next: string) => void;
  placeholder?: string;
}

export default function SearchBar({ value, onChange, placeholder = "Search products..." }: SearchBarProps) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "8px 12px",
      background: "#fff",
      borderRadius: 8,
      boxShadow: "0 1px 6px rgba(16,24,40,0.06)",
      minWidth: 280,
      maxWidth: 720,
      width: "100%"
    }}>
      <svg height="18" width="18" viewBox="0 0 24 24" aria-hidden style={{ opacity: .75 }}>
        <path fill="currentColor" d="M21 20l-5.6-5.6a7 7 0 10-1.4 1.4L20 21zM5 10a5 5 0 115 5 5 5 0 01-5-5z" />
      </svg>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          border: "none",
          outline: "none",
          fontSize: 14,
          width: "100%",
          background: "transparent"
        }}
      />
    </div>
  );
}
