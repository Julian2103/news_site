import React, { useState } from "react";
import "./index.css";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { getIsLightTheme } from "@/store/selectors";
import { Select } from "../../Components";
import { setChoosePeriod } from "@/store/slices/chooseFetchDate";
import { getChooseParam } from "@/store/selectors";

export const SearchByDate = () => {
   const [date, setDate] = useState<string>();
   const colorGlobalIsLight = useSelector(getIsLightTheme);
   const dispatch = useDispatch();
   const activePeriod = useSelector(getChooseParam);

   const handleChange = (e: React.MouseEvent<HTMLButtonElement>) => {
      const target = e.target as HTMLButtonElement;
      const newValue = target.value as keyof typeof activePeriod;
      if (activePeriod[newValue]) {
         // Если кнопка уже активна, деактивировать её
         setDate("");
         dispatch(setChoosePeriod(newValue));
      } else {
         // Иначе активировать новую кнопку
         setDate(newValue);
         dispatch(setChoosePeriod(newValue));
      }
   };
   return (
      <div className="wrapper-buttons-select">
         <div className="wrapper-button">
            <button
               className={clsx(
                  "button-search",
                  date === "day" && "active",
                  date !== "day" && colorGlobalIsLight && "lightBtn"
               )}
               onClick={handleChange}
               value={"day"}
            >
               day
            </button>
            <button
               className={clsx(
                  "button-search",
                  date === "week" && "active",
                  date !== "week" && colorGlobalIsLight && "lightBtn"
               )}
               onClick={handleChange}
               value={"week"}
            >
               week
            </button>
            <button
               className={clsx(
                  "button-search",
                  date === "month" && "active",
                  date !== "month" && colorGlobalIsLight && "lightBtn"
               )}
               onClick={handleChange}
               value={"month"}
            >
               mounth
            </button>
            <button
               className={clsx(
                  "button-search",
                  date === "year" && "active",
                  date !== "year" && colorGlobalIsLight && "lightBtn"
               )}
               onClick={handleChange}
               value={"year"}
            >
               year
            </button>
         </div>
         <Select />
      </div>
   );
};
