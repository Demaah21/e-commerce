"use client";
import { horizontalMarginLimit } from "@/shared/constants";
import { twMerge as tw } from "tailwind-merge";
import { interBoldFont } from "fonts";
import HeaderLink from "./HeaderLink";
import HeaderInputButtons from "./HeaderInputButtons";
import Link from "next/link";
import { useAuth } from "@/shared/hooks/useAuth";
import { PiUser, PiShoppingCart, PiHeart, PiHeartFill } from "react-icons/pi";
import { useRecoilValue } from "recoil";
import { cartProductsState, favoriteProductsState } from "@/shared/recoil_states/atoms";

export default function MainHeader() {
  const { isLoggedIn, logout, loading } = useAuth();
  const cartProducts = useRecoilValue(cartProductsState);
  const favoriteProducts = useRecoilValue(favoriteProductsState);
  const links = [
    { href: "/", text: "home" },
    { href: "/contact", text: "contact" },
    { href: "/about", text: "about" },
  ];

  return (
    <div className="bg-color-bg text-color-text-3 border-b border-color-divider">
      <div
        className={tw(
          `flex items-center justify-between pt-9 pb-4 max-2xl:pt-7 max-2xl:pb-3`,
          horizontalMarginLimit
        )}
      >
        <Link
          href={`/`}
          className={tw("text-3xl max-2xl:text-2xl", interBoldFont.className)}
        >
          Exlusive
        </Link>
        <div className="flex items-center gap-52 max-3xl:gap-40 max-2xl:gap-24">
          <nav className="flex items-center gap-12 max-3xl:gap-10 max-2xl:gap-8">
            {links.map((item, i) => (
              <HeaderLink {...item} key={i} />
            ))}
            {!loading && !isLoggedIn && (
              <HeaderLink href="/login" text="login" />
            )}
            {!loading && isLoggedIn && (
              <Link href="/account" className="text-2xl">
                <PiUser />
              </Link>
            )}
          </nav>
          <div
            className="flex items-center gap-6
          max-3xl:gap-5"
          >
            {!loading && isLoggedIn ? (
              <>
                <Link href="/cart" className="relative text-2xl">
                  <PiShoppingCart />
                  {cartProducts.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-color-button text-color-text-1 text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      {cartProducts.length}
                    </span>
                  )}
                </Link>
                <Link href="/wishlist" className="text-2xl">
                  {favoriteProducts.length > 0 ? <PiHeartFill className="text-color-secondary-2" /> : <PiHeart />}
                </Link>
                <button onClick={logout}>Logout</button>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
