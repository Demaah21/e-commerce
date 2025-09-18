import axios from "axios";

const forgotPassword = async (email: string) => {
  return await axios.post("/api/v1/auth/forgotPasswords", { email });
};

export default forgotPassword;