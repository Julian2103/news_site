import "./index.css";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useFetch } from "@/Helpers";
import { Articles } from "@/types";
import { faceBook, twitter } from "@/assets";
import { useSelector } from "react-redux";
import {
   getIsLightTheme,
   getThemeArticle,
   getThemeNews,
} from "@/store/selectors";
import { CoincidenceCards } from "../../Components";
import { routes } from "@/Routes";
export const Game = () => {
   const storeArticle = useSelector(getThemeArticle);
   const storeNews = useSelector(getThemeNews);
   const [titleSummary, setTitleSummary] = useState<string>();
   const isLightTheme = useSelector(getIsLightTheme);
   const { id } = useParams();
   const { data, error, loading } = useFetch<Articles>(
      storeArticle
         ? `https://api.spaceflightnewsapi.net/v4/articles/${id}/`
         : storeNews
         ? `https://api.spaceflightnewsapi.net/v4/blogs/${id}/`
         : ""
   );

   useEffect(() => {
      if (data) {
         setTitleSummary(data?.title);
      }
   }, [data]);
   if (!id) {
      return <h3>Error: ID is missing</h3>;
   }

   if (loading) {
      return <h3>Loading...</h3>;
   }
   if (!data || error) {
      return <h3>No games...</h3>;
   }

   return (
      <div className="wrapper-game">
         <div className="links-wrapper-routes">
            <Link
               to={routes.cards}
               style={{ color: isLightTheme ? "black" : "#f6e4c8" }}
            >
               Home/
            </Link>
            <Link
               to={routes.cardId(id)}
               style={{ color: isLightTheme ? "black" : "#f6e4c8" }}
            >
               game {id}
            </Link>
         </div>
         <h1 style={{ color: isLightTheme ? "black" : "white" }}>
            {data.title}
         </h1>
         <div className="image-wrapper-game">
            <img src={data.image_url} alt="" />
         </div>
         <div className="paragraph-game-summary">
            <p style={{ color: isLightTheme ? "black" : "white" }}>
               {data.summary}
            </p>
            <div className="wrapper-soc1als-game">
               <a href="">
                  <img src={faceBook} alt="" />
               </a>
               <a href="">
                  <img src={twitter} alt="" />
               </a>
               <a href="">...</a>
            </div>
         </div>
         {titleSummary && <CoincidenceCards titleSummary={titleSummary} />}
      </div>
   );
};
