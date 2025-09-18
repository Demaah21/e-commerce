import axios from "axios";

export const changePassword = async (data: any, token: string) => {
  const response = await axios.put(
    "https://ecommerce.routemisr.com/api/v1/users/changeMyPassword",
    data,
    {
      headers: {
        "Content-Type": "application/json",
        token,
      },
    }
  );
  return response.data;
};