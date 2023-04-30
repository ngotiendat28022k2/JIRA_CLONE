import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiDynamic } from "../api/apiDynamic";

export const fetchDynamics = createAsyncThunk(
  "dynamic/fetchDynamic",
  async (router) => {
    const result = await apiDynamic.getDatas(router);
    return result;
  }
);

export const fetchDynamic = createAsyncThunk(
  "dynamic/fetchDynamic",
  async (data: any) => {
    console.log(data);

    const result = await apiDynamic.getDataOrRemove(data);
    return result;
  }
);

export const removeDynamic = createAsyncThunk(
  "dynamic/removeDynamic",
  async (data: any) => {
    console.log(data);

    await apiDynamic.getDataOrRemove(data);
    const result = await apiDynamic.getDatas({
      model: "get",
      api: data.router.api,
    });
    return result;
  }
);

export const createDynamic = createAsyncThunk(
  "dynamic/createDynamic",
  async ({ router, valueInput }) => {
    console.log(router, valueInput);

    const result = await apiDynamic.createData(router, valueInput);
    return result;
  }
);

export const updateDynamic = createAsyncThunk(
  "dynamic/updateDynamic",
  async (data) => {
    const result = await apiDynamic.updateData(data);
    return result;
  }
);

export const search = createAsyncThunk("dynamic/search", async (data) => {
  const result = await apiDynamic.search(data);
  return result;
});

const initialState: { value: []; search: [] } = {
  value: [],
  search: [],
};

const Dynamicslice = createSlice({
  name: "dynamic",
  initialState,
  reducers: {
    reloadSearch: (state, payload) => {
      state.search = [];
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDynamics.fulfilled, (state, action: any) => {
      state.value = action.payload;
    });
    builder.addCase(removeDynamic.fulfilled, (state, action: any) => {
      state.value = action.payload;
    });
    builder.addCase(createDynamic.fulfilled, (state, action: any) => {
      state.value = action.payload;
    });
    builder.addCase(updateDynamic.fulfilled, (state, action: any) => {
      state.value = action.payload;
    });
    builder.addCase(search.fulfilled, (state, action: any) => {
      state.search = action.payload;
    });
  },
});

export const { reloadSearch } = Dynamicslice.actions;
export default Dynamicslice.reducer;
