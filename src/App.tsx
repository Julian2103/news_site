import "./normalize.css";
import "./index.css";
import { Games, Game, Login, Home } from "./Components";
import { Routes, Route } from "react-router-dom";
import { HomeLayouts, PrivateLayouts } from "./Layouts";
import { routes } from "./Routes";

function App() {
   return (
      <>
         <Routes>
            <Route element={<HomeLayouts />}>
               <Route path={routes.main} element={<Home />} />
               <Route path={routes.login} element={<Login />} />
               <Route element={<PrivateLayouts />}>
                  <Route path={routes.cards} element={<Games />} />
                  <Route path={routes.card} element={<Game />} />
               </Route>
            </Route>
         </Routes>
      </>
   );
}

export default App;
