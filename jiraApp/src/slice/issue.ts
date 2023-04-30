import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useNavigate, useParams } from "react-router-dom";
import issueAPi from "../api/issue";
import ProjectAPi from "../api/project";
import { IIssue } from "../interfaces/IIssue";
import { IProject } from "../interfaces/project";

export const fetchIssues = createAsyncThunk("issue/fetchIssues", async () => {
  const result = await issueAPi.getIssues();
  return result;
});

export const fetchIssue = createAsyncThunk(
  "issue/fetchIssue",
  async (id: string) => {
    const result = await issueAPi.getIssue(id);
    return result;
  }
);

export const createIssue = createAsyncThunk(
  "issue/createIssue",
  async (data: IProject) => {
    await issueAPi.createIssue(data);
    const result = await issueAPi.getIssues();
    return result;
  }
);

export const updateIssue = createAsyncThunk(
  "issue/updateIssue",
  async (data: IProject) => {
    const result = await issueAPi.updateIssue(data);
    return result;
  }
);

export const removeIssue = createAsyncThunk(
  "issue/removeIssue",
  async (id: string) => {
    await issueAPi.removeIssue(id);
    const result = await fetchIssues();
    return result;
  }
);

const initialState: { value: [] } = {
  value: [],
};

const issueSlide = createSlice({
  name: "issue",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchIssues.fulfilled, (state, action: any) => {
      state.value = action.payload;
    });

    builder.addCase(fetchIssue.fulfilled, (state, action: any) => {
      state.value = action.payload;
    });

    builder.addCase(createIssue.fulfilled, (state, action: any) => {
      state.value = action.payload;
    });
    builder.addCase(createIssue.rejected, (state, action: any) => {
      console.log("error issu");
      throw new Error();
    });

    builder.addCase(updateIssue.fulfilled, (state, action: any) => {
      state.value = action.value;
    });
  },
});

export default issueSlide.reducer;
