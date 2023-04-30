import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import OtpAPi from "../api/otp";
import { IOtp } from "../interfaces/IOtp";

export const fetchOtp = createAsyncThunk(
  "otp/fetchIssue",
  async (data: IOtp) => {
    await OtpAPi.veifyOtp(data);
  }
);

export const createOtp = createAsyncThunk("otp/create", async (email) => {
  return await OtpAPi.createOtp(email);
});

const initialState: { value: [] } = {
  value: [],
};
const otpSlice = createSlice({
  name: "otp",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOtp.fulfilled, (state, action: any) => {
      state.value = action.payload;
    });
    builder.addCase(createOtp.fulfilled, (state, action: any) => {
      state.value = action.payload;
    });
    builder.addCase(fetchOtp.rejected, (state, action: any) => {
      // console.log("error OTP");
      throw new Error();
    });
  },
});

export default otpSlice.reducer;
