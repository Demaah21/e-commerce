"use client";

import { IBrandSwiper } from "types";
import { Swiper, SwiperSlide } from "swiper/react";
import BrandCard from "../cards/brand_card";
import "swiper/css";
import { Navigation } from "swiper/modules";

export default function BrandSwiper({
  data,
  swiperProps,
  prevEl,
  nextEl,
}: IBrandSwiper) {
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
            <BrandCard {...item} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}