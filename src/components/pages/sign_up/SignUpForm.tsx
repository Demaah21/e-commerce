"use client";
import { poppinsMediumFont } from "fonts";
import OutlinedButton from "@/components/buttons/OutlinedButton";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import InputWithLine from "@/components/inputs/InputWithLine";
import Image from "next/image";
import Link from "next/link";
import { useFormik } from "formik";
import { SignUp } from "@/shared/types";
import { SignUpValidation } from "./validation";
import signup from "@/services/signup";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

export default function SignUpForm() {
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const formik = useFormik<SignUp>({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      rePassword: "",
    },
    validationSchema: SignUpValidation,
    onSubmit: async (values) => {
      try {
        const response = await signup(values);
        const { user, token } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        router.push("/");
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
            type: "text",
            placeholder: "Name",
            ...formik.getFieldProps("name"),
          }}
        />
        {formik.touched.name && formik.errors.name && (
          <p className="text-red-500">{formik.errors.name}</p>
        )}
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
            type: "text",
            placeholder: "Phone Number",
            ...formik.getFieldProps("phone"),
          }}
        />
        {formik.touched.phone && formik.errors.phone && (
          <p className="text-red-500">{formik.errors.phone}</p>
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
        <InputWithLine
          props={{
            type: "password",
            placeholder: "Confirm Password",
            ...formik.getFieldProps("rePassword"),
          }}
        />
        {formik.touched.rePassword && formik.errors.rePassword && (
          <p className="text-red-500">{formik.errors.rePassword}</p>
        )}
      </div>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <div className="flex flex-col gap-5">
        <PrimaryButton
          buttonProps={{
            type: "submit",
          }}
        >
          Create Account
        </PrimaryButton>
        <OutlinedButton className="flex items-center gap-5">
          <Image
            alt=""
            src={"/icons/sign_up/google.svg"}
            width={100}
            height={100}
            className="w-7 h-7 max-2xl:w-6 max-2xl:h-6"
          />
          <span className="text-base">Sign up with Google</span>
        </OutlinedButton>
      </div>
      <div className="flex items-center justify-center gap-4 text-color-text-2 text-lg">
        <p className="text-base max-2xl:text-sm">Already have account?</p>
        <Link
          href={`/login`}
          className={`${poppinsMediumFont.className} duration-300 ease-in-out transition-colors underline underline-offset-8 hover:text-color-text-2-hover text-base
          max-2xl:text-sm`}
        >
          Log in
        </Link>
      </div>
    </form>
  );
}
