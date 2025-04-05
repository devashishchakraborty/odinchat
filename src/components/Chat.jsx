import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import ReactSvg from "../assets/react.svg";

const Chat = ({ user }) => {
  const [users, setUsers] = useState(null);
  const [error, setError] = useState(null);

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
  return (
    <main>
      <section className="flex flex-col">
        {users ? (
          users.map((user) => {
            return (
              <section key={user.id}>
                <img className="h-10 w-10" src={ReactSvg} alt="" />
                <span>{user.name}</span>
              </section>
            );
          })
        ) : (
          <Loading />
        )}
      </section>
    </main>
  );
};

export default Chat;
