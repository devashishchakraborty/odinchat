import { useRef, useState } from "react";
import SelectCountry from "./SelectCountry";

const EditProfile = ({ profile, setIsEditingProfile }) => {
  const [bio, setBio] = useState(profile.bio || "");
  const [skills, setSkills] = useState(profile.skills || "");
  const countryRef = useRef(null);
  const [error, setError] = useState(null);

  const editProfile = async (e) => {
    e.preventDefault();
    try {
      console.log(JSON.stringify({
        bio,
        skills,
        country: countryRef.current?.value,
      }))
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/profiles`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            bio,
            skills,
            country: countryRef.current?.value,
          }),
        },
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      window.location.reload();
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err.message);
    }
  };

  return (
    <>
      <div
        className="absolute h-full w-full bg-gray-200/50"
        onClick={() => setIsEditingProfile(false)}
      ></div>
      <form
        onSubmit={editProfile}
        className="absolute top-1/2 left-1/2 z-10 flex -translate-1/2 flex-col gap-4 rounded-md bg-white p-4"
      >
        <div className="mb-2 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Edit Profile</h1>
          <div
            onClick={() => setIsEditingProfile(false)}
            className="cursor-pointer rounded-full px-2.5 py-1 text-xl text-red-500 hover:bg-gray-100"
          >
            &#10005;
          </div>
        </div>
        {error}
        <section className="flex justify-between gap-2">
          <label htmlFor="bio">Bio: </label>
          <textarea
            className="w-110 resize-none rounded-sm bg-gray-100 p-2 outline-2 outline-gray-200 focus:bg-gray-50"
            name="bio"
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            required
          ></textarea>
        </section>
        <section className="flex items-center justify-between gap-2">
          <label htmlFor="skills">Skills: </label>
          <input
            className="text-md w-110 rounded-sm bg-gray-100 px-4 py-1 outline-2 outline-gray-200 focus:bg-white"
            type="text"
            id="skills"
            name="skills"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            required
          />
        </section>
        <section className="flex items-center gap-2">
          <label htmlFor="country">Select Country: </label>
          <SelectCountry ref={countryRef} />
        </section>
        <button
          role="submit"
          className="cursor-pointer rounded-sm bg-sky-600 p-2 text-xl text-white hover:bg-sky-700"
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default EditProfile;
