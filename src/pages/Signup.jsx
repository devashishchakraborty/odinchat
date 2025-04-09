import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Loading from "../components/Loading";

const SignUp = () => {
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState("");

  const createNewUser = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/sign-up`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      navigate("/login");
    } catch (err) {
      console.error("Error:", err);
      setEmailError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <main className="flex flex-col p-4 text-lg sm:px-16 xl:px-32">
        <section className="flex flex-col items-center">
          <h1 className="mb-4 text-2xl font-bold sm:text-4xl">
            Create Account
          </h1>
          <form
            onSubmit={createNewUser}
            className="relative flex min-w-3/4 flex-col gap-4 sm:max-w-xl sm:min-w-lg"
          >
            <input
              className="rounded-sm border-2 border-gray-300 bg-gray-50 p-3 outline-sky-600 focus:bg-white sm:p-4"
              type="text"
              name="name"
              placeholder="Fullname"
              aria-label="Fullname"
              autoComplete="email"
              value={newUser.name}
              onChange={(e) =>
                setNewUser((prev) => ({ ...prev, name: e.target.value }))
              }
              required
            />
            <input
              className="rounded-sm border-2 border-gray-300 bg-gray-50 p-3 outline-sky-600 focus:bg-white sm:p-4"
              type="email"
              name="email"
              placeholder="Email"
              aria-label="Email"
              autoComplete="email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser((prev) => ({ ...prev, email: e.target.value }))
              }
              aria-describedby="invalid-helper"
              required
            />

            <input
              className="rounded-sm border-2 border-gray-300 bg-gray-50 p-3 outline-sky-600 focus:bg-white sm:p-4"
              type="password"
              name="password"
              placeholder="Password"
              aria-label="Password"
              autoComplete="current-password"
              value={newUser.password}
              onChange={(e) =>
                setNewUser((prev) => ({ ...prev, password: e.target.value }))
              }
              required
            />
            <div className="relative">
              <input
                className="w-full rounded-sm border-2 border-gray-300 bg-gray-50 p-3 outline-sky-600 focus:bg-white sm:p-4"
                type="password"
                name="retypePassword"
                placeholder="Retype Password"
                aria-label="Retype Password"
                autoComplete="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              {confirmPassword.length > 0 &&
                (confirmPassword === newUser.password ? (
                  <span className="absolute top-1/2 right-4 -translate-y-1/2 text-2xl text-green-500 select-none">
                    ✓
                  </span>
                ) : (
                  <span className="absolute top-1/2 right-4 -translate-y-1/2 text-2xl text-red-500 select-none">
                    ✕
                  </span>
                ))}
            </div>
            <button
              className="flex cursor-pointer justify-center rounded-sm bg-sky-500 p-4 text-white hover:bg-sky-600"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? <Loading /> : "Sign Up"}
            </button>

            <div>
              Already have an account?{" "}
              <Link className="text-sky-600 hover:underline" to="/login">
                Login
              </Link>
            </div>
            <small>
              <i className="text-red-700">{emailError}</i>
            </small>
          </form>
        </section>
      </main>
    </>
  );
};

export default SignUp;
