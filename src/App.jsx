import { Route, Routes } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwt_decode(token);

        // Check if token is expired
        const isExpired = decoded.exp && Date.now() >= decoded.exp * 1000;

        if (!isExpired) {
          setUser({
            id: decoded.id,
            name: decoded.name,
            email: decoded.email,
          });
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem("token");
        }
      } catch (error) {
        console.error("Token decoding failed:", error);
      }
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home user={user} isAuthenticated={isAuthenticated}/>} />
        {isAuthenticated && (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<Signup />} />
          </>
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
