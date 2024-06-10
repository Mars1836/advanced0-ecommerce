import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { NotiInfor, NotiState } from "../../interfaces";
import notiApi from "./notiApi";
const initialState = {
  list: [],
} as NotiState;

const notiSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    resetNotiState(state) {
      state.list = initialState.list;
    },
    setReadToTrue(state) {
      state.list = state.list.map((i) => {
        return {
          ...i,
          isRead: true,
        };
      });
    },
    addNoti(state, action: PayloadAction<NotiInfor>) {
      state.list.unshift(action.payload);
    },
  },
  extraReducers(builder) {
    builder.addMatcher(
      notiApi.endpoints.getNoti.matchFulfilled,
      (state, action) => {
        const data = action.payload.metadata;
        state.list = data;
      }
    );
  },
});
export const notiReducer = notiSlice.reducer;
export const selectNotifications = (state: RootState) => state.noti.list;
export const { setReadToTrue, addNoti, resetNotiState } = notiSlice.actions;
