import { Navigate, Route, Routes } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import "./App.css";
import { useEffect, useState } from "react";
import Chat from "./pages/Chat";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token, { header: true });

        // Check if token is expired
        const isExpired = decoded.exp && Date.now() >= decoded.exp * 1000;

        if (!isExpired) {
          setUser(decoded);
          setIsAuthenticated(true);
          localStorage.setItem("token", token);
        } else {
          setToken(null);
          localStorage.removeItem("token");
        }
      } catch (error) {
        console.error("Token decoding failed:", error);
      }
    }
  }, [token]);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated && user ? <Chat user={user}/> : <Home/>}
        />
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/" />
            ) : (
              <Login setToken={setToken} />
            )
          }
        />
        <Route
          path="/sign-up"
          element={isAuthenticated ? <Navigate to="/" /> : <Signup />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
