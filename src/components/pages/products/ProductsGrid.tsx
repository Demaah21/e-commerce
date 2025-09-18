"use client";

import { fetchProducts } from "@/services/products";
import { IProductCard } from "@/shared/types";
import { useEffect, useState } from "react";
import ProductCard from "@/components/cards/product_card/ProductCard";

export default function ProductsGrid({
  categoryId,
  brandId,
}: {
  categoryId?: string;
  brandId?: string;
}) {
  const [products, setProducts] = useState<IProductCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts(categoryId, brandId);
        setProducts(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, [categoryId, brandId]);

  if (loading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (products.length === 0) {
    return <div className="text-center text-lg">No products found.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 p-4">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
}