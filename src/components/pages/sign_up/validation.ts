import { object, string, ref } from "yup";

export const SignUpValidation = object().shape({
  name: string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters long"),
  email: string().email("Email is invalid").required("Email is required"),
  phone: string()
    .required("Phone number is required")
    .matches(/^01[0125][0-9]{8}$/, "Phone number is invalid"),
  password: string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long"),
  rePassword: string()
    .required("Password confirmation is required")
    .oneOf([ref("password")], "Passwords must match"),
});