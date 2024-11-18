import "./index.css";
import { Articles } from "@/types";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getIsLightTheme } from "@/store/selectors";
import clsx from "clsx";
import { routes } from "@/Routes";
type ArticleItemProps = Articles;
export const ArticleItem = ({
   id,
   title,
   image_url,
   published_at,
}: ArticleItemProps) => {
   const colorGlobalIsLight = useSelector(getIsLightTheme);
   const date = new Date(published_at);
   const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
   });
   return (
      <div className="itemWrapper">
         <Link to={routes.cardId(id)}>
            <div className="card-gradientWrapper">
               <div className="card-gradient"></div>
               <img src={image_url} alt="" id={JSON.stringify(id)} />
            </div>
         </Link>
         <div className={clsx(!colorGlobalIsLight ? "wrapperDate" : "light")}>
            <time style={{ color: "grey" }}>{formattedDate}</time>
            <h2
               style={{ fontSize: 18 }}
               className={colorGlobalIsLight ? "isLightParagraph" : ""}
            >
               {title}
            </h2>
         </div>
      </div>
   );
};
