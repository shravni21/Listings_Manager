import React from "react";

export default function LoadingState() {
  return (
    <div style={styles.wrapper}>
      <div style={styles.loader} />
      <p style={styles.text}>Loading product details...</p>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    padding: 40,
    textAlign: "center",
    minHeight: 250,
  },
  loader: {
    width: 40,
    height: 40,
    margin: "0 auto 14px",
    border: "4px solid #e5e7eb",
    borderTopColor: "#6366f1",
    borderRadius: "50%",
    animation: "spin .7s linear infinite",
  },
  text: {
    color: "#6b7280",
  },
};
