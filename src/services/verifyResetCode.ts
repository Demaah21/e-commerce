import axios from "axios";

const verifyResetCode = async (resetCode: string) => {
  return await axios.post("/api/v1/auth/verifyResetCode", {
    resetCode,
  });
};

export default verifyResetCode;