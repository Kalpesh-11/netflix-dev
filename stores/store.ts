import profilesReducer from "@/slices/profilesSlice";
import { configureStore } from "@reduxjs/toolkit";
export function profileStore() {
  return configureStore({
    reducer: {
      profiles: profilesReducer,
    },
  });
}
export const store = profileStore();
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
