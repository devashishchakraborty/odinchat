import { Link } from "react-router-dom";
import MdiUser from "../assets/MdiUser";
import MdiLogout from "../assets/MdiLogout";
import MdiChat from "../assets/MdiChat";
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
      <section className="flex flex-col absolute z-10 h-full w-60 border-r-2 border-gray-200 bg-white text-lg">
        <Link to={`/profile/${user.id}`}>
          <div className="border-b-2 border-gray-200 p-4">
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <div>{user.email}</div>
          </div>
        </Link>
        <Link
          to={`/profile/${user.id}`}
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
        <div className="flex mt-auto p-4 border-t-2 border-t-gray-200 justify-center items-center gap-2 text-xl font-bold text-sky-500 sm:text-2xl">
          <MdiChat /> OdinChat
        </div>
      </section>
    </>
  );
};

export default Sidebar;
