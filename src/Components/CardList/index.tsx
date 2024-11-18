import { useFetch } from "@/Helpers";
import { ObjectArcticle } from "@/types";
import { ArticleItem } from "../ArticleItem";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import {
   getChooseParam,
   getIsLightTheme,
   getSearchValue,
   getSelectParam,
   getThemeArticle,
   getThemeNews,
} from "@/store/selectors";
import { useEffect, useState } from "react";
import { setDataCount } from "@/store/slices/dataResults";
type Props = {
   page: number;
};

export const CardList = ({ page }: Props) => {
   const [dayToday, SetDay] = useState<string>("");
   const [weekAgo, SetWeek] = useState<string>("");
   const [monthAgo, SetMonth] = useState<string>("");
   const [yearAgo, SetYear] = useState<string>("");

   const isLightTheme = useSelector(getIsLightTheme);
   const dispatch = useDispatch();

   const offset = (page - 1) * 12;
   const storeArticle = useSelector(getThemeArticle);
   const storeNews = useSelector(getThemeNews);
   const storeSearchValue = useSelector(getSearchValue);
   const whatParamSelectSort = useSelector(getSelectParam);

   const { day, week, month, year } = useSelector(getChooseParam);
   const baseUrl = `https://api.spaceflightnewsapi.net/v4/`;

   useEffect(() => {
      const today = new Date();
      today.setUTCHours(0, 0, 0, 0); // Устанавливаем время в 00:00:00 UTC
      const todayUTC = today.toISOString(); // Преобразуем в формат ISO 8601 (UTC)
      SetDay(todayUTC);

      const lastWeek = new Date(today);
      lastWeek.setDate(today.getDate() - 7); // Отнимаем 7 дней
      const formattedDate = lastWeek.toISOString();
      SetWeek(formattedDate);

      const lastMonth = new Date(today);
      lastMonth.setDate(today.getDate() - 30); // Отнимаем 30 дней
      const formattedDateMonth = lastMonth.toISOString();
      SetMonth(formattedDateMonth);

      const lastYear = new Date(today);
      lastYear.setFullYear(today.getFullYear() - 1); // Отнимаем 1 год
      const formattedDateYear = lastYear.toISOString();
      SetYear(formattedDateYear);
   }, []);
   const sortParam =
      whatParamSelectSort === "a-z"
         ? "title"
         : whatParamSelectSort === "z-a"
         ? "-title"
         : whatParamSelectSort === "d_z-a"
         ? "published_at"
         : whatParamSelectSort === "d_a-z"
         ? "-published_at"
         : "";
   const { data, error, loading } = useFetch<ObjectArcticle>(
      storeArticle
         ? `${baseUrl}articles/?limit=12&offset=${offset}&ordering=${sortParam}&published_at_gte=${
              day
                 ? dayToday
                 : week
                 ? weekAgo
                 : month
                 ? monthAgo
                 : year
                 ? yearAgo
                 : ""
           }&search=${storeSearchValue ?? ""}`
         : storeNews
         ? `${baseUrl}blogs/?limit=12&offset=${offset}&ordering=${sortParam}&published_at_gte=${
              day
                 ? dayToday
                 : week
                 ? weekAgo
                 : month
                 ? monthAgo
                 : year
                 ? yearAgo
                 : ""
           }&search=${storeSearchValue ?? ""}`
         : ""
   );

   useEffect(() => {
      dispatch(setDataCount(data?.count));
   }, [data?.count, dispatch]);

   if (loading) {
      return (
         <h3 style={{ color: isLightTheme ? "black" : "white" }}>Loading...</h3>
      );
   }
   if (error) {
      return <h3>No games</h3>;
   }

   return (
      <ul className="cardWrapper">
         {data &&
            data.results.map((article) => {
               return (
                  <li key={article.id}>
                     <ArticleItem {...article} />
                  </li>
               );
            })}
      </ul>
   );
};
