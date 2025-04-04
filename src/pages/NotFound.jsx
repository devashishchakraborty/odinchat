import { Link } from "react-router-dom";
import Header from "../components/Header";

function NotFound() {
  return (
    <>
      <Header />
      <main>
        <section style={{ textAlign: "center", marginTop: "50px" }}>
          <h1>404 - Page Not Found</h1>
          <p>Oops! The page you're looking for doesn't exist.</p>
          <Link to="/" style={{ textDecoration: "none", color: "blue" }}>
            Go back to Home
          </Link>
        </section>
      </main>
    </>
  );
}

export default NotFound;
