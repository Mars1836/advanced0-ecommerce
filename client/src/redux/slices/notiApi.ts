import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./base";

const notiApi = createApi({
  reducerPath: "notiApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    getNoti: build.query({
      query: () => ({
        url: `notification/all`,
        method: "GET",
      }),
    }),
  }),
});
export const { useLazyGetNotiQuery } = notiApi;
export default notiApi;
