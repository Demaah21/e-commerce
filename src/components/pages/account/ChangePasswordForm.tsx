"use client";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { changePassword } from "../../../services/changePassword";
import InputWithLabel from "@/components/inputs/InputWithLabel";
import PrimaryButton from "@/components/buttons/PrimaryButton";

const validationSchema = Yup.object({
  currentPassword: Yup.string().required("Current password is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("New password is required"),
  rePassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Password confirmation is required"),
});

export default function ChangePasswordForm() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setError("");
      setSuccess("");
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("You are not logged in.");
          return;
        }
        const response = await changePassword(values, token);
        if (response.message === "success") {
          setSuccess("Password changed successfully.");
          resetForm();
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

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <InputWithLabel
        label="Current Password"
        inputProps={{
          id: "currentPassword",
          name: "currentPassword",
          type: "password",
          onChange: formik.handleChange,
          onBlur: formik.handleBlur,
          value: formik.values.currentPassword,
        }}
        error={
          formik.touched.currentPassword ? formik.errors.currentPassword : ""
        }
      />
      <InputWithLabel
        label="New Password"
        inputProps={{
          id: "password",
          name: "password",
          type: "password",
          onChange: formik.handleChange,
          onBlur: formik.handleBlur,
          value: formik.values.password,
        }}
        error={formik.touched.password ? formik.errors.password : ""}
      />
      <InputWithLabel
        label="Confirm New Password"
        inputProps={{
          id: "rePassword",
          name: "rePassword",
          type: "password",
          onChange: formik.handleChange,
          onBlur: formik.handleBlur,
          value: formik.values.rePassword,
        }}
        error={formik.touched.rePassword ? formik.errors.rePassword : ""}
      />
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <PrimaryButton
        buttonProps={{ type: "submit", disabled: formik.isSubmitting }}
      >
        {formik.isSubmitting ? "Changing..." : "Change Password"}
      </PrimaryButton>
    </form>
  );
}