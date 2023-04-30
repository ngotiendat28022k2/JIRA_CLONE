import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import deviceAPi from "../api/device";

export const fetchDevices = createAsyncThunk(
  "device/fetchDevices",
  async () => {
    const result = await deviceAPi.getDevices();
    return result;
  }
);

export const fetchDevice = createAsyncThunk(
  "device/fetchDevice",
  async (id: string) => {
    const result = await deviceAPi.getDevice(id);
    return result;
  }
);

export const createDevice = createAsyncThunk(
  "device/createDevice",
  async (data: any) => {
    const result = await deviceAPi.createDevice(data);
    return result;
  }
);

export const updateDevice = createAsyncThunk(
  "device/updateDevice",
  async (data) => {
    const result = await deviceAPi.updateDevice(data);
    return result;
  }
);

const initialState: { value: [] } = {
  value: [],
};
const deviceSlice = createSlice({
  name: "devices",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDevices.fulfilled, (state, action: any) => {
      state.value = action.payload;
    });
    builder.addCase(createDevice.fulfilled, (state, action: any) => {
      state.value = action.payload;
    });
    builder.addCase(updateDevice.fulfilled, (state, action: any) => {
      state.value = action.payload;
    });
  },
});

export default deviceSlice.reducer;
