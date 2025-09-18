"use client";

import SectionTitle from "@/components/titles/SectionTitle";
import ProductsGrid from "@/components/pages/products/ProductsGrid";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchCategoryById, fetchBrandById } from "@/services/products";

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId");
  const brandId = searchParams.get("brandId");

  const [title, setTitle] = useState("All Products");
  const [loadingTitle, setLoadingTitle] = useState(true);

  useEffect(() => {
    const fetchTitle = async () => {
      setLoadingTitle(true);
      if (categoryId) {
        try {
          const category = await fetchCategoryById(categoryId);
          setTitle(`Products in ${category.name}`);
        } catch (error) {
          console.error("Error fetching category name:", error);
          setTitle("Products");
        }
      } else if (brandId) {
        try {
          const brand = await fetchBrandById(brandId);
          setTitle(`Products by ${brand.name}`);
        } catch (error) {
          console.error("Error fetching brand name:", error);
          setTitle("Products");
        }
      } else {
        setTitle("All Products");
      }
      setLoadingTitle(false);
    };

    fetchTitle();
  }, [categoryId, brandId]);

  return (
    <section className="flex flex-col gap-7 py-10">
      <SectionTitle text={loadingTitle ? "Loading..." : title} />
      <ProductsGrid categoryId={categoryId || undefined} brandId={brandId || undefined} />
    </section>
  );
}