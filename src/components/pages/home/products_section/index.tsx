"use client";

import PrimaryButton from "@/components/buttons/PrimaryButton";
import ArrowButton from "@/components/buttons/arrow_button/ArrowButton";
import SectionDescription from "@/components/titles/SectionDescription";
import SectionTitle from "@/components/titles/SectionTitle";
import CustomSwiper from "./CustomSwiper";
import Link from "next/link";
import { useRef, useEffect } from "react";

export default function ProductsSection() {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
  }, []);

  return (
    <section className="flex flex-col gap-20 max-2xl:gap-10">
      <div className="flex flex-col gap-7">
        <SectionTitle text="our products" />
        <div className="flex items-center justify-between">
          <SectionDescription text="explore our products" />
          <div className="flex items-center gap-2">
            <ArrowButton direction="left" ref={prevRef} />
            <ArrowButton direction="right" ref={nextRef} />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-12">
        <div>
          <CustomSwiper prevEl={prevRef} nextEl={nextRef} />
        </div>
        <Link href="/products" className="self-center">
          <PrimaryButton>View all products</PrimaryButton>
        </Link>
      </div>
    </section>
  );
}
