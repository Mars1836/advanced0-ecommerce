import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { createSelector } from "@reduxjs/toolkit";
import authApi from "./authApi";
import { UserInfor } from "../../interfaces";
import { socket } from "../../../socket";
export interface Message {
  user: UserInfor;
  content: string;
  isSender: boolean;
  createdAt: string;
  type: string;
}
// interface Room {
//   room: string;
//   messages: Message[];
// }
export interface Room {
  id: string;
  name: string;
  avatar: string;
}
export interface MessageItem {
  room: Room;
  messages: Message[];
}
export interface MessageState {
  messages: MessageItem[];
}
const initialState = {
  messages: [],
} as MessageState;
export interface MessageRoom {
  room: Room;
  message: Message;
}

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    resetMessageState(state) {
      state.messages = initialState.messages;
    },
    setMessages(state, action: PayloadAction<MessageItem[]>) {
      state.messages = action.payload;
    },
    getMessages(state, action: PayloadAction<MessageItem>) {
      const index = state.messages.findIndex((i) => {
        return i.room.id === action.payload.room.id;
      });
      state.messages[index].messages === action.payload.messages;
    },
    addMessage(state, action: PayloadAction<MessageRoom>) {
      console.log(action.payload);
      const index = state.messages.findIndex((i) => {
        return i.room.id === action.payload.room.id;
      });
      state.messages[index].messages = [
        ...state.messages[index].messages,
        action.payload.message,
      ];
    },
  },
  extraReducers(builder) {
    builder.addMatcher(
      authApi.endpoints.getConversation.matchFulfilled,
      (state, action) => {
        const data = action.payload.metadata;
        socket.emit("join_conversation", data);
        const a = data.map((item: object) => {
          return {
            ...item,
            messages: [],
          };
        });
        state.messages = a;
      }
    );
    builder.addMatcher(
      authApi.endpoints.getMessagesInConversation.matchFulfilled,
      (state, action) => {
        const index = state.messages.findIndex((i) => {
          return i.room.id === action.payload.metadata.room.id;
        });
        state.messages[index].messages = action.payload.metadata.messages;
      }
    );
  },
});
export const messageReducer = messageSlice.reducer;
export const selectMessage = (state: RootState) => state.message.messages;
export const selectMessageRoom = (roomId: string | undefined) => {
  return createSelector(selectMessage, (messages) =>
    messages.find((item) => {
      return item.room.id === roomId;
    })
  );
};
export const selectRecentRoom = () => {
  return createSelector(selectMessage, (messages) =>
    messages.find((item, index) => {
      return index === 0;
    })
  );
};
export const { resetMessageState, setMessages, getMessages, addMessage } =
  messageSlice.actions;
