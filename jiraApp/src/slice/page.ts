import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { pageApi } from "../api/page";

export const fetchPages = createAsyncThunk("page/fetchPages", async () => {
  const result = await pageApi.getPages();
  return result;
});

export const fetchPage = createAsyncThunk(
  "page/fetchPage",
  async (id: string) => {
    const result = await pageApi.getPage(id);
    return result;
  }
);

export const createPage = createAsyncThunk(
  "page/createPage",
  async (data: any) => {
    const result = await pageApi.createPage(data);
    return result;
  }
);

export const updatePage = createAsyncThunk("page/updatePage", async (data) => {
  const result = await pageApi.updatePage(data);
  return result;
});

export const removePage = createAsyncThunk("page/removePage", async (id) => {
  await pageApi.removePage(id);
  const result = await pageApi.getPages();
  return result;
});
const initialState: { value: [] } = {
  value: [],
};
const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPages.fulfilled, (state, action: any) => {
      state.value = action.payload;
    });
    builder.addCase(createPage.fulfilled, (state, action: any) => {
      state.value = action.payload;
    });
    builder.addCase(updatePage.fulfilled, (state, action: any) => {
      state.value = action.payload;
    });
    builder.addCase(removePage.fulfilled, (state, action: any) => {
      state.value = action.payload;
    });
  },
});

export default pageSlice.reducer;
