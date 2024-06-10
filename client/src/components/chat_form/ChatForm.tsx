import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "./chat_form.module.scss";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// interface Props {}
import SendIcon from "@mui/icons-material/Send";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../../../socket";
import { generateId } from "../../utils/index";
import {
  MessageItem,
  MessageRoom,
  Room,
  addMessage,
  selectMessage,
  selectMessageRoom,
} from "../../redux/slices/messageSlice";
import { selectUserAuth } from "../../redux/slices/authSlice";
import { useLazyGetMessagesInConversationQuery } from "../../redux/slices/authApi";
import { AxiosInstance } from "../../configs/axios.config";
const url =
  "https://i.natgeofe.com/n/4f5aaece-3300-41a4-b2a8-ed2708a0a27c/domestic-dog_thumb_square.jpg";
//
const cx = classNames.bind(styles);
const ChatForm = () => {
  const [up, setUp] = useState(true);
  const dispatch = useDispatch();
  const userAuth = useSelector(selectUserAuth);
  const [messageContent, setMessageContent] = useState("");
  const lastMessageRef = useRef<HTMLInputElement>(null);
  const [room, setRoom] = useState<Room>();
  const messageState = useSelector(selectMessage);
  const messageItem = useSelector(selectMessageRoom(room?.id));
  const [getMessagesInConversation] = useLazyGetMessagesInConversationQuery();
  function handleUp() {
    setUp(!up);
  }
  async function postMessage(roomId: string, content: string, type: "text") {
    AxiosInstance.post("/message/send", {
      conversationId: roomId,
      content: content,
      type,
    });
  }
  function sendMyMessage() {
    if (!room || !userAuth) {
      return;
    }

    const ms: MessageRoom = {
      room: room,
      message: {
        user: userAuth,
        createdAt: new Date().toString(),
        content: messageContent,
        isSender: true,
        type: "text",
      },
    };
    socket.emit("private_message", ms);
    dispatch(addMessage(ms));
    postMessage(room.id, messageContent, "text");
    setMessageContent("");
  }
  function handleMessageContent(e: React.ChangeEvent<HTMLInputElement>) {
    setMessageContent(e.target.value);
  }
  function scrollToLastMessage() {
    lastMessageRef.current?.scrollIntoView({ behavior: "instant" });
  }
  function handleRoom(room: Room) {
    setRoom(room);
  }

  useEffect(() => {
    scrollToLastMessage();
  }, [messageItem]);
  useEffect(() => {
    if (room) getMessagesInConversation(room.id);
  }, [room]);
  return (
    <div className={cx("chat_form", { up: up })}>
      <div className={cx("chat_form_header")}>
        <div>
          <h3>Chat</h3>
        </div>
        <div>
          <button onClick={handleUp}>
            <KeyboardArrowDownIcon></KeyboardArrowDownIcon>
          </button>
        </div>
      </div>
      <div className={cx("chat_form_body")}>
        <div className={cx("chat_form_left_side")}>
          {messageState.map((item: MessageItem, index) => {
            return (
              <div
                className={cx("user", { selected: item.room.id === room?.id })}
                key={index}
                onClick={() => {
                  handleRoom(item.room);
                }}
              >
                <div className={cx("user_image_wrapper")}>
                  <img src={url} alt="" className={cx("user_avatar")} />
                </div>
                <div className={cx("user_name_wrapper")}>
                  <p className={cx("user_name")}>{item.room.name}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className={cx("chat_form_right_side")}>
          <div className={cx("form_chat_content")}>
            {!!messageItem?.messages?.length &&
              messageItem?.messages?.length > 0 &&
              messageItem.messages.map((ms, index) => {
                const key = generateId();
                return ms.isSender ? (
                  <div key={index} className={cx("message_wrapper", "right")}>
                    <div className={cx("message")}>
                      <p>{ms.content}</p>
                    </div>
                  </div>
                ) : (
                  <div key={key} className={cx("message_wrapper")}>
                    <div className={cx("message_sub_wrapper")}>
                      <div className={cx("avatar")}>
                        <img src={ms.user.avatar || url} alt="" />
                      </div>

                      <div>
                        <p className={cx("name")}>{ms.user.name}</p>
                        <div className={cx("message")}>
                          <p>{ms.content}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            <div ref={lastMessageRef}></div>
          </div>
          <div className={cx("form_chat_input")}>
            <input
              type="text"
              value={messageContent}
              onChange={handleMessageContent}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMyMessage();
                }
              }}
            />
            <div>
              <button>
                <SendIcon onClick={sendMyMessage} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChatForm;
