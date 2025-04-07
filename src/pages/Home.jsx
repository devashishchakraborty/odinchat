import { Link } from "react-router-dom";
import Header from "../components/Header";

const Home = () => {
  return (
    <>
      <Header />
      <main className="flex flex-col p-4 text-lg sm:text-xl sm:px-16 xl:px-32">
        <section className="mb-4">
          <h2 className="mb-2 text-2xl font-bold sm:text-4xl">Welcome to OdinChat!</h2>
          <p>
            <b>OdinChat</b> is a modern real-time messaging app designed to make
            conversations effortless and enjoyable. Whether you're catching up
            with friends, collaborating with teammates, or just saying hello,
            OdinChat keeps you connected—anytime, anywhere.
          </p>
        </section>
        <section className="mb-4">
          <h3 className="mb-2 text-xl font-bold sm:text-3xl">Key Features</h3>
          <ul className="list-inside list-disc ml-4">
            <li>Secure authentication and user accounts</li>
            <li>Real-time messaging powered by WebSockets</li>
            <li>Private and group chat support</li>
            <li>Light and dark mode themes</li>
            <li>Fully responsive design for all devices</li>
            <li>Built with modern web technologies</li>
          </ul>
        </section>
        <section className="mb-3">
          <h3 className="mb-2 text-xl font-bold sm:text-3xl">Get Started Today</h3>

          <p className="mb-6">
            Create an account and jump into the conversation in seconds!
          </p>
          <Link
            to="/sign-up"
            className="rounded-sm bg-sky-500 p-4 text-white hover:bg-sky-600"
          >
            Get Started ➜
          </Link>
        </section>
      </main>
    </>
  );
};

export default Home;
