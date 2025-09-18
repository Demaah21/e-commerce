"use client";

import { useRecoilState, useRecoilValue } from "recoil";
import { useState, useEffect } from "react";
import { favoriteProductsState, isLoggedInState } from "@/shared/recoil_states/atoms";
import OutlinedButton from "@/components/buttons/OutlinedButton";
import { IProductCard } from "@/shared/types";
import ProductCard from "@/components/cards/product_card/ProductCard";
import { getLoggedUserWishlist } from "@/services/wishlist";
import { fetchProductById } from "@/services/products";

export default function WishListSection() {
  const [favoriteProducts, setFavoriteProducts] = useRecoilState(favoriteProductsState);
  const [array, setArray] = useState<IProductCard[]>([]);
  const [loading, setLoading] = useState(true);
  const isLoggedIn = useRecoilValue(isLoggedInState); // Get login status

  useEffect(() => {
    const fetchWishlist = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("User not authenticated.");
        setFavoriteProducts([]); // Clear wishlist if not logged in
        setLoading(false);
        return;
      }

      try {
        const response = await getLoggedUserWishlist(token);
        const productObjects = response.data;
        const productIds = productObjects.map((product: any) => product._id);
        const productDetailsPromises = productIds.map((id: string) => fetchProductById(id));
        const products = await Promise.all(productDetailsPromises);
        setFavoriteProducts(products.map(product => ({ ...product, isFavorite: true })));
      } catch (error) {
        console.error("Failed to fetch wishlist:", error);
        setFavoriteProducts([]); // Clear wishlist on error
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [isLoggedIn, setFavoriteProducts]); // Add isLoggedIn as a dependency

  useEffect(() => {
    setArray(favoriteProducts);
  }, [favoriteProducts]);

  return (
    <>
      <section className="flex flex-col gap-14">
        <div className="flex items-center justify-between">
          <h1 className="capitalize text-2xl max-2xl:text-xl">
            Wishlist ({array.length})
          </h1>
          <OutlinedButton>Move All To Bag</OutlinedButton>
        </div>
        <div className="grid grid-cols-5 auto-cols-auto gap-10 max-2xl:grid-cols-4 max-2xl:gap-12">
          {array.map((item, i) => (
            <ProductCard key={i} {...item} />
          ))}
        </div>
      </section>
    </>
  );
}
