import React, { useEffect } from "react";
import { configureAxios } from "../configs/axios.config";
import {
  selectAccessToken,
  selectRefressToken,
  selectUserAuth,
} from "../redux/slices/authSlice";
import {
  useLazyGetConversationQuery,
  useVerifyTokenMutation,
} from "../redux/slices/authApi";

import { useSelector } from "react-redux";
import { useLazyGetNotiQuery } from "../redux/slices/notiApi";
type Props = {
  children: unknown;
};

const Init: React.ComponentType<Props> = ({ children }: Props) => {
  const accessToken = useSelector(selectAccessToken);
  const refreshToken = useSelector(selectRefressToken);
  const user = useSelector(selectUserAuth);
  const [trigger] = useLazyGetConversationQuery();
  const [getNoti, { data }] = useLazyGetNotiQuery();
  const [verifyToken] = useVerifyTokenMutation();
  configureAxios(accessToken, refreshToken, user?._id);
  useEffect(() => {
    // getConversation();
    async function get() {
      await verifyToken({}).unwrap();
      await trigger({});
      await getNoti({});
    }
    if (accessToken) {
      get();
    }
  }, [accessToken]);
  useEffect(() => {
    console.log(data);
  }, [data]);
  return <>{children}</>;
};
export default Init;
