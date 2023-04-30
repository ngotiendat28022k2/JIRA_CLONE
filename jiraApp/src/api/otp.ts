import { IOtp } from "../interfaces/IOtp";
import instance from "./instance";

const OtpAPi = {
  createOtp: async (email) => {
    return await instance.post("send_otp", email);
  },
  veifyOtp: async (data): Promise<IOtp> => {
    return await instance.post("verify_otp", data);
  },
};

export default OtpAPi;
