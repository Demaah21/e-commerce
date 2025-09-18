"use client";

import ArrowButton from "@/components/buttons/arrow_button/ArrowButton";
import BrandSwiper from "@/components/swiper/BrandSwiper";
import SectionDescription from "@/components/titles/SectionDescription";
import SectionTitle from "@/components/titles/SectionTitle";
import { IBrandCard } from "types";
import { useEffect, useState, useRef } from "react";

export default function BrandsSection() {
  const [brands, setBrands] = useState<IBrandCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch(
          "https://ecommerce.routemisr.com/api/v1/brands"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        const formattedBrands: IBrandCard[] = result.data.map(
          (brand: any) => ({
            _id: brand._id,
            title: brand.name,
            image: brand.image,
          })
        );
        setBrands(formattedBrands);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  if (loading) {
    return <div>Loading brands...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section className="flex flex-col gap-7 border-b border-color-divider pb-14">
      <SectionTitle text="brands" />
      <div className="flex items-center justify-between">
        <SectionDescription text="Browse by brand" />
        <div className="flex items-center gap-2">
          <ArrowButton direction="left" ref={prevRef} />
          <ArrowButton direction="right" ref={nextRef} />
        </div>
      </div>
      <div className="my-10">
        <BrandSwiper
          data={brands}
          prevEl={prevRef.current}
          nextEl={nextRef.current}
          swiperProps={{
            slidesPerView: 6,
            spaceBetween: 60,
            breakpoints: {
              1: {
                slidesPerView: 5,
              },
              1280: {
                slidesPerView: 5,
              },
              1536: {
                slidesPerView: 6,
              },
            },
          }}
        />
      </div>
    </section>
  );
}