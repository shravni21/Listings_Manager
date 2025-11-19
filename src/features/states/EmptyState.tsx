import { Link } from "react-router-dom";

export default function EmptyState() {
  return (
    <div style={styles.wrapper}>
      <h2>Product Not Found</h2>
      <p>The product you're looking for doesn't exist.</p>

      <Link to="/" style={styles.link}>
        ← Go back to products
      </Link>
    </div>
  );
}

const styles = {
  wrapper: {
    padding: 40,
    textAlign: "center" as const,
  },
  link: {
    marginTop: 12,
    display: "inline-block",
    color: "#2563eb",
    textDecoration: "none",
  },
};
