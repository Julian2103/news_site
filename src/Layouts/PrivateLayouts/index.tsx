import { routes } from "@/Routes";
import { getIsUser } from "@/store/selectors";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

export const PrivateLayouts = () => {
   const isUser = useSelector(getIsUser);
   const navigate = useNavigate();
   useEffect(() => {
      if (!isUser) {
         navigate(routes.login);
      }
   }, [isUser, navigate]);
   return (
      <div>
         <Outlet />
      </div>
   );
};
