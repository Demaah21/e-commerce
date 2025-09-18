import { IBrandCard } from "types";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function BrandCard({ image, title, _id }: IBrandCard) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/products?brandId=${_id}`);
  };

  return (
    <div
      className="flex flex-col items-center py-5 px-12 border-2 border-color-divider rounded-md gap-4
    group cursor-pointer transition-colors duration-300 ease-in-out hover:border-transparent hover:bg-color-secondary-2
    active:bg-color-button-1-hover text-center"
      onClick={handleClick}
    >
      <div className="relative w-20 h-20">
        <Image src={image} alt={title} fill className="object-contain" sizes="80px" />
      </div>
      <p className="text-lg capitalize group-hover:text-color-text-1 transition-colors duration-300 ease-in-out">
        {title}
      </p>
    </div>
  );
}