import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import Messages from "../components/Messages";
import MdiMenu from "../assets/MdiMenu";
import Sidebar from "../components/Sidebar";
import { clipText } from "../utils";

const Chat = ({ user }) => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [currentTexter, setCurrentTexter] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/users`,
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
        setUsers(data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      }
    };

    fetchUsers();
  }, []);

  if (error) {
    return (
      <main>
        <section>{error}</section>
      </main>
    );
  }

  return (
    <main className="relative flex h-full w-full">
      {showSidebar && <Sidebar user={user} setShowSidebar={setShowSidebar} />}
      <section
        className={`${currentTexter ? "hidden" : "flex"} h-full w-full min-w-xs flex-col sm:flex sm:w-sm sm:border-r-2 sm:border-r-gray-200`}
      >
        <section className="flex h-16 items-center gap-4 border-b-2 border-b-gray-200 p-2 pr-4">
          <div
            className="cursor-pointer rounded-full p-2 text-2xl text-gray-600 hover:bg-gray-200"
            onClick={() => setShowSidebar(true)}
          >
            <MdiMenu />
          </div>
          <input
            id="search"
            name="search"
            type="text"
            placeholder="Search"
            className="text-md w-full rounded-full bg-gray-200 px-4 py-1 outline-2 outline-gray-200 focus:bg-white"
          />
        </section>
        <section className="flex flex-col">
          {users.length > 0 ? (
            users.map((texter) => {
              return (
                <section
                  className="flex cursor-pointer items-center gap-4 border-b-2 border-b-gray-200 px-4 py-2 hover:bg-gray-200"
                  key={texter.id}
                  onClick={() => setCurrentTexter(texter)}
                  style={{
                    backgroundColor:
                      currentTexter?.id == texter.id && "#54aad1",
                  }}
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-b from-green-400 to-green-600 text-xl font-bold text-white select-none">
                    {texter.name
                      .split(" ")
                      .map(
                        (name, index) => index <= 1 && name[0].toUpperCase(),
                      )}
                  </div>
                  <div className="flex flex-col">
                    <div
                      className="font-bold"
                      style={{
                        color: currentTexter?.id == texter.id && "white",
                      }}
                    >
                      {texter.name}
                    </div>
                    <div
                      className="text-gray-500"
                      style={{
                        color: currentTexter?.id == texter.id && "white",
                      }}
                    >
                      {clipText(
                        texter.latestMessage
                          ? texter.latestMessage.author_id === texter.id
                            ? texter.latestMessage.text
                            : "You: " + texter.latestMessage.text
                          : "Start a new chat!",
                      )}
                    </div>
                  </div>
                </section>
              );
            })
          ) : (
            <div className="flex justify-center p-8">
              <Loading />
            </div>
          )}
        </section>
      </section>
      <Messages
        currentTexter={currentTexter}
        user={user}
        setUsers={setUsers}
        setCurrentTexter={setCurrentTexter}
      />
    </main>
  );
};

export default Chat;
