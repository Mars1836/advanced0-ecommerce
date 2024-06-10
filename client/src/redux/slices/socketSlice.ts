import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { SocketState } from "../../interfaces";
import { UserInfor } from "../../interfaces";
const initialState = {
  users: [],
} as SocketState;

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<Array<UserInfor>>) {
      state.users = action.payload;
    },
    addUsers(state, action: PayloadAction<UserInfor>) {
      state.users = [action.payload, ...state.users];
    },
  },
});
export const socketReducer = socketSlice.reducer;
export const selectUsersInSocket = (state: RootState) => state.socket.users;
export const { setUsers, addUsers } = socketSlice.actions;
