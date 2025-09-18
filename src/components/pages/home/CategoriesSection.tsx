"use client";

import ArrowButton from "@/components/buttons/arrow_button/ArrowButton";
import CategorySwiper from "@/components/swiper/CategorySwiper";
import SectionDescription from "@/components/titles/SectionDescription";
import SectionTitle from "@/components/titles/SectionTitle";
import { ICategoryCard } from "types";
import { useEffect, useState, useRef } from "react"; // Import useRef

export default function CategoriesSection() {
  const [categories, setCategories] = useState<ICategoryCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const prevRef = useRef<HTMLButtonElement>(null); // Create ref for prev button
  const nextRef = useRef<HTMLButtonElement>(null); // Create ref for next button

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://ecommerce.routemisr.com/api/v1/categories"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        const formattedCategories: ICategoryCard[] = result.data.map(
          (category: any) => ({
            _id: category._id,
            title: category.name,
            image: category.image,
          })
        );
        setCategories(formattedCategories);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <div>Loading categories...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section className="flex flex-col gap-7 border-b border-color-divider pb-14">
      <SectionTitle text="categories" />
      <div className="flex items-center justify-between">
        <SectionDescription text="Browse by category" />
        <div className="flex items-center gap-2">
          <ArrowButton direction="left" ref={prevRef} /> {/* Assign ref */}
          <ArrowButton direction="right" ref={nextRef} /> {/* Assign ref */}
        </div>
      </div>
      <div className="my-10">
        <CategorySwiper
          data={categories}
          prevEl={prevRef.current} // Pass ref.current
          nextEl={nextRef.current} // Pass ref.current
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
