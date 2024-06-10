import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./base";

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    login: build.mutation({
      query: ({ email, password }) => ({
        url: `auth/user/signin`,
        method: "POST",
        body: { email, password },
      }),
    }),
    verifyToken: build.mutation({
      query: () => ({
        url: `auth/user/verify`,
        method: "POST",
      }),
    }),
    getConversation: build.query({
      query: () => ({
        url: `conversation`,
        method: "GET",
      }),
    }),
    getMessagesInConversation: build.query({
      query: (conversationId) => ({
        url: `message/conversation/${conversationId}`,
        method: "GET",
      }),
    }),
  }),
});
export const {
  useLoginMutation,
  useVerifyTokenMutation,
  useLazyGetConversationQuery,
  useLazyGetMessagesInConversationQuery,
} = authApi;
export default authApi;
