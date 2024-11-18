import { setIsLightTheme } from "@/store/slices/chooseColorToggleTheme";
import { useState } from "react";
import { useDispatch } from "react-redux";

export const useToggle = (initialValue: boolean): [boolean, () => void] => {
   const [value, setValue] = useState(initialValue);
   const dispatch = useDispatch();
   const toggle = () => {
      dispatch(setIsLightTheme());
      setValue((prevValue) => !prevValue);
   };

   return [value, toggle];
};
