import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";

import {
   logo,
   searchBtn,
   user_icon,
   searchBtnBlack,
   burgerBtn,
} from "../../assets";

import "./index.css";

import { getIsLightTheme, getUserName } from "@/store/selectors";
import { setSearchValue } from "@/store/slices/chooseTheme";

import { debounce } from "@/Helpers";
import { Link } from "react-router-dom";
import { setUserName, setUserStatus } from "@/store/slices/setUserName";
import { routes } from "../../Routes";
export const Header = () => {
   const dispatch = useDispatch();
   const storeUserName = useSelector(getUserName);

   const inputRef = useRef<HTMLInputElement>(null);
   const colorGlobalIsLight = useSelector(getIsLightTheme);

   useEffect(() => {
      const savedUsername = localStorage.getItem("currentUser");
      if (savedUsername && localStorage.getItem(savedUsername)) {
         dispatch(setUserName(savedUsername));
         dispatch(setUserStatus(true));
      }
   }, [dispatch]);

   const hangleCLick = () => {
      if (!inputRef.current) return;
      inputRef.current.classList.toggle("active");
   };

   const onInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
      dispatch(setSearchValue((e.target as HTMLInputElement).value));
   };
   const innerBlock = useRef<HTMLDivElement>(null);
   const infoBlock = useRef<HTMLDivElement>(null);
   const isvisible = () => {
      if (innerBlock.current && infoBlock.current) {
         innerBlock.current.classList.toggle("hidden_mobile");
         infoBlock.current.classList.toggle("hidden_mobile");
      }
   };

   return (
      <div
         className={clsx(
            colorGlobalIsLight
               ? "wrapper-header lightWrapper"
               : "wrapper-header"
         )}
      >
         <div className="wrapper-logo-burger">
            <img src={logo} alt="" width={167} height={56} />
            <button className="visuall_mobile" onClick={isvisible}>
               <img src={burgerBtn} alt="" />
            </button>
         </div>

         <div className="inner-search-input hidden_mobile" ref={innerBlock}>
            <button className="search_button" onClick={hangleCLick}>
               <img
                  src={colorGlobalIsLight ? searchBtnBlack : searchBtn}
                  alt=""
               />
            </button>

            <input
               type="text"
               placeholder="Search...."
               className="input_search active"
               ref={inputRef}
               onKeyUp={debounce(onInput, 700)}
            />
         </div>

         <div className="info hidden_mobile" ref={infoBlock}>
            <Link to={routes.login}>
               <button className="rectangle">
                  <img src={user_icon} alt="" />
               </button>
            </Link>
            <div>
               <p
                  style={{
                     color: colorGlobalIsLight ? "black" : "white",
                  }}
               >
                  {storeUserName ? storeUserName : "Sign in"}
               </p>
            </div>
         </div>
      </div>
   );
};
