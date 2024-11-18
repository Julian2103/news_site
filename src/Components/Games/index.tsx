import "./index.css";
import { CardList, Pagination, SearchBar } from "../../Components";
import { useState } from "react";
import { getDataCount } from "@/store/selectors";
import { useSelector } from "react-redux";

export const Games = () => {
   const [currentPage, setCurrentPage] = useState(1);
   const countOfcards = useSelector(getDataCount);
   const totalPages = Math.ceil(countOfcards / 12);

   return (
      <div className="games">
         <SearchBar />
         <CardList page={currentPage} />
         <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
         />
      </div>
   );
};
