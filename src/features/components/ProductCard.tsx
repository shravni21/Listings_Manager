import React from "react";

export interface ProductCardProps {
    badge?: string | null;
    image?: string;
    category?: string;
    title?: string;
    desc?: string;
    feats?: string[];
    oldPrice?: string;
    newPrice?: string;
    reviews?: string;
    stock?: string;
    productId?: string | number;
}

const ProductCard: React.FC<ProductCardProps> = ({
    badge = "HOT SALE",
    image,
    category = "Product",
    title = "Product Name",
    desc = "No description available.",
    feats = ["Great Value"],
    oldPrice,
    newPrice = "—",
    reviews = "0 Reviews",
    stock = "In Stock",
    productId,
}) => {
    return (
        <div className="card" role="article" aria-label={title}>
            {badge ? <div className="badge">{badge}</div> : null}

            <div className="tilt">
                <div className="img">
                    <img src={image} alt={title} />
                </div>
            </div>

            <div className="info">
                <div className="cat">{category}</div>

                {/* ⭐ TITLE + INLINE VIEW DETAILS BUTTON */}
                <div className="title-row">
                    <h2 className="title">{title}</h2>
                    <a className="title-details-btn" href={`/products/${productId}`}>
                        View →
                    </a>
                </div>

                <p className="desc">{desc}</p>

                <div className="feats">
                    {feats.map((f, i) => (
                        <span key={i} className="feat">
                            {f}
                        </span>
                    ))}
                </div>

                <div className="bottom">
                    <div className="price">
                        {oldPrice ? <span className="old">{oldPrice}</span> : null}
                        <span className="new">{newPrice}</span>
                    </div>

                    <button className="btn" aria-label={`Add ${title} to cart`}>
                        <span>Add to Cart</span>
                        <svg
                            className="icon"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            aria-hidden
                        >
                            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4" />
                            <line x1="3" y1="6" x2="21" y2="6" />
                            <path d="M16 10a4 4 0 01-8 0" />
                        </svg>
                    </button>
                </div>

                <div className="meta">
                    <div className="rating" aria-hidden>
                        {Array.from({ length: 5 }).map((_, i) => (
                            <svg
                                key={i}
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="#FFD700"
                                stroke="#FFD700"
                                strokeWidth={0.5}
                            >
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                            </svg>
                        ))}
                        <span className="rcount">{reviews}</span>
                    </div>

                    <div
                        className="stock"
                        style={{ color: stock === "In Stock" ? "#22C55E" : "#EF4444" }}
                    >
                        {stock}
                    </div>
                </div>
            </div>

            <style>{`
        .card {
          width: 250px;
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          transition: transform .18s, box-shadow .18s;
          font-family: 'Segoe UI', sans-serif;
          margin: 8px auto;
          overflow: hidden;
          position: relative;
        }
        .card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 18px rgba(0,0,0,0.12);
        }

        .badge {
          position: absolute;
          top: 8px;
          right: 8px;
          background: linear-gradient(90deg,#A90329,#C44848);
          color: #fff;
          padding: 4px 8px;
          font-size: 10px;
          font-weight: 700;
          border-radius: 8px;
          z-index: 10;
        }

        .img {
          height: 140px;
          overflow: hidden;
          background: #f6f6f6;
          display:flex;
          align-items:center;
          justify-content:center;
        }
        .img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform .4s;
        }
        .card:hover .img img {
          transform: scale(1.04);
        }

        .info { padding: 12px; }
        .cat {
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          color: #6b7280;
          margin-bottom: 6px;
        }

        /* ⭐ TITLE + INLINE DETAILS LINK */
        .title-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 6px;
        }

        .title {
          font-size: 15px;
          font-weight: 700;
          color: #111827;
          margin: 0;
        }

        .title-details-btn {
          font-size: 12px;
          font-weight: 600;
          color: #5b30c7ff;
          text-decoration: none;
          padding: 2px 6px;
          border-radius: 4px;
          transition: background .2s, transform .2s;
        }

        .title-details-btn:hover {
          background: #f3eaff;
          transform: translateY(-1px);
        }

        .desc {
          font-size: 12px;
          color: #4b5563;
          margin-bottom: 8px;
          min-height: 34px;
        }

        .feats { display:flex; gap:6px; margin-bottom: 8px; flex-wrap:wrap; }
        .feat {
          font-size: 10px;
          background: #f3f4f6;
          color: #4b5563;
          padding: 3px 7px;
          border-radius: 8px;
          font-weight: 600;
        }

        .bottom {
          display:flex;
          justify-content:space-between;
          align-items:center;
          margin-bottom: 8px;
        }
        .price { display:flex; flex-direction:column; }
        .old {
          font-size: 12px;
          text-decoration: line-through;
          color: #9ca3af;
        }
        .new {
          font-size: 17px;
          font-weight: 800;
          color: #111827;
        }

        .btn {
          background: #111827;
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 6px 10px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          display:flex;
          align-items:center;
          gap:6px;
        }

        .btn:hover { transform: translateY(-2px); }

        .meta {
          display:flex;
          justify-content:space-between;
          align-items:center;
          border-top:1px solid #f3f4f6;
          padding-top:8px;
        }
        .rating {
          display:flex;
          align-items:center;
          gap:4px;
        }
        .rcount {
          margin-left:6px;
          font-size:11px;
          color:#6b7280;
        }
        .stock {
          font-size:11px;
          font-weight:700;
        }
      `}</style>
        </div>
    );
};

export default ProductCard;
