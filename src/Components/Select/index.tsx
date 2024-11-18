import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { getIsLightTheme } from "@/store/selectors";
import { setSelectParam } from "@/store/slices/chooseTheme";
export const Select = () => {
   const dispatch = useDispatch();
   const colorGlobalIsLight = useSelector(getIsLightTheme);
   const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      dispatch(setSelectParam(event.target.value));
   };

   return (
      <div
         className="wrapper-select"
         tabIndex={0}
         style={{ backgroundColor: colorGlobalIsLight ? "white" : "" }}
      >
         <label htmlFor="sort-select" className="select-label">
            Sort by:
         </label>
         <select
            id="sort-select"
            className="select-dropdown"
            onChange={handleChange}
            style={{
               backgroundColor: colorGlobalIsLight ? "white" : "",
               color: colorGlobalIsLight ? "black" : "",
            }}
         >
            <option
               value="a-z"
               style={{
                  color: colorGlobalIsLight ? "black" : "",
                  backgroundColor: colorGlobalIsLight ? "white" : "",
               }}
            >
               Title(a-z)
            </option>
            <option
               value="z-a"
               style={{
                  color: colorGlobalIsLight ? "black" : "",
                  backgroundColor: colorGlobalIsLight ? "white" : "",
               }}
            >
               Title(z-a)
            </option>
            <option
               value="d_z-a"
               style={{
                  color: colorGlobalIsLight ? "black" : "",
                  backgroundColor: colorGlobalIsLight ? "white" : "",
               }}
            >
               Date(z-a)
            </option>
            <option
               value="d_a-z"
               style={{
                  color: colorGlobalIsLight ? "black" : "",
                  backgroundColor: colorGlobalIsLight ? "white" : "",
               }}
            >
               Date(a-z)
            </option>
         </select>
      </div>
   );
};
