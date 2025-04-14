import { Link } from "react-router-dom";
import MdiUser from "../assets/MdiUser";
import MdiLogout from "../assets/MdiLogout";
const Sidebar = ({ user, setShowSidebar }) => {
  const logoutUser = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };
  return (
    <>
      <div
        className="absolute h-full w-full bg-gray-300/50"
        onClick={() => setShowSidebar(false)}
      ></div>
      <section className="absolute z-10 h-full w-90 border-r-2 border-gray-200 bg-white text-lg">
        <Link to="/profile">
          <div className="border-b-2 border-gray-200 p-4">
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <div>{user.email}</div>
          </div>
        </Link>
        <Link
          to="/profile"
          className="flex cursor-pointer items-center gap-2 px-4 py-2 hover:bg-gray-200"
        >
          <MdiUser className="text-2xl" /> View Profile
        </Link>
        <div
          onClick={logoutUser}
          className="flex cursor-pointer items-center gap-2 px-4 py-2 text-red-700 hover:bg-gray-200"
        >
          <MdiLogout className="text-2xl" /> Logout
        </div>
      </section>
    </>
  );
};

export default Sidebar;
