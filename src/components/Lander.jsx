import { Link } from "react-router-dom";

const Lander = () => {
  return (
    <>
      <h2>Welcome to OdinChat</h2>
      <section>
        <h3>A Fast, Simple, and Secure Way to Stay Connected</h3>
        <p>
          <b>OdinChat</b> is a modern real-time messaging app designed to make
          conversations effortless and enjoyable. Whether you're catching up
          with friends, collaborating with teammates, or just saying hello,
          OdinChat keeps you connected—anytime, anywhere.
        </p>
      </section>
      <section>
        <h3>🚀 Features</h3>
        <ul>
          <li>🔒 Secure authentication and user accounts</li>
          <li>💬 Real-time messaging powered by WebSockets</li>
          <li>👥 Private and group chat support</li>
          <li>🌙 Light and dark mode themes</li>
          <li>📱 Fully responsive design for all devices</li>
          <li>⚙️ Built with modern web technologies</li>
        </ul>
      </section>
      <section>
        <h3>Get Started</h3>
        <p>Create an account and jump into the conversation in seconds!</p>
        <Link to="/sign-up">Get Started</Link>
      </section>
      <section>
        <h3>
          💡 Built with passion to make staying connected simple and enjoyable.
        </h3>
      </section>
    </>
  );
};

export default Lander;
