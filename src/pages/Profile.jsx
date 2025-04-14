import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MdiChat from "../assets/MdiChat";
import Loading from "../components/Loading";
import MdiEdit from "../assets/MdiEdit";
import EditProfile from "../components/EditProfile";

function Profile({ user }) {
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const regionNames = new Intl.DisplayNames(["en"], { type: "region" });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/profiles/${userId}`,
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
        setProfile(data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      }
    };

    fetchProfile();
  }, [userId]);

  if (error) return <main>{error}</main>;

  return (
    <>
      {isEditingProfile && (
        <EditProfile
          profile={profile}
          setIsEditingProfile={setIsEditingProfile}
        />
      )}

      <header className="mb-4 border-b-2 border-b-gray-200 p-4 sm:px-16 xl:px-32">
        <nav className="flex flex-wrap justify-between gap-2">
          <ul>
            <li className="text-3xl font-bold text-sky-500 sm:text-4xl">
              <Link to="/" className="flex items-center gap-2">
                <MdiChat /> OdinChat
              </Link>
            </li>
          </ul>
          <ul className="flex gap-4 text-lg text-sky-500 sm:text-xl">
            <li className="content-center">
              <Link to="/" className="hover:underline">
                Home
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className="flex flex-col p-4 text-lg sm:px-16 sm:text-xl xl:px-32">
        <h1 className="text-3xl font-bold">Profile</h1>
        <hr className="text-gray-200" />
        <div className="flex flex-wrap justify-center gap-10 p-10">
          <div className="flex flex-col items-center gap-4">
            <div className="flex h-40 w-40 items-center justify-center rounded-full bg-linear-to-b from-green-400 to-green-600 text-5xl font-bold text-white select-none">
              {user.name
                .split(" ")
                .map((name, index) => index <= 1 && name[0].toUpperCase())}
            </div>

            {profile && user.id === parseInt(userId) && (
              <button
                onClick={() => setIsEditingProfile(true)}
                className="flex cursor-pointer items-center gap-2 rounded-md bg-gray-200 px-4 py-2 hover:bg-gray-300"
              >
                <MdiEdit /> Edit Profile
              </button>
            )}
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <div className="text-2xl font-bold">{user.name}</div>
              <div>{user.email}</div>
            </div>
            <div>
              <div className="text-2xl font-bold">Bio:</div>
              <div>
                {profile ? (
                  profile.bio || (
                    <span className="text-lg text-gray-500">
                      Bio not added...
                    </span>
                  )
                ) : (
                  <Loading />
                )}
              </div>
            </div>
            <div>
              <span className="text-2xl font-bold">Skills: </span>
              <span>
                {profile ? (
                  profile.skills || (
                    <span className="text-lg text-gray-500">
                      Skills not added...
                    </span>
                  )
                ) : (
                  <Loading />
                )}
              </span>
            </div>
            <div>
              <span className="text-xl font-bold">Country: </span>
              <span>
                {profile ? (
                  regionNames.of(profile.country) || (
                    <span className="text-lg text-gray-500">
                      Country not added!
                    </span>
                  )
                ) : (
                  <Loading />
                )}
              </span>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Profile;
