import React, { useRef, useState } from "react";
import dp from "../assets/dp.webp";
import { useDispatch, useSelector } from "react-redux";
import { Plus } from "lucide-react";
import axios from "axios";
import { serverURL } from "../App";
import { setUserData } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { userData } = useSelector((state) => state.user);
  const [name, setName] = useState(userData?.name || "");
  const [frontendImage, setFrontendImage] = useState(userData?.image || dp);
  const [backendImage, setBackendImage] = useState(null);
  const dispatch = useDispatch();
  const imageOpen = useRef();
  const navigate = useNavigate();

  const imageHandle = async (e) => {
    try {
      const file = e.target.files[0];
      setFrontendImage(URL.createObjectURL(file));
      setBackendImage(file);
    } catch (error) {
      console.log("Image handle error:", error);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();
      formData.append("name", name);
      if (backendImage) formData.append("image", backendImage);

      const res = await axios.post(
        `${serverURL}/api/user/editprofile`,
        formData,
        { withCredentials: true }
      );

      dispatch(setUserData(res.data));
      navigate("/");
    } catch (error) {
      console.log("Profile update error:", error);
    }
  };

  return (
    <div className="w-full h-screen bg-gradient-to-br from-green-800 to-black flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 flex flex-col items-center gap-8 text-gray-800"
      >
        {/* Profile Image */}
        <div
          className="relative w-32 h-32 rounded-full cursor-pointer group"
          onClick={() => imageOpen.current.click()}
        >
          <img
            src={frontendImage}
            alt="profile"
            className="w-full h-full rounded-full object-cover shadow-md border-4 border-green-500"
          />

          {/* Plus icon */}
          <div className="absolute bottom-0 right-0 bg-green-600 p-2 rounded-full shadow-lg group-hover:scale-110 transition">
            <Plus className="text-white" size={18} />
          </div>

          <input
            type="file"
            hidden
            ref={imageOpen}
            accept="image/*"
            onChange={imageHandle}
          />
        </div>

        {/* Name Input */}
        <input
          type="text"
          placeholder="Enter your name"
          className="w-full p-4 rounded-xl border-2 text-black border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-300 outline-none transition"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* Username (readonly) */}
        <input
          type="text"
          readOnly
          placeholder={userData?.username}
          className="w-full p-4 rounded-xl border-2 text-gray-600 bg-gray-100 cursor-not-allowed"
        />

        {/* Email (readonly) */}
        <input
          type="email"
          readOnly
          placeholder={userData?.email}
          className="w-full p-4 rounded-xl border-2 text-gray-600 bg-gray-100 cursor-not-allowed"
        />

        {/* Submit Button */}
        <button className="w-40 h-12 bg-green-700 hover:bg-green-800 text-white font-bold rounded-xl shadow-lg transition-all">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
