import Header from "../components/Header";
import Lander from "../components/Lander";

const Home = ({ user, isAuthenticated }) => {
  return (
    <>
      <Header />
      {isAuthenticated ? null : <Lander />}
    </>
  );
};

export default Home;
