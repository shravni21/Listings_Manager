import React, { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import productsData from "../../mocks/data/products.json";


export default function ProductDetails() {
  const { id } = useParams();

  // Same mapping as useProducts
  const imageMap: Record<string, string> = {
    Electronics:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1200&auto=format&fit=crop&q=80",
    Home:
      "https://images.unsplash.com/photo-1503602642458-232111445657?w=1200&auto=format&fit=crop&q=80",
    Clothing:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1200&auto=format&fit=crop&q=80",
    Books:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=1200&auto=format&fit=crop&q=80",
  };

  const featMap: Record<string, string[]> = {
    Electronics: ["1-Year Warranty", "Fast Charging", "Latest Gen"],
    Home: ["Top Quality", "Durable", "Lightweight"],
    Clothing: ["Premium Fabric", "Soft Touch", "Breathable"],
    Books: ["Bestseller", "High Rating", "Trending"],
  };

  // Direct product from JSON
  const baseProduct = (productsData as any[]).find(
    (p) => String(p.id) === String(id)
  );

  // Apply mapped image + features (same as useProducts)
  const product = useMemo(() => {
    if (!baseProduct) return null;

    const categoryKey = String(baseProduct.category ?? "");
    const finalImage =
      imageMap[categoryKey] ??
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&auto=format&fit=crop&q=80";

    const finalFeats = featMap[categoryKey] ?? ["Great Value"];

    return {
      ...baseProduct,
      imageUrl: baseProduct.image ?? finalImage,
      features: baseProduct.features ?? finalFeats,
      oldPrice: baseProduct.oldPrice ?? Math.round(Number(baseProduct.price) * 1.25),
      reviews: baseProduct.reviews ?? 100 + Math.floor(Math.random() * 400),
    };
  }, [baseProduct]);

  if (!product) {
    return (
      <div style={{ padding: 30 }}>
        <h2>Product Not Found</h2>
        <Link to="/" style={{ textDecoration: "underline", color: "#2563eb" }}>
          Go Back
        </Link>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        
        {/* IMAGE */}
        <div style={styles.imageBox}>
          <img src={product.imageUrl} alt={product.name} style={styles.image} />
        </div>

        {/* INFO */}
        <div style={styles.info}>
          <Link to="/" style={styles.backBtn}>
            ← Back to Products
          </Link>

          <h1 style={styles.title}>{product.name}</h1>

          <div style={styles.category}>{product.category}</div>

          <div style={styles.priceRow}>
            <span style={styles.price}>₹{product.price}</span>
            <span
              style={{
                ...styles.stock,
                color: product.inStock ? "#22C55E" : "#EF4444",
              }}
            >
              {product.inStock ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          <p style={styles.desc}>{product.description}</p>

          <div style={styles.feats}>
            {product.features.map((f: string, i: number) => (
              <span key={i} style={styles.feat}>
                {f}
              </span>
            ))}
          </div>

          <button style={styles.cartBtn}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    padding: "40px 20px",
    background: "linear-gradient(135deg,#f5f7fa 0%, #ffffff 100%)",
    minHeight: "100vh",
  },
  container: {
    display: "flex",
    gap: 32,
    maxWidth: 1100,
    margin: "0 auto",
    background: "#fff",
    padding: 24,
    borderRadius: 14,
    boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
  },
  imageBox: {
    width: 420,
    height: 420,
    borderRadius: 14,
    overflow: "hidden",
    background: "#f3f4f6",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  info: {
    flex: 1,
  },
  backBtn: {
    display: "inline-block",
    textDecoration: "none",
    color: "#2563eb",
    marginBottom: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: 800,
  },
  category: {
    marginTop: 6,
    fontSize: 13,
    color: "#6b7280",
    fontWeight: 700,
    textTransform: "uppercase",
  },
  priceRow: {
    marginTop: 12,
    display: "flex",
    alignItems: "center",
    gap: 16,
  },
  price: {
    fontSize: 28,
    fontWeight: 800,
  },
  desc: {
    marginTop: 12,
    fontSize: 16,
    color: "#374151",
    lineHeight: 1.6,
    maxWidth: 600,
  },
  feats: {
    display: "flex",
    marginTop: 16,
    gap: 8,
    flexWrap: "wrap",
  },
  feat: {
    padding: "6px 10px",
    background: "#eef2ff",
    borderRadius: 8,
    fontSize: 13,
    color: "#4338ca",
    fontWeight: 600,
  },
  stock: {
    fontSize: 14,
    fontWeight: 700,
  },
  cartBtn: {
    marginTop: 20,
    background: "#111827",
    color: "#fff",
    padding: "12px 24px",
    fontSize: 15,
    fontWeight: 700,
    borderRadius: 8,
    border: "none",
    cursor: "pointer",
  },
};
