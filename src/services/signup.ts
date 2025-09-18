import axios from "axios";
import { SignUp } from "@/shared/types";

const signup = async (data: SignUp) => {
  const response = await axios.post(
    "https://ecommerce.routemisr.com/api/v1/auth/signup",
    data
  );
  return response;
};

export default signup;