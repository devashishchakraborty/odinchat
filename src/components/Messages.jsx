import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import MdiSend from "../assets/MdiSend";
import MdiArrowBack from "../assets/MdiArrowBack";
import PageLoader from "./PageLoader";
import { io } from "socket.io-client";

const Messages = ({ currentTexter, user, setUsers, setCurrentTexter }) => {
  const [messages, setMessages] = useState(null);
  const [error, setError] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const socket = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleMessageSubmit();
    }
  };

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

      if (!socket.current) {
        socket.current = io(import.meta.env.VITE_API_BASE_URL, {
          auth: {
            token: localStorage.getItem("token"),
          },
        });
      }

      socket.current.emit("join room", {
        senderId: user.id,
        receiverId: currentTexter.id,
      });

      socket.current.on("receive message", (data) => {
        if (currentTexter.id === data.author_id || user.id === data.author_id) {
          setMessages((prev) => [data, ...prev]);
        }
        setUsers((prev) =>
          prev.map((user) =>
            user.id === data.author_id || user.id === data.receiver_id
              ? { ...user, latestMessage: data }
              : user,
          ),
        );
      });

      socket.current.on("connect_error", (err) => {
        console.error("Auth failed:", err.message);
      });

      return () => {
        if (socket.current) {
          socket.current.off("receive message");
        }
      };
    } else setMessages(null);
  }, [user, currentTexter, setUsers, socket]);

  const handleMessageSubmit = async (e) => {
    e?.preventDefault();
    if (newMessage.length > 0 && socket.current) {
      socket.current.emit("send message", {
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
            <Link to={`profile/${currentTexter.id}`}>
              <div className="font-bold">{currentTexter.name}</div>
              <div className="text-sm text-gray-500">{currentTexter.email}</div>
            </Link>
          </section>

          <section className="flex flex-1 flex-col-reverse gap-2 overflow-auto p-4 md:px-10">
            {messages ? (
              messages.length > 0 &&
              messages.map((message) => {
                const utcDate = new Date(message.created_at);
                return (
                  <div
                    key={message.id}
                    className={`${message.author_id === user.id ? "self-end rounded-br-none bg-green-200" : "self-start rounded-bl-none bg-gray-200"} max-w-2/3 rounded-xl px-3 py-2`}
                  >
                    <span className="text-md break-all whitespace-pre-wrap md:text-lg">
                      {message.text}
                    </span>
                    <span className="float-right mt-2 ml-2 min-w-max text-xs text-green-900 sm:mt-2.5">
                      {utcDate.toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </span>
                  </div>
                );
              })
            ) : (
              <PageLoader />
            )}
            {error}
          </section>

          <section>
            <form
              action="#"
              className="relative flex gap-4 border-t-2 border-t-gray-200 p-4"
              onSubmit={handleMessageSubmit}
            >
              <textarea
                className="flex-1 resize-none rounded-sm bg-gray-100 p-2 outline-2 outline-gray-200 focus:bg-gray-50"
                name="message"
                id="message"
                placeholder="Write your message here!"
                value={newMessage}
                rows="1"
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                required
              ></textarea>
              <button
                className="cursor-pointer rounded-full p-2 text-3xl text-sky-600 hover:bg-gray-200"
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
