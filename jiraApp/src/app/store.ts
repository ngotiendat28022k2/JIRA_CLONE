import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import categoryReduce from "../slice/category";
import projectReduce from "../slice/project";
import userReducer from "../slice/users";
import issueReducer from "../slice/issue";
import deviceReducer from "../slice/device";
import otpReducer from "../slice/otp";
import pageReducer from "../slice/page";
import pageDynamic from "../slice/dynamic";
const store = configureStore({
  reducer: {
    user: userReducer,
    project: projectReduce,
    category: categoryReduce,
    issue: issueReducer,
    device: deviceReducer,
    otp: otpReducer,
    page: pageReducer,
    dynamic: pageDynamic,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
