import { dataResultsType } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: { objectButtonsValue: dataResultsType } = {
   objectButtonsValue: {
      day: false,
      week: false,
      month: false,
      year: false,
   },
};
export const chooseParam = createSlice({
   name: "chooseParam",
   initialState,
   reducers: {
     setChoosePeriod: (state, action: { payload: keyof dataResultsType }) => {
       const currentValue = state.objectButtonsValue[action.payload];
 
       // Если значение уже true, сбросить только выбранный период
       if (currentValue) {
         state.objectButtonsValue[action.payload] = false;
       } else {
         // Иначе сбросить все и установить выбранное значение в true
         Object.keys(state.objectButtonsValue).forEach((key) => {
           state.objectButtonsValue[key as keyof dataResultsType] = false;
         });
         state.objectButtonsValue[action.payload] = true;
       }
     },
   },
 });
export const { setChoosePeriod } = chooseParam.actions;
export default chooseParam.reducer;
