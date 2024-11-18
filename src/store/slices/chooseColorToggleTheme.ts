import { createSlice } from "@reduxjs/toolkit";

const initialState: { value: boolean } = {
   value: false,
};
export const chooseColorToggleTheme = createSlice({
   name: "themeColorGlobal",
   initialState,
   reducers: {
      setIsLightTheme: (state) => {
         state.value = !state.value;
      },
   },
});
export const { setIsLightTheme } = chooseColorToggleTheme.actions;
export default chooseColorToggleTheme.reducer;
