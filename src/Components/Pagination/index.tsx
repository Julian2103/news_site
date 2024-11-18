import React from "react";
import "./index.css";
import clsx from "clsx";
import arrow from "../../assets/arrow.png";
import arrowDark from "../../assets/arrowDark.png";
import { useSelector } from "react-redux";
import { getIsLightTheme } from "@/store/selectors";

type Props = {
   currentPage: number;
   setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
   totalPages: number;
};

export const Pagination = ({
   currentPage,
   setCurrentPage,
   totalPages,
}: Props) => {
   const colorGlobalIsLight = useSelector(getIsLightTheme);

   const getPageNumbers = () => {
      const pageNumbers = [];

      // Первые 5 страниц
      for (let i = 1; i <= Math.min(5, totalPages); i++) {
         pageNumbers.push(i);
      }

      // Многоточие, если страниц больше 10
      if (totalPages > 10) {
         pageNumbers.push("...");

         // Добавление последней страницы
         pageNumbers.push(totalPages);
      }

      return pageNumbers;
   };

   const pageNumbers = getPageNumbers();

   return (
      <div className="wrapper-pagination">
         <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={clsx(
               "button-pagination",
               currentPage === 1 ? "disabled" : colorGlobalIsLight ? "dark" : ""
            )}
         >
            <img
               src={!colorGlobalIsLight ? arrow : arrowDark}
               alt=""
               className="arrow-rotate"
            />
            <span>Prev</span>
         </button>
         <ul className="list-wrapper">
            {pageNumbers.map((pageNumber, index) => (
               <li
                  key={index}
                  className={clsx(
                     currentPage === pageNumber
                        ? "active"
                        : colorGlobalIsLight
                        ? "dark"
                        : ""
                  )}
                  onClick={() =>
                     typeof pageNumber === "number" &&
                     setCurrentPage(pageNumber)
                  }
               >
                  {pageNumber}
               </li>
            ))}
         </ul>
         <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={clsx(
               "button-pagination",
               currentPage === totalPages
                  ? "disabled"
                  : colorGlobalIsLight
                  ? "dark"
                  : ""
            )}
         >
            <span>Next</span>
            <img src={!colorGlobalIsLight ? arrow : arrowDark} alt="" />
         </button>
      </div>
   );
};
