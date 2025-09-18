import ServiceCard from "@/components/cards/service_card";
export default async function ServicesSection() {
  const services = [
    {
      title: "FREE AND FAST DELIVERY",
      subtitle: "Free delivery for all orders over $140",
      image: "delivery.svg",
    },
    {
      title: "24/7 CUSTOMER SERVICE",
      subtitle: "Friendly 24/7 customer support",
      image: "support.svg",
    },
    {
      title: "MONEY BACK GUARANTEE",
      subtitle: "We reurn money within 30 days",
      image: "safety.svg",
    },
  ];
  return (
    <section className="flex items-center justify-evenly">
      {services.map((item, i) => (
        <ServiceCard key={i} {...item} />
      ))}
    </section>
  );
}
