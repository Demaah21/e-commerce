"use client";
import { useFormik } from "formik";
import { object, string } from "yup";
import { useState } from "react";
import forgotPassword from "@/services/forgotPassword";
import InputWithLine from "@/components/inputs/InputWithLine";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import { useRouter } from "next/navigation";
import verifyResetCode from "@/services/verifyResetCode";

const ForgotPasswordValidation = object().shape({
  email: string().email("Email is invalid").required("Email is required"),
});

const ResetCodeValidation = object().shape({
  resetCode: string().required("Reset code is required"),
});

import { useEffect } from "react";

interface ForgotPasswordFormProps {
  email?: string;
}

export default function ForgotPasswordForm({
  email,
}: ForgotPasswordFormProps) {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [step, setStep] = useState("request");
  const router = useRouter();
  const formik = useFormik<{ email: string; resetCode: string }>({
    initialValues: {
      email: "",
      resetCode: "",
    },
    validationSchema:
      step === "request"
        ? ForgotPasswordValidation
        : ResetCodeValidation,
    onSubmit: async (values) => {
      setError("");
      setMessage("");
      console.log("Submitting values:", values); // Add this line for debugging
      try {
        if (step === "request") {
          const response = await forgotPassword(values.email);
          setMessage(response.data.message);
          setStep("verify");
        } else {
          const response = await verifyResetCode(values.resetCode.trim());
          if (response.data.status === "Success") {
            router.push(`/reset-password?email=${values.email}`);
          } else {
            setMessage(response.data.status);
          }
        }
      } catch (error: any) {
        setError(error.response?.data?.message || "An unexpected error occurred.");
      }
    },
  });

  useEffect(() => {
    if (email) {
      formik.setFieldValue("email", email);
    }
  }, [email, formik]);

  return (
    <div className="max-w-md mx-auto p-8 border rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Forgot Your Password?</h2>
      <p className="text-gray-600 mb-6">
        {step === "request"
          ? "No problem. Enter your email address below and we'll send you a link to reset your password."
          : "Please enter the reset code sent to your email."}
      </p>
      <form
        className="flex flex-col gap-14 max-2xl:gap-8"
        onSubmit={formik.handleSubmit}
      >
        {step === "request" ? (
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
          </div>
        ) : (
          <div className="flex flex-col gap-12 max-2xl:gap-8">
            <InputWithLine
              props={{
                type: "text",
                placeholder: "Reset Code",
                ...formik.getFieldProps("resetCode"),
              }}
            />
            {formik.touched.resetCode && formik.errors.resetCode && (
              <p className="text-red-500">{formik.errors.resetCode}</p>
            )}
          </div>
        )}
        {message && <p className="text-green-500">{message}</p>}
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex flex-col gap-5">
          <PrimaryButton
            buttonProps={{
              type: "submit",
            }}
          >
            {step === "request" ? "Send Reset Link" : "Verify Code"}
          </PrimaryButton>
        </div>
      </form>
    </div>
  );
}