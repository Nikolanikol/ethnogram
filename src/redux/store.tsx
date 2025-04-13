import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/UserSlice/UserSlice";
import { UserState } from "../slices/UserSlice/UserType";
export const store = configureStore<{
  userReducer: UserState;
}>({
  reducer: {
    userReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {mangaReduser: MangaState}
export type AppDispatch = typeof store.dispatch;
