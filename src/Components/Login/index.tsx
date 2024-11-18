import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { getIsLightTheme } from "@/store/selectors";
import { setUserName, setUserStatus } from "@/store/slices/setUserName";
import { routes } from "@/Routes";
export const Login = () => {
   const inputUserName = useRef<HTMLInputElement | null>(null);
   const inputUserPassword = useRef<HTMLInputElement | null>(null);
   const isLightTheme = useSelector(getIsLightTheme);
   const [username, setUsername] = useState("");
   const [isRegistered, setIsRegistered] = useState(false);
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   const [errorMessage, setErrorMessage] = useState("");
   const dispatch = useDispatch();
   const navigate = useNavigate();
   useEffect(() => {
      // Проверка, если пользователь уже сохранён в localStorage и входит автоматически
      const savedUsername = localStorage.getItem("currentUser");
      if (savedUsername && localStorage.getItem(savedUsername)) {
         setUsername(savedUsername);
         dispatch(setUserName(savedUsername));
         dispatch(setUserStatus(true));
         setIsLoggedIn(true);
         setIsRegistered(true);
      }
   }, [dispatch]);

   const signInHandler = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const username = inputUserName.current?.value;
      const password = inputUserPassword.current?.value;

      if (username && password) {
         const storePassword = localStorage.getItem(username);
         if (storePassword === password) {
            dispatch(setUserName(username));
            dispatch(setUserStatus(true));
            setUsername(username);
            localStorage.setItem("currentUser", username);
            setIsLoggedIn(true);
            setErrorMessage("");
            navigate("/cards");
         } else {
            setErrorMessage("Invalid username or password");
         }
      } else {
         setErrorMessage("Please fill in all fields");
      }
   };
   const signUpHandler = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const username = inputUserName.current?.value;
      const password = inputUserPassword.current?.value;
      if (!username || !password) {
         setErrorMessage("Please fill in all fields");
         return;
      }
      if (localStorage.getItem(username)) {
         setErrorMessage("User already exists.");
      } else {
         localStorage.setItem(username, password);
         setIsRegistered(true);
         setErrorMessage("");
      }
   };
   const handleLogout = () => {
      dispatch(setUserStatus(false));
      dispatch(setUserName(""));
      localStorage.removeItem("currentUser");
      setIsLoggedIn(false);
      setUsername("");
   };

   return (
      <>
         {isLoggedIn ? (
            <div>
               <div
                  style={{
                     marginBottom: 32,
                  }}
               >
                  <Link to={routes.cards} style={{ textDecoration: "none" }}>
                     <p style={{ color: isLightTheme ? "black" : "white" }}>
                        Back to Home
                     </p>
                  </Link>
               </div>
               <h2 style={{ color: isLightTheme ? "black" : "white" }}>
                  Welcome back, {username}!
               </h2>
               <button
                  onClick={handleLogout}
                  style={{
                     backgroundColor: "#6e00e5",
                     color: "#fff",
                     padding: "10px 20px",
                     border: "none",
                     borderRadius: "4px",
                     cursor: "pointer",
                  }}
               >
                  Log Out
               </button>
            </div>
         ) : (
            <>
               <div
                  style={{
                     marginBottom: 32,
                  }}
               >
                  <Link to={routes.main} style={{ textDecoration: "none" }}>
                     <p style={{ color: isLightTheme ? "black" : "white" }}>
                        Back to Home
                     </p>
                  </Link>
               </div>
               <h1 style={{ color: isLightTheme ? "black" : "white" }}>
                  {isRegistered ? "Sing in" : "Sign up"}
               </h1>
               <form
                  onSubmit={isRegistered ? signInHandler : signUpHandler}
                  className="login-wrapper"
                  style={{
                     backgroundColor: isLightTheme ? "white" : "#45444b",
                  }}
               >
                  <div>
                     <p style={{ color: isLightTheme ? "black" : "white" }}>
                        UserName
                     </p>
                     <input
                        ref={inputUserName}
                        type="text"
                        placeholder="Your name"
                        style={{
                           backgroundColor: isLightTheme ? "white" : "#57565d",
                        }}
                     />
                  </div>
                  <div>
                     <p style={{ color: isLightTheme ? "black" : "white" }}>
                        Password
                     </p>
                     <input
                        ref={inputUserPassword}
                        type="password"
                        placeholder="Your password"
                        style={{
                           backgroundColor: isLightTheme ? "white" : "#57565d",
                        }}
                     />
                     {errorMessage && (
                        <p style={{ color: "red" }}>{errorMessage}</p>
                     )}
                  </div>
                  <div className="login-helper">
                     <button type="submit" className="sing-in-up-btn">
                        {isRegistered ? "Sign in" : "Sign up"}
                     </button>

                     {isRegistered ? (
                        <p style={{ color: "#57565d" }}>
                           Don't have any account?
                           <a
                              href="#signin"
                              style={{ color: "#6c1bdb" }}
                              onClick={() => {
                                 setIsRegistered(false);
                              }}
                           >
                              Sing up
                           </a>
                        </p>
                     ) : (
                        <p style={{ color: "#57565d" }}>
                           Already have an account?
                           <a
                              href="#signup"
                              style={{ color: "#6c1bdb" }}
                              onClick={() => {
                                 setIsRegistered(true);
                              }}
                           >
                              Sing in
                           </a>
                        </p>
                     )}
                  </div>
               </form>
            </>
         )}
      </>
   );
};
