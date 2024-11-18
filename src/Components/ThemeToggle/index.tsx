import { useEffect } from "react";
import "./index.css";
import { useToggle } from "@/Helpers";

export const ThemeToggle = () => {
   const [darkTheme, toggleTheme] = useToggle(false);
   // Эффект для применения класса к body при изменении темы
   useEffect(() => {
      if (darkTheme) {
         document.body.classList.add("light-theme");
         document.body.classList.remove("dark-theme");
      } else {
         document.body.classList.add("dark-theme");
         document.body.classList.remove("light-theme");
      }
   }, [darkTheme]);

   // Функция для переключения темы

   return (
      <div className="theme-toggle">
         <span>LIGHT THEME</span>
         <label className="switch">
            <input type="checkbox" checked={darkTheme} onChange={toggleTheme} />
            <span className="slider round"></span>
         </label>
      </div>
   );
};
