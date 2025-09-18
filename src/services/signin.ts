import axios from "axios";
import { SignIn } from "@/shared/types";

const signin = async (data: SignIn) => {
  const response = await axios.post(
    "https://ecommerce.routemisr.com/api/v1/auth/signin",
    data
  );
  return response;
};

export default signin;