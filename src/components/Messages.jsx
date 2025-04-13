import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MdiSend from "../assets/MdiSend";
import Loading from "./Loading";
import MdiArrowBack from "../assets/MdiArrowBack";
import socket from "../socket";

const Messages = ({ currentTexter, user, setUsers, setCurrentTexter }) => {
  const [messages, setMessages] = useState(null);
  const [error, setError] = useState(null);
  const [newMessage, setNewMessage] = useState("");

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

      socket.emit("join room", {
        senderId: user.id,
        receiverId: currentTexter.id,
      });

      socket.on("receive message", (data) => {
        setMessages((prev) => [data, ...prev]);
        setUsers((prev) =>
          prev.map((user) =>
            user.id === currentTexter.id
              ? { ...user, latestMessage: data }
              : user,
          ),
        );
      });

      socket.on("connect_error", (err) => {
        console.error("Auth failed:", err.message);
      });

      return () => socket.off("receive message");
    } else setMessages(null);
  }, [user, currentTexter, setUsers]);

  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    if (newMessage.length > 0) {
      socket.emit("send message", {
        authorId: user.id,
        receiverId: currentTexter.id,
        text: newMessage,
      });
      setNewMessage("");
    }
  };

  return (
    <section
      className={`${currentTexter ? "flex" : "hidden"} flex-1 flex-col sm:flex`}
    >
      {currentTexter ? (
        <>
          <section className="flex h-16 items-center gap-4 border-b-2 border-b-gray-200 px-4 py-2">
            <div
              className="cursor-pointer rounded-full p-2 text-xl hover:bg-gray-200 sm:hidden"
              onClick={() => setCurrentTexter(null)}
            >
              <MdiArrowBack />
            </div>
            <div>
              <div>
                <b>{currentTexter.name}</b>
              </div>
              <div className="text-sm text-gray-500">{currentTexter.email}</div>
            </div>
          </section>

          <section className="flex flex-1 flex-col-reverse gap-2 overflow-auto p-4">
            {messages ? (
              messages.length > 0 &&
              messages.map((message) => {
                return (
                  <div
                    key={message.id}
                    className={`${message.author_id === user.id ? "self-end rounded-br-none bg-green-200" : "self-start rounded-bl-none bg-gray-200"} max-w-2/3 rounded-xl px-3 py-2 whitespace-pre-wrap`}
                  >
                    {message.text}
                  </div>
                );
              })
            ) : (
              <div className="self-center">
                <Loading />
              </div>
            )}
            {error}
          </section>

          <section>
            <form
              action="#"
              className="relative flex"
              onSubmit={handleMessageSubmit}
            >
              <textarea
                className="flex-1 resize-none bg-gray-100 p-4 pr-20 outline-2 outline-gray-200 focus:bg-gray-50"
                name="message"
                id="message"
                placeholder="Write your message here!"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                required
              ></textarea>
              <button
                className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer rounded-full p-2 text-3xl text-sky-600 hover:bg-gray-200"
                type="submit"
              >
                <MdiSend />
              </button>
            </form>
          </section>
        </>
      ) : (
        <div className="flex h-full items-center justify-center">
          <div className="rounded-2xl bg-gray-200 px-3 py-1">
            Select a chat to start messaging
          </div>
        </div>
      )}
    </section>
  );
};

export default Messages;
