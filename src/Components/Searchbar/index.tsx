import React, { useState } from "react";
import "./index.css";
import { clsx } from "clsx";
import { SearchByDate } from "../../Components";
import { useDispatch, useSelector } from "react-redux";
import { setArticleStore, setArticleNews } from "@/store/slices/chooseTheme";
import { getIsLightTheme } from "@/store/selectors";
export const SearchBar = () => {
   const [article, setAticle] = useState(true);
   const [news, setNews] = useState(false);
   const colorGlobalIsLight = useSelector(getIsLightTheme);
   const dispatch = useDispatch();

   const handleChange = (e: React.MouseEvent<HTMLButtonElement>) => {
      const target = e.target as HTMLButtonElement;
      const value = target.value;

      if (value === "article") {
         dispatch(setArticleStore(true));
         dispatch(setArticleNews(false));
         setAticle(true);
         setNews(false);
      } else {
         dispatch(setArticleStore(false));
         dispatch(setArticleNews(true));
         setAticle(false);
         setNews(true);
      }
   };

   return (
      <div className="">
         <h1 className={clsx(colorGlobalIsLight ? "hDark" : "hLight")}>Blog</h1>
         {/* className={clsx("button-search",date === "day" && "active",date!=='day'&&colorGlobalIsLight&&'lightBtn')} */}
         <div className="buttons">
            <button
               className={clsx(
                  "article",
                  article && "active",
                  colorGlobalIsLight ? "artLight" : ""
               )}
               onClick={handleChange}
               value="article"
            >
               Arcticles
            </button>
            <button
               className={clsx(
                  "news",
                  news && "active",
                  colorGlobalIsLight ? "newsLight" : ""
               )}
               onClick={handleChange}
            >
               News
            </button>
         </div>

         <SearchByDate />
      </div>
   );
};
