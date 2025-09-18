"use client";

import { ICategorySwiper } from "types";
import { Swiper, SwiperSlide } from "swiper/react";
import CategoryCard from "../cards/category_card";
import "swiper/css";
import { Navigation } from "swiper/modules";

export default function CategorySwiper({
  data,
  swiperProps,
  prevEl,
  nextEl,
}: ICategorySwiper) {
  return (
    <Swiper
      {...swiperProps}
      modules={[Navigation]}
      navigation={{
        prevEl: prevEl,
        nextEl: nextEl,
      }}
    >
      {data.map((item, i) => {
        return (
          <SwiperSlide key={i}>
            <CategoryCard {...item} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
