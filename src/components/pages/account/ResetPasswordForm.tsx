"use client";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { resetPassword } from "../../../services/resetPassword";
import InputWithLabel from "@/components/inputs/InputWithLabel";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import { useAuth } from "@/shared/hooks/useAuth";
import { useRouter, useSearchParams } from "next/navigation";

const validationSchema = Yup.object({
  newPassword: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("New password is required"),
});

export default function ResetPasswordForm() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: email || "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setError("");
      setSuccess("");
      try {
        const response = await resetPassword(values);
        if (response.token) {
          setSuccess("Password reset successfully.");
          resetForm();
          login(response.token, { email: values.email });
        } else {
          setError(response.message || "An error occurred.");
        }
      } catch (err: any) {
        setError(err.response?.data?.message || "An error occurred.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    if (email) {
      formik.setFieldValue("email", email);
    }
  }, [email, formik]);

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <InputWithLabel
        label="New Password"
        inputProps={{
          id: "newPassword",
          name: "newPassword",
          type: "password",
          onChange: formik.handleChange,
          onBlur: formik.handleBlur,
          value: formik.values.newPassword,
        }}
        error={formik.touched.newPassword ? formik.errors.newPassword : ""}
      />
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <PrimaryButton
        buttonProps={{ type: "submit", disabled: formik.isSubmitting }}
      >
        {formik.isSubmitting ? "Resetting..." : "Reset Password"}
      </PrimaryButton>
    </form>
  );
}