import { useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

const Login = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userLogin),
        },
      );

      if (!response.ok) {
        throw new Error(
          response.status === 400
            ? (await response.json()).err
            : `HTTP error! Status: ${response.status}`,
        );
      }
      const data = await response.json();
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (err) {
      console.error(err);
      setLoginError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <main>
        <section className="">
          <h1>Sign in</h1>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              name="email"
              placeholder="Email"
              aria-label="Email"
              autoComplete="email"
              value={userLogin.email}
              onChange={(e) =>
                setUserLogin((prev) => ({ ...prev, email: e.target.value }))
              }
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              aria-label="Password"
              autoComplete="current-password"
              value={userLogin.password}
              onChange={(e) =>
                setUserLogin((prev) => ({ ...prev, password: e.target.value }))
              }
              required
            />
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? <Loading /> : "Login"}
            </button>
            <div>
              Don't have an account? <Link to="/sign-up">Sign Up</Link>
              <br />
              <div>{loginError}</div>
            </div>
          </form>
        </section>
      </main>
    </>
  );
};

export default Login;
