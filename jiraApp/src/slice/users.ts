import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import UserAPI from "../api/user";
import { IUser } from "../interfaces/users";

export const fetchUsers = createAsyncThunk("user/getUsers", UserAPI.getUsers);
export const fetchUser = createAsyncThunk("user/getUser", async () => {
  const user = await UserAPI.getUser;
  return user;
});

export const signup = createAsyncThunk(
  "auth/fetchSignup",
  async (data: IUser) => {
    const user = await UserAPI.signup(data);
    return user;
    // return user;
  }
);

export const signin = createAsyncThunk(
  "auth/fetchSignin",
  async (data: IUser) => {
    const user = await UserAPI.signin(data);
    return user;
  }
);

const initialState: { value: IUser[]; isAuth: boolean } = {
  value: [],
  isAuth: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action: any) => {
      state.value = action.payload;
    });

    builder.addCase(signup.fulfilled, (state, action: any) => {
      state.value = action.payload;
      // state.isAuth = true;
    });
    builder.addCase(signup.rejected, (state, action: any) => {
      throw new Error();
    });
    builder.addCase(signin.fulfilled, (state, action: any) => {
      state.value = action.payload;
    });
    builder.addCase(signin.rejected, (state, action: any) => {
      throw new Error();
    });
  },
});

export default userSlice.reducer;
