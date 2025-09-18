"use client";

import OutlinedButton from "@/components/buttons/OutlinedButton";
import CartCard from "@/components/cards/cart_card";
import DefaultText from "@/components/titles/DefaultText";
import {
  cartProductsState,
  deliveryPriceState,
  subTotalPriceState,
} from "@/shared/recoil_states/atoms";
import { ICartProductCard } from "@/shared/types";
import { calculateDeliveryPrice, calculateSubtotal } from "@/shared/utils";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { getLoggedUserCart } from "@/services/cart";

export default function CartProductsSection() {
  const cartProducts = useRecoilValue(cartProductsState);
  const setCartProducts = useSetRecoilState(cartProductsState); // Add this line
  const [array, setArray] = useState<ICartProductCard[]>([]);
  const setSubTotal = useSetRecoilState(subTotalPriceState);
  const setDeliveryPrice = useSetRecoilState(deliveryPriceState);

  useEffect(() => {
    // ! update cost while changing the amount of items
    setSubTotal((prev) => calculateSubtotal(cartProducts, prev));
    setDeliveryPrice((prev) => calculateDeliveryPrice(cartProducts, prev));
    setArray(cartProducts);
  }, [cartProducts, setDeliveryPrice, setSubTotal]);

  useEffect(() => {
    async function fetchCartOnMount() {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const cartResponse = await getLoggedUserCart(token);
          const formattedCartProducts = cartResponse.data.products.map(
            (item: any) => ({
              sold: item.product.sold,
              images: [item.product.imageCover],
              subcategory: item.product.subcategory,
              ratingsQuantity: item.product.ratingsQuantity,
              _id: item.product._id,
              title: item.product.title,
              slug: item.product.slug,
              description: item.product.description,
              quantity: item.product.quantity,
              price: item.price, // Use item.price for cart price
              imageCover: item.product.imageCover,
              category: item.product.category,
              brand: item.product.brand,
              ratingsAverage: item.product.ratingsAverage,
              createdAt: item.product.createdAt,
              updatedAt: item.product.updatedAt,
              id: item.product.id,
              priceAfterDiscount: item.product.priceAfterDiscount,
              availableColors: item.product.availableColors,
              discount: item.product.discount,
              isFavorite: false, // Default to false
              isNew: false, // Default to false
              amount: item.count,
            })
          );
          setCartProducts(formattedCartProducts);
        } catch (error) {
          console.error("Failed to fetch cart on mount:", error);
        }
      }
    }
    fetchCartOnMount();
  }, [setCartProducts]); // Empty dependency array to run only on mount

  return (
    <section className="flex flex-col gap-8">
      {array.length > 0 ? (
        <>
          <div
            className="grid grid-cols-4 shadow-[0px_0px_10px_1px_rgba(25,25,25,0.1)] px-6 py-7 gap-3
          max-2xl:py-5 max-2xl:px-4"
          >
            <DefaultText
              text="Product"
              className="self-center place-self-center"
            />
            <DefaultText
              text="Price"
              className="self-center place-self-center"
            />
            <DefaultText
              text="Quantity"
              className="self-center place-self-center"
            />
            <DefaultText
              text="Subtotal"
              className="self-center place-self-center"
            />
          </div>
          <div className="flex flex-col gap-8">
            {array.map((item, i) => (
              <CartCard key={item.id} {...item} />
            ))}
          </div>
          <div className="flex items-center justify-between">
            <OutlinedButton
              buttonProps={{
                onClick: () => console.log("hello"),
              }}
            >
              Return To Shop
            </OutlinedButton>
            <OutlinedButton>Update Cart</OutlinedButton>
          </div>
        </>
      ) : (
        <DefaultText text="Nothing to show" className="text-center text-4xl" />
      )}
    </section>
  );
}
