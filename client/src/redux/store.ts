import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authApi from "./slices/authApi";
import { authReducer } from "./slices/authSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { socketReducer } from "./slices/socketSlice";
import { messageReducer } from "./slices/messageSlice";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { notiReducer } from "./slices/notiSlice";
import notiApi from "./slices/notiApi";

const reducers = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [notiApi.reducerPath]: notiApi.reducer,
  auth: authReducer,
  socket: socketReducer,
  noti: notiReducer,
  message: messageReducer,
});
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};
const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(authApi.middleware, notiApi.middleware),
});
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
