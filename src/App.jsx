import { Navigate, Route, Routes } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import { useEffect, useState } from "react";
import Chat from "./pages/Chat";
import PageLoader from "./components/PageLoader";
import "./App.css";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);

        // Check if token is expired
        const isExpired = decoded.exp && Date.now() >= decoded.exp * 1000;

        if (!isExpired) {
          setUser(decoded);
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
          element={
            token ? user ? <Chat user={user} /> : <PageLoader /> : <Home />
          }
        />
        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <Login setToken={setToken} />}
        />
        <Route
          path="/sign-up"
          element={user ? <Navigate to="/" /> : <Signup />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
