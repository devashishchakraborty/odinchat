import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Messages = ({ currentTexter }) => {
  const [messages, setMessages] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (currentTexter) {
      const fetchMessages = async () => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_BASE_URL}/api/messages/texter/${currentTexter.id}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            },
          );
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
          setMessages(data);
        } catch (err) {
          console.error("Error fetching data:", err);
          setError(err.message);
        }
      };

      fetchMessages();
    }
  }, [currentTexter]);
  return (
    <section className="h-full w-full hidden sm:block">
      {currentTexter ? (
        <>
          <section>
            <div>{currentTexter.name + "|" + currentTexter.email}</div>
          </section>

          <section>
            {messages &&
              messages.length > 0 &&
              messages.map((message) => {
                return <div key={message.id}>{message.text}</div>;
              })}
          </section>

          <section>
            <textarea
              name="message"
              id="message"
              placeholder="Write your message here!"
            ></textarea>
          </section>
        </>
      ) : (
        <div className="h-full flex items-center justify-center">
          <div className="px-3 py-1 rounded-2xl bg-gray-200">Select a chat to start messaging</div>
        </div>
      )}
    </section>
  );
};

export default Messages;
