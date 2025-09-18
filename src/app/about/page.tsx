import NavigationTrain from "@/components/navigation_train";
import {
  bottomMarginSaving,
  horizontalMarginLimit,
  topMarginSaving,
} from "@/shared/constants";
import { twMerge as tw } from "tailwind-merge";
import { interSemiboldFont } from "fonts";
import Image from "next/image";
import AboutCard from "@/components/cards/about_card";
import AboutEmployeesSwiper from "@/components/pages/about/AboutEmployeesSwiper";
import ServiceCard from "@/components/cards/service_card";
export default function Page() {
  return (
    <div
      className={tw(
        `flex flex-col text-color-text-3 gap-56 max-3xl:gap-48 max-2xl:gap-32`,
        topMarginSaving,
        bottomMarginSaving,
        horizontalMarginLimit
      )}
    >
      <NavigationTrain />
      {/* our story texts */}
      <section className="flex items-center justify-between gap-5">
        <div className="flex flex-col flex-[0_1_40%] gap-12 max-3xl:gap-8 max-3xl:flex-[0_1_45%]">
          <h1
            className={tw(
              "text-6xl capitalize max-2xl:text-4xl",
              interSemiboldFont.className
            )}
          >
            Our Story
          </h1>
          <p className="text-lg max-2xl:text-base">
            Launcheed in 2015, Exclusive is South Asia’s premier online shopping makterplace with an active presense in Bangladesh. Supported by wide range of tailored marketing, data and service solutions, Exclusive has 10,500 sallers and 300 brands and serves 3 millioons customers across the region.
          </p>
          <p className="text-lg max-2xl:text-base">
            Exclusive has more than 1 Million products to offer, growing at a very fast. Exclusive offers a diverse assotment in categories ranging  from consumer.
          </p>
        </div>
        <Image
          alt="girls"
          src={"/images/about/girls.webp"}
          width={700}
          height={700}
          className="w-[900px] object-contain
          max-3xl:w-[600px] max-2xl:w-[500px]"
          priority
        />
      </section>
      {/* about cards */}
      <section className="flex justify-between">
        <AboutCard
          i={0}
          title={"10.5k"}
          subtitle={"Sallers active our site"}
        />
        <AboutCard
          i={1}
          title={"33k"}
          subtitle={"Mopnthly Produduct Sale"}
        />
        <AboutCard
          i={2}
          title={"45.5k"}
          subtitle={"Customer active in our site"}
        />
        <AboutCard
          i={3}
          title={"25k"}
          subtitle={"Anual gross sale in our site"}
        />
      </section>
      {/* swiper employees */}
      <section>
        <AboutEmployeesSwiper />
      </section>
      {/* service cards */}
      <section className="flex items-center justify-evenly">
        <ServiceCard
          title="FREE AND FAST DELIVERY"
          subtitle="Free delivery for all orders over $140"
          image="delivery.svg"
        />
        <ServiceCard
          title="24/7 CUSTOMER SERVICE"
          subtitle="Friendly 24/7 customer support"
          image="support.svg"
        />
        <ServiceCard
          title="MONEY BACK GUARANTEE"
          subtitle="We reurn money within 30 days"
          image="safety.svg"
        />
      </section>
    </div>
  );
}
