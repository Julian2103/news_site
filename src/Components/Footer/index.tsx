
import { ThemeToggle } from "../ThemeToggle";
import "./index.css";

export const Footer = () => {
   return (
      <div className="footer">
         <p style={{ maxWidth: "max-content",marginBottom:0}}>©2022 Blogolog</p>
         <ThemeToggle/>
      </div>
   );
};
