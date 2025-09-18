"use client";

import ProductSwiper from "@/components/swiper/ProductSwiper";
import { fetchProducts } from "@/services/products";
import { IProductCard } from "types";
import { useEffect, useState, RefObject } from "react";
import "swiper/css/grid";

interface CustomSwiperProps {
  prevEl: RefObject<HTMLButtonElement>;
  nextEl: RefObject<HTMLButtonElement>;
}

export default function CustomSwiper({ prevEl, nextEl }: CustomSwiperProps) {
  const [products, setProducts] = useState<IProductCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, [prevEl, nextEl]);

  if (loading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <ProductSwiper
      swiperProps={{
        slidesPerView: 5,
        spaceBetween: 20,
        navigation: {
          prevEl: prevEl.current,
          nextEl: nextEl.current,
        },
        breakpoints: {
          1: {
            slidesPerView: 4,
          },
          1280: {
            slidesPerView: 4,
          },
          1536: {
            slidesPerView: 5,
          },
        },
      }}
      data={products}
    />
  );
}
