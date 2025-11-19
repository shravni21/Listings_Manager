import { Link } from "react-router-dom";

export default function ErrorState() {
  return (
    <div style={styles.wrapper}>
      <h2 style={{ color: "#dc2626" }}>Something went wrong</h2>
      <p>Could not load the product details.</p>

      <Link to="/" style={styles.link}>
        ← Back to products
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
    display: "inline-block",
    marginTop: 10,
    color: "#2563eb",
    textDecoration: "none",
  },
};
