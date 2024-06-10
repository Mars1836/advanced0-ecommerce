import { createSlice } from "@reduxjs/toolkit";
import authApi from "./authApi";
import { AuthState, UserInfor } from "../../interfaces";
import { RootState } from "../store";
const initialState = {
  user: null,
  accessToken: "",
  refreshToken: "",
} as AuthState;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthState(state) {
      state.user = initialState.user;
      state.accessToken = initialState.accessToken;
      state.refreshToken = initialState.refreshToken;
    },
  },
  extraReducers: (builder) => {
    // Xử lý logic khi endpoint login được fulfilled
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, action) => {
        // Lưu thông tin user vào state
        const { user, tokens } = action.payload.metadata;
        state.accessToken = tokens.accessToken;
        state.refreshToken = tokens.refreshToken;
        state.user = user;
      }
    ),
      builder.addMatcher(
        authApi.endpoints.verifyToken.matchFulfilled,
        (state, action) => {
          const { name, _id, email, avatar }: UserInfor =
            action.payload.metadata;
          state.user = {
            name,
            _id,
            email,
            avatar,
          };
        }
      ),
      builder.addMatcher(
        authApi.endpoints.verifyToken.matchRejected,
        (state) => {
          state.user = initialState.user;
          state.accessToken = initialState.accessToken;
          state.refreshToken = initialState.refreshToken;
          // window.location.reload();
        }
      );
  },
});
export const authReducer = authSlice.reducer;
export const selectUserAuth = (state: RootState) => state.auth.user;
export const selectAccessToken = (state: RootState) => state.auth.accessToken;
export const selectRefressToken = (state: RootState) => state.auth.refreshToken;
export const { resetAuthState } = authSlice.actions;
