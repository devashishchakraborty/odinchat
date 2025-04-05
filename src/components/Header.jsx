import { Link } from "react-router-dom";
import MdiChat from "../assets/MdiChat";

const Header = () => {
  return (
    <>
      <header className="border-b-1 border-b-gray-200 p-4 sm:px-16 xl:px-32">
        <nav className="flex flex-wrap justify-between gap-2">
          <ul>
            <li className="text-3xl font-bold text-sky-500 sm:text-4xl">
              <Link to="/" className="flex items-center gap-2">
                <MdiChat /> OdinChat
              </Link>
            </li>
          </ul>
          <ul className="flex gap-4 text-lg text-sky-500 sm:text-xl">
            <li className="content-center">
              <Link to="/login" className="hover:underline">Login</Link>
            </li>
            <li className="content-center">
              <Link to="/sign-up" className="hover:underline">Sign Up</Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
