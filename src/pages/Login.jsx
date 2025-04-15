import { useState } from "react";
import Header from "../components/Header";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

const Login = ({ setToken }) => {
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
      setToken(data.token);
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
      <main className="flex flex-col p-4 text-lg sm:px-16 xl:px-32">
        <section className="flex flex-col items-center">
          <h1 className="mb-4 text-2xl font-bold sm:text-4xl">Sign in</h1>
          <form
            onSubmit={handleLogin}
            className="relative flex min-w-3/4 flex-col gap-4 sm:max-w-xl sm:min-w-lg"
          >
            <input
              className="rounded-sm border-2 border-gray-300 bg-gray-50 p-3 outline-sky-600 focus:bg-white sm:p-4"
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
              className="rounded-sm border-2 border-gray-300 bg-gray-50 p-3 outline-sky-600 focus:bg-white sm:p-4"
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
            <button
              type="submit"
              className="flex cursor-pointer justify-center rounded-sm bg-sky-500 p-4 text-white hover:bg-sky-600"
              disabled={isSubmitting}
            >
              {isSubmitting ? <Loading /> : "Login"}
            </button>
            <button
              type="button"
              className="flex cursor-pointer justify-center rounded-sm bg-gray-500 p-4 text-white hover:bg-gray-600"
              disabled={isSubmitting}
              onClick={() =>
                setUserLogin({ email: "guest@email.com", password: "guest" })
              }
            >
              Fill Guest Info
            </button>

            <div>
              Don't have an account?{" "}
              <Link className="text-sky-600 hover:underline" to="/sign-up">
                Sign Up
              </Link>
            </div>
            <small>
              <i className="text-red-700">{loginError}</i>
            </small>
          </form>
        </section>
      </main>
    </>
  );
};

export default Login;
