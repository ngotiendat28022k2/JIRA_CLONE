import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import categoryAPI from "../api/category";
import { ICategory } from "../interfaces/ICategory";

export const fetchCategorys = createAsyncThunk(
  "category/fetchCategory",
  async () => {
    const category = await categoryAPI.listCategory();
    return category;
  }
);

const initialState: { value: ICategory[] } = {
  value: [],
};
const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategorys.fulfilled, (state, action: any) => {
      state.value = action.payload;
    });
  },
});

export default categorySlice.reducer;
