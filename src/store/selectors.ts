import { RootState } from "./store";

export const getThemeArticle = (state: RootState) => state.theme.article;
export const getThemeNews = (state: RootState) => state.theme.news;
export const getDataCount = (state: RootState) =>
   state.data.dataResultsCountGlobal;
export const getIsLightTheme = (state: RootState) =>
   state.themeColorGlobal.value;
export const getChooseParam = (state: RootState) =>
   state.chooseParam.objectButtonsValue;
export const getSearchValue = (state: RootState) => state.theme.search;
export const getSelectParam = (state: RootState) => state.theme.selectParam;
export const getUserName = (state: RootState) =>
   state.userNameState.isUserName.userName;
export const getIsUser = (state: RootState) =>
   state.userNameState.isUserName.isUser;
