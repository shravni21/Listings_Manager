import { useEffect, useMemo, useState } from "react";
import productsData from "../mocks/data/products.json";

export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
  description?: string;
  imageUrl?: string;
  features?: string[];
  oldPrice?: number;
  reviews?: number;
};

export type ProductListResponse = {
  items: Product[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

export function useProducts(
  page = 1,
  pageSize = 8,
  category = "",
  search = ""
) {
  const [data, setData] = useState<ProductListResponse | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setErrorObj] = useState<Error | null>(null);

  const allProducts: Product[] = useMemo(() => {
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

    return (productsData as any[]).map((p: any) => {
      const categoryKey = String(p.category ?? ""); 
      const imageFromMap = imageMap[categoryKey] ?? "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&auto=format&fit=crop&q=80";
      const featsFromMap = featMap[categoryKey] ?? ["Great Value"];

      return {
        id: String(p.id),
        name: String(p.name),
        price: Number(p.price),
        category: categoryKey,
        inStock: Boolean(p.inStock),
        description: p.description ?? undefined,
        imageUrl: p.image ?? imageFromMap,
        features: p.features ?? featsFromMap,
        oldPrice: p.oldPrice ?? Math.round(Number(p.price) * 1.25),
        reviews: p.reviews ?? 100 + Math.floor(Math.random() * 400),
      } as Product;
    });
  }, []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setIsError(false);
    setErrorObj(null);

    const t = setTimeout(() => {
      try {
        let filtered = allProducts;
        if (category) {
          filtered = filtered.filter(
            (it) => it.category.toLowerCase() === category.toLowerCase()
          );
        }
        if (search) {
          const s = search.toLowerCase();
          filtered = filtered.filter(
            (it) =>
              it.name.toLowerCase().includes(s) ||
              (it.description ?? "").toLowerCase().includes(s)
          );
        }

        const total = filtered.length;
        const totalPages = Math.max(1, Math.ceil(total / pageSize));
        const normalizedPage = Math.min(Math.max(1, page), totalPages);

        const start = (normalizedPage - 1) * pageSize;
        const items = filtered.slice(start, start + pageSize);

        const resp: ProductListResponse = {
          items,
          page: normalizedPage,
          pageSize,
          total,
          totalPages,
        };

        if (!cancelled) {
          setData(resp);
          setLoading(false);
        }
      } catch (err: unknown) {
        if (!cancelled) {
          setIsError(true);
          setErrorObj(err instanceof Error ? err : new Error(String(err)));
          setLoading(false);
        }
      }
    }, 350);

    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [page, pageSize, category, search, allProducts]);

  return { data, isLoading, isError, error };
}
