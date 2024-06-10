export interface AuthState {
  user: UserInfor | null;
  accessToken: string;
  refreshToken: string;
}
export interface SocketState {
  users: Array<UserInfor>;
}
export interface NotiState {
  list: Array<NotiInfor>;
}
export interface NotiInfor {
  _id: string;
  type: string;
  senderType: string;
  senderId: string;
  title: string;
  content: string;
  createAt: Date;
  thumb: string;
  isRead: boolean;
}
export interface UserInfor {
  _id: string;
  email: string;
  name: string;
  avatar: string | null;
}
