import { horizontalMarginLimit } from "@/shared/constants";
import Link from "next/link";
import { twMerge as tw } from "tailwind-merge";
import { poppinsSemiBoldFont } from "fonts";
export default async function TopHeader() {
  return (
    <div className="bg-color-bg-1 text-color-text-1">
      <div
        className={tw(
          `flex items-center justify-center relative py-3`,
          horizontalMarginLimit
        )}
      >
        <div className="flex items-center gap-3 max-2xl:max-w-2xl text-center">
          <p className="text-base max-2xl:text-sm">
            Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!{" "}
            <Link
              className={tw(
                "underline cursor-pointer",
                poppinsSemiBoldFont.className
              )}
              href={`/`}
            >
              ShopNow
            </Link>
          </p>
        </div>
        <div className="absolute right-0 top-2/4 -translate-y-2/4"></div>
      </div>
    </div>
  );
}
