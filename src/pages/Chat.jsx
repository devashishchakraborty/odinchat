import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import Messages from "../components/Messages";
import MdiMenu from "../assets/MdiMenu";

const Chat = ({ user }) => {
  const [users, setUsers] = useState(null);
  const [error, setError] = useState(null);
  const [currentTexterId, setCurrentTexterId] = useState(null);

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
  if (error)
    return (
      <main>
        <section>{error}</section>
      </main>
    );

  return (
    <main className="flex w-full min-w-xs">
      <section className="flex w-full flex-col">
        <section className="flex items-center gap-4 border-b-2 border-b-gray-200 p-3">
          <div className="cursor-pointer rounded-full p-2 text-2xl text-gray-600 hover:bg-gray-200">
            <MdiMenu />
          </div>
          <input
            type="text"
            placeholder="Search"
            className="text-md w-full rounded-full bg-gray-200 px-4 py-2 outline-2 outline-gray-200 focus:bg-white sm:p-4"
          />
        </section>
        <section className="flex flex-col">
          {users ? (
            users.map((texter) => {
              return (
                <section
                  className="flex cursor-pointer items-center gap-4 border-b-2 border-b-gray-200 px-4 py-2 hover:bg-gray-200"
                  key={texter.id}
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-b from-sky-400 to-sky-600 text-xl font-bold text-white">
                    {texter.name
                      .split(" ")
                      .map(
                        (name, index) => index <= 1 && name[0].toUpperCase(),
                      )}
                  </div>
                  <div className="flex flex-col">
                    <div className="font-bold">{texter.name}</div>
                    <div className="text-gray-500">Last Message...</div>
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
      <Messages currentTexterId={currentTexterId} />
    </main>
  );
};

export default Chat;
