import { configureStore } from "@reduxjs/toolkit";

import chooseTheme from "./slices/chooseTheme";
import dataResults from "./slices/dataResults";
import chooseColorToggleTheme from "./slices/chooseColorToggleTheme";
import chooseParam from "./slices/chooseFetchDate";
import isUserName from "./slices/setUserName";

export const store = configureStore({
   reducer: {
      theme: chooseTheme,
      data: dataResults,
      themeColorGlobal: chooseColorToggleTheme,
      chooseParam: chooseParam,
      userNameState: isUserName,
   },
});
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
