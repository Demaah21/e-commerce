"use client";

import AboutEmployeeCard from "@/components/cards/about_employee_card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { IAboutEmployeeCard } from "@/shared/types";

export default function AboutEmployeesSwiper() {
  const employees = [
    {
      name: "Tom Cruise",
      position: "Founder & Chairman",
      image: "/employee-1.webp",
      status: "active",
      href: {
        twitter: "/",
        instagram: "/",
        linkedin: "/",
      },
    },
    {
      name: "Emma Watson",
      position: "Managing Director",
      image: "/employee-2.webp",
      status: "active",
      href: {
        twitter: "/",
        instagram: "/",
        linkedin: "/",
      },
    },
    {
      name: "Will Smith",
      position: "Product Designer",
      image: "/employee-3.webp",
      status: "active",
      href: {
        twitter: "/",
        instagram: "/",
        linkedin: "/",
      },
    },
  ];
  return (
    <Swiper
      slidesPerView={3}
      spaceBetween={10}
      loop
      modules={[Pagination]}
      pagination={{
        clickable: true,
      }}
    >
      {employees.map((item: IAboutEmployeeCard, i: number) => {
        return (
          <SwiperSlide key={i}>
            <AboutEmployeeCard {...item} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
