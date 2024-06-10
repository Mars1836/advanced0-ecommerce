import axios from "axios";

class AuthService {
  // getToken(): { "u-accesstoken": string } | Record<string, never> {
  //   try {
  //     const userStr = localStorage.getItem("user");
  //     if (userStr) {
  //       const user = JSON.parse(userStr);
  //       if (user && user.accessToken) {
  //         return { "u-accesstoken": user.accessToken };
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Failed to parse user from localStorage", error);
  //   }
  //   return {};
  // }
  // login(username: string, password: string) {
  //   return axios
  //     .post(API_URL + "signin", { username, password })
  //     .then((response) => {
  //       if (response.data.accessToken) {
  //         localStorage.setItem("user", JSON.stringify(response.data));
  //       }
  //       return response.data;
  //     });
  // }
}
export default AuthService;
