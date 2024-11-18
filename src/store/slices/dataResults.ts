
import { createSlice } from "@reduxjs/toolkit";

const initialState: { dataResultsCountGlobal: number } = {
   dataResultsCountGlobal: 0,
};
export const dataResults = createSlice({
   name: "data",
   initialState,
   reducers: {
      setDataCount: (state, action) => {
         state.dataResultsCountGlobal = action.payload;
      },
   },
});
export const { setDataCount } = dataResults.actions;
export default dataResults.reducer;
