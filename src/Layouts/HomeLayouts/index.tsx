import { Footer, Header } from "@/Components";
import { Outlet } from "react-router-dom";

export const HomeLayouts = () => {
   return (
      <>
         <Header />
         <div className="page">
            <Outlet />
            <Footer />
         </div>
      </>
   );
};
