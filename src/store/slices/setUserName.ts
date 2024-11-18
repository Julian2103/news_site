import { User } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: { isUserName: User } = {
   isUserName: {
      userName: "",
      isUser: false,
   },
};
export const isUserName = createSlice({
   name: "userNameState",
   initialState,
   reducers: {
      setUserName: (state, action:PayloadAction<string>) => {
         state.isUserName.userName = action.payload;
      },
      setUserStatus: (state, action:PayloadAction<boolean>) => {
         state.isUserName.isUser = action.payload;
      },
   },
});
export const { setUserName, setUserStatus } = isUserName.actions;
export default isUserName.reducer;
