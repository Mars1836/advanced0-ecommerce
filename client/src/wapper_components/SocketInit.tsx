import * as React from "react";
import { socket } from "../../socket.ts";
import { useDispatch, useSelector } from "react-redux";
import { selectUserAuth } from "../redux/slices/authSlice";
import { selectUsersInSocket } from "../redux/slices/socketSlice.ts";
import { NotiInfor, UserInfor } from "../interfaces/index.ts";
import {
  MessageItem,
  addMessage,
  setMessages,
} from "../redux/slices/messageSlice.ts";
import { addNoti } from "../redux/slices/notiSlice.ts";
type Props = {
  children: unknown;
};
export default function SocketInit({ children }: Props) {
  const user = useSelector(selectUserAuth);
  const dispatch = useDispatch();
  const usersChat = useSelector(selectUsersInSocket);
  React.useEffect(() => {
    socket.on("connect", () => {});

    socket.on("hello", (ms: string) => {
      console.log(ms);
    });
    socket.on(
      "notification",
      ({
        _id,
        type,
        senderType,
        senderId,
        title,
        content,
        createAt,
        isRead,
        thumb = "",
      }) => {
        const noti: NotiInfor = {
          _id,
          type,
          senderType,
          senderId,
          title,
          content,
          createAt,
          isRead,
          thumb,
        };
        dispatch(addNoti(noti));
      }
    );
    socket.on("private_message", (ms) => {
      dispatch(addMessage(ms));
    });
  }, []);
  // React.useEffect(() => {
  //   console.log(messagesConversation);
  //   socket.emit("join_conversation", messagesConversation);
  // }, messagesConversation);
  React.useEffect(() => {
    if (!user) return;
    // socket.onAny((event, ...args) => {
    //   console.log(event, args);
    // });

    if (user) {
      socket.auth = { email: user.email, name: user.name, _id: user._id };
      socket.connect();
    }
    function filterUsers(usersList: UserInfor[]) {
      return usersList.filter((item: UserInfor, index: number) => {
        return (
          usersList.findIndex((i: UserInfor) => {
            return i.email === item.email;
          }) === index && item.email !== user?.email
        );
      });
    }

    const u = filterUsers(usersChat);
    const messages: MessageItem[] = u.map((i: UserInfor) => {
      return {
        room: {
          id: i.email,
          name: i.name,
          avatar: "",
        },
        messages: [],
      };
    });
    console.log(usersChat);
    dispatch(setMessages(messages));
  }, [user, usersChat]);
  React.useEffect(() => {}, [user, dispatch]);
  return <>{children}</>;
}
