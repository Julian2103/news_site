import { getIsLightTheme } from "@/store/selectors";
import { useSelector } from "react-redux";

export const Home = () => {
   const isLightTheme = useSelector(getIsLightTheme);
   return (
      <div style={{ color: isLightTheme ? "black" : "white" }}>
         Please, register to see news
      </div>
   );
};
