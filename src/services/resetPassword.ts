import axios from "axios";

export const resetPassword = async (values: any) => {
  const { data } = await axios.put(
    `https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,
    values
  );
  return data;
};