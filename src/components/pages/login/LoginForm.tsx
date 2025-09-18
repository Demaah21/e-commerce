"use client";
import { poppinsMediumFont } from "fonts";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import InputWithLine from "@/components/inputs/InputWithLine";
import Link from "next/link";
import { useFormik } from "formik";
import { SignIn } from "@/shared/types";
import { useState } from "react";
import { useRouter } from "next/navigation";
import signin from "@/services/signin";
import { object, string } from "yup";
import { useAuth } from "@/shared/hooks/useAuth";
import { getLoggedUserCart } from "@/services/cart";
import { useSetRecoilState } from "recoil";
import { cartProductsState } from "@/shared/recoil_states/atoms";

const SignInValidation = object().shape({
  email: string().email("Email is invalid").required("Email is required"),
  password: string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long"),
});

export default function LoginForm() {
  const [errorMessage, setErrorMessage] = useState("");
  const { login } = useAuth();
  const setCartProducts = useSetRecoilState(cartProductsState);
  const formik = useFormik<SignIn>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: SignInValidation,
    onSubmit: async (values) => {
      try {
        const response = await signin(values);
        const { user, token } = response.data;
        login(token, user);
        // Fetch cart data after successful login
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
              price: item.price,
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
              isFavorite: false, // Default to false, update if wishlist is integrated
              isNew: false, // Default to false
              amount: item.count,
            })
          );
          setCartProducts(formattedCartProducts);
        } catch (cartError) {
          console.error("Failed to fetch cart after login:", cartError);
        }
      } catch (error: any) {
        setErrorMessage(error.response.data.message);
      }
    },
  });

  return (
    <form
      className="flex flex-col gap-14 max-2xl:gap-8"
      onSubmit={formik.handleSubmit}
    >
      <div className="flex flex-col gap-12 max-2xl:gap-8">
        <InputWithLine
          props={{
            type: "email",
            placeholder: "Email",
            ...formik.getFieldProps("email"),
          }}
        />
        {formik.touched.email && formik.errors.email && (
          <p className="text-red-500">{formik.errors.email}</p>
        )}
        <InputWithLine
          props={{
            type: "password",
            placeholder: "Password",
            ...formik.getFieldProps("password"),
          }}
        />
        {formik.touched.password && formik.errors.password && (
          <p className="text-red-500">{formik.errors.password}</p>
        )}
      </div>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <div className="flex flex-col gap-5">
        <PrimaryButton
          buttonProps={{
            type: "submit",
          }}
        >
          Login
        </PrimaryButton>
        <Link
          href={`/forgot-password`}
          className="text-center text-color-text-2 hover:text-color-text-2-hover"
        >
          Forgot Password?
        </Link>
      </div>
      <div className="flex items-center justify-center gap-4 text-color-text-2 text-lg">
        <p className="text-base max-2xl:text-sm">Don&apos;t have an account?</p>
        <Link
          href={`/sign-up`}
          className={`${poppinsMediumFont.className} duration-300 ease-in-out transition-colors underline underline-offset-8 hover:text-color-text-2-hover text-base
          max-2xl:text-sm`}
        >
          Sign up
        </Link>
      </div>
    </form>
  );
}