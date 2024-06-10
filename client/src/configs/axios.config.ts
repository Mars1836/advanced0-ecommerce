import axios from "axios";
export const AxiosInstance = axios.create();
type tokenType = string | null | undefined;
let ACCESS_TOKEN: tokenType = null;
let REFRESH_TOKEN: tokenType = null;
let USER_ID: tokenType = null;
export function configureAxios(
  accessToken: tokenType,
  refreshToken: tokenType,
  userId: tokenType
) {
  ACCESS_TOKEN = accessToken;
  REFRESH_TOKEN = refreshToken;
  USER_ID = userId;
  AxiosInstance.interceptors.request.use(
    (config) => {
      config.withCredentials = true;
      config.baseURL = "http://localhost:4000/v1/api";
      config.headers.set(
        "x-api-key",
        "a21c3f0102ad033326f4b452220a9c6877b5faa860629dd887678dbdef206956b82c429056b78d1ec3b3b1215ebf9044fd9d1efd31b72fa043096510393bcd2a"
      );
      if (USER_ID) config.headers.set("x-u-id", USER_ID);
      if (ACCESS_TOKEN) config.headers.set("u-authorization", ACCESS_TOKEN);
      if (REFRESH_TOKEN) config.headers.set("u-refreshtoken", REFRESH_TOKEN);
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
}
