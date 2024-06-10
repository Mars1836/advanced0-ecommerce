import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
export const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:4000/v1/api",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const { refreshToken, accessToken, user } = (getState() as RootState).auth;
    headers.set(
      "x-api-key",
      "a21c3f0102ad033326f4b452220a9c6877b5faa860629dd887678dbdef206956b82c429056b78d1ec3b3b1215ebf9044fd9d1efd31b72fa043096510393bcd2a"
    );
    if (user?._id) {
      headers.set("x-u-id", user._id);
    }
    if (accessToken) {
      headers.set("s-authorization", accessToken);
    }
    if (refreshToken) {
      headers.set("u-refreshtoken", refreshToken);
    }
    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn = async (
  args,
  api,
  extraOptions
) => {
  const result = await baseQuery(args, api, extraOptions);
  // const refreshResult = await baseQuery(
  //   {
  //     url: "/auth/user/handle-refresh-token",
  //     method: "POST",
  //     body: { refreshToken: api.getState().auth.refreshToken },
  //   },
  //   api,
  //   extraOptions
  // );
  // if (result?.error?.status === 401) {
  //   console.log("sending refresh token");
  //   // send refresh token to get new access token
  //   const refreshResult = await baseQuery(
  //     {
  //       url: "/auth/user/handle-refresh-token",
  //       method: "POST",
  //       body: { refreshToken: api.getState().auth.refreshToken },
  //     },
  //     api,
  //     extraOptions
  //   );
  //   console.log(refreshResult);

  //   // if (refreshResult?.data) {
  //   //   const user = api.getState().auth.user;
  //   //   // store the new token
  //   //   api.dispatch(setCredentials({ ...refreshResult.data, user }));
  //   //   // retry the original query with new access token
  //   // result = await baseQuery(args, api, extraOptions);
  // } else {
  //   // api.dispatch(logOut());
  // }

  return result;
};
