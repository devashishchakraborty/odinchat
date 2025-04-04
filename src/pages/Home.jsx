import Lander from "../components/Lander";
import Chat from "../components/Chat";

const Home = ({ user, isAuthenticated }) => {
  return (
    <>
      {isAuthenticated ? <Chat user={user}/> : <Lander />}
    </>
  );
};

export default Home;
