import { createSlice } from "@reduxjs/toolkit";

const initialState: {
   article: boolean;
   news: boolean;
   search: string;
   selectParam: string;
} = {
   article: true,
   news: false,
   search: "",
   selectParam: "a-z",
};
export const chooseTheme = createSlice({
   name: "theme",
   initialState,
   reducers: {
      setArticleStore: (state, action) => {
         state.article = action.payload;
      },
      setArticleNews: (state, action) => {
         state.news = action.payload;
      },
      setSearchValue: (state, action) => {
         state.search = action.payload;
      },
      setSelectParam: (state, action) => {
         state.selectParam = action.payload;
      },
   },
});
export const {
   setArticleStore,
   setArticleNews,
   setSearchValue,
   setSelectParam,
} = chooseTheme.actions;
export default chooseTheme.reducer;
