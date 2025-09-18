"use client";

import { IProductCard } from "types";
import Image from "next/image";
import {
  PiHeart as HeartIcon,
  PiHeartFill as FilledHeartIcon,
} from "react-icons/pi";
import { poppinsMediumFont, poppinsSemiBoldFont } from "fonts";
import RatingStar from "./RatingStar";
import EmptyStar from "./EmptyStar";
import SemiStar from "./SemiStar";
import { useState, useEffect } from "react";
import { twMerge as tw } from "tailwind-merge";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import { useRecoilState } from "recoil";
import {
  cartProductsState,
  favoriteProductsState,
} from "@/shared/recoil_states/atoms";
import {
  addNewItemToCart,
  decreaseAmount,
  editExistItemInCart,
  increaseAmount,
  removeItemFromCartViaIndex,
  generateRatingStars,
} from "@/shared/utils";
import { addToWishlist, removeFromWishlist } from "@/services/wishlist";
import { fetchProductById } from "@/services/products";
import { addProductToCart, updateProductCountInCart } from "@/services/cart";

export default function ProductCard(props: IProductCard) {
  const {
    imageCover,
    title,
    price,
    ratingsAverage,
    ratingsQuantity,
    availableColors,
    discount,
    isNew,
    id, // Add id to destructured props
  } = props;
  const [color, setColor] = useState(availableColors ? availableColors[0] : "");
  const [favoriteProducts, setFavoriteProducts] = useRecoilState(
    favoriteProductsState
  );
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [amount, setAmount] = useState(0);
  const [cartProducts, setCartProducts] = useRecoilState(cartProductsState);
  const rating = generateRatingStars(ratingsAverage);

  useEffect(() => {
    favoriteProducts.length > 0 &&
      setIsFavorite(favoriteProducts.some((item) => item.id === id));
  }, [favoriteProducts, id]);

  useEffect(() => {
    let tempArr = cartProducts.filter((item) => item.id === id);
    if (tempArr.length > 0) {
      setAmount(tempArr[0].amount);
    }
  }, [cartProducts, id]);


  async function handleFavoriteClick() {
    const token = localStorage.getItem("token");
    if (!token) {
      // Handle unauthenticated user, e.g., redirect to login
      console.log("User not authenticated.");
      return;
    }

    if (isFavorite) {
      // Remove from wishlist
      try {
        await removeFromWishlist(id, token);
        setFavoriteProducts((prev) => prev.filter((item) => item.id !== id));
        setIsFavorite(false);
      } catch (error) {
        console.error("Failed to remove from wishlist:", error);
      }
    } else {
      // Add to wishlist
      try {
        await addToWishlist(id, token);
        const productDetails = await fetchProductById(id);
        setFavoriteProducts((prev) => [...prev, { ...productDetails, isFavorite: true }]);
        setIsFavorite(true);
      } catch (error) {
        console.error("Failed to add to wishlist:", error);
      }
    }
  }

  function getStar(item: number, i: number) {
    if (item === 1) {
      return <RatingStar key={i} />;
    } else if (item === 0) {
      return <EmptyStar key={i} />;
    } else {
      return <SemiStar key={i} />;
    }
  }

  return (
    <div className="flex flex-col items-start gap-3 group p-4 border border-color-divider rounded-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
      <div className="bg-color-secondary p-6 flex items-center justify-center relative w-full h-48">
        <Image
          alt={title}
          src={imageCover}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        <>
          {amount !== 0 ? (
            <div
              className="absolute bottom-0 w-full py-2 bg-color-bg-1 hover:bg-color-bg-1
            transition-all duration-300 ease-in-out rounded-tr-none
            rounded-tl-none flex items-center justify-between rounded-sm text-color-text-1 px-4 text-xl
            max-2xl:text-base max-2xl:py-1 max-2xl:px-2 max-3xl:h-9
          "
            >
              <button
                onClick={async () => {
                  const token = localStorage.getItem("token");
                  if (!token) {
                    console.log("User not authenticated.");
                    return;
                  }
                  try {
                    const newAmount = decreaseAmount(amount);
                    if (newAmount >= 0) {
                      await updateProductCountInCart(id, newAmount, token);
                      setAmount(newAmount);
                    }
                  } catch (error) {
                    console.error("Failed to decrease product count in cart:", error);
                  }
                }}
                className="px-2 duration-300 transition-colors hover:bg-color-primary-1 text-center rounded-sm"
              >
                -
              </button>
              <p>{amount}</p>
              <button
                onClick={async () => {
                  const token = localStorage.getItem("token");
                  if (!token) {
                    console.log("User not authenticated.");
                    return;
                  }
                  try {
                    const newAmount = increaseAmount(amount);
                    await updateProductCountInCart(id, newAmount, token);
                    setAmount(newAmount);
                  } catch (error) {
                    console.error("Failed to increase product count in cart:", error);
                  }
                }}
                className="px-2 duration-300 transition-colors hover:bg-color-primary-1 text-center rounded-sm"
              >
                +
              </button>
            </div>
          ) : (
            <PrimaryButton
              buttonProps={{
                onClick: async () => {
                  const token = localStorage.getItem("token");
                  if (!token) {
                    console.log("User not authenticated.");
                    return;
                  }
                  try {
                    await addProductToCart(id, token);
                    setAmount(increaseAmount(amount));
                  } catch (error) {
                    console.error("Failed to add product to cart:", error);
                  }
                },
              }}
              className="absolute bottom-0 w-full py-2 bg-color-bg-1 hover:bg-color-bg-1 group-hover:flex
              transition-all duration-300 ease-in-out rounded-tr-none rounded-tl-none
              max-2xl:text-base max-2xl:py-1 max-2xl:px-2 max-3xl:h-9"
            >
              add to cart
            </PrimaryButton>
          )}
        </>

        <>
          <div
            onClick={handleFavoriteClick}
            className="w-10 h-10 absolute top-2 right-3 cursor-pointer bg-color-bg rounded-full flex items-center justify-center"
          >
            <>
              {isFavorite ? (
                <FilledHeartIcon className="text-color-secondary-2 w-5 h-5" />
              ) : (
                <HeartIcon className="text-color-bg-1 w-5 h-5" />
              )}
            </>
          </div>
          <div className="absolute top-2 left-2 flex text-center gap-2">
            <>
              {isNew ? (
                <p className="uppercase text-color-text-1 rounded-md px-2 py-1 bg-color-button text-sm">
                  new
                </p>
              ) : null}
              {discount ? (
                <p className="uppercase text-color-text-1 rounded-md px-2 py-1 bg-color-button-1 text-sm">
                  -{discount}%
                </p>
              ) : null}
            </>
          </div>
        </>
      </div>
      <div
        className={`${poppinsMediumFont.className} flex flex-col items-start gap-1`}
      >
        <p className="text-lg text-color-text-3 capitalize max-2xl:text-base">
          {title}
        </p>
        <div
          className={tw(
            "flex items-center gap-3",
            discount ? "flex-col items-start gap-1" : ""
          )}
        >
          <div className="flex items-center gap-2">
            <p className="text-color-secondary-2 text-lg max-2xl:text-base">
              ${discount ? `${price - (price / 100) * discount}` : price}
            </p>
            {discount ? (
              <p className="text-color-text-2 line-through text-lg max-2xl:text-base">
                ${price}
              </p>
            ) : null}
          </div>
          <div className="flex items-center gap-1">
            <div className="flex items-center gap-1">{rating.map(getStar)}</div>
            <p
              className={`${poppinsSemiBoldFont.className} text-color-text-2 text-base max-2xl:text-sm`}
            >{`(${ratingsQuantity})`}</p>
          </div>
        </div>

        {availableColors ? (
          <div className="flex items-center gap-2 mt-3">
            {availableColors.map((item, i) => {
              return (
                <div
                  className={tw(
                    "w-5 h-5 border-2 border-color-bg rounded-full cursor-pointer",
                    color === item ? "outline outline-2 outline-color-bg-1" : ""
                  )}
                  style={{ backgroundColor: item }}
                  key={i}
                  onClick={() => setColor(item)}
                />
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
}
