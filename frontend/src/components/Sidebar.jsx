import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dp from "../assets/dp.webp";
import axios from "axios";
import { serverURL } from "../App";
import { setSelectedData, setUserData } from "../redux/userSlice.js";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ onUserSelect }) => {
  const { userData, otherUsers, selectedData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleLogout = async () => {
    try {
      const res = await axios.get(`${serverURL}/api/auth/logout`, {
        withCredentials: true,
      });
      if (res) {
        dispatch(setUserData(null));
        alert("Logout successfully");
        navigate("/login");
      }
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  return (
    <div className="w-full h-screen bg-gradient-to-b from-purple-900 via-indigo-900 to-black flex flex-col shadow-lg">

      {/* ---------- HEADER ---------- */}
      <div className="p-5 border-b border-white/20 bg-white/10 backdrop-blur-md">
        <h1 className="text-3xl font-bold text-white tracking-wide drop-shadow-md">
          ChatApp
        </h1>
      </div>

      {/* ---------- SEARCH ---------- */}
      <div className="p-4 border-b border-white/10">
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-gray-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
      </div>

      {/* ---------- USER LIST ---------- */}
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4 scrollbar-hide">
        {otherUsers?.filter(user =>
          user.name.toLowerCase().includes(search.toLowerCase()) ||
          user.username.toLowerCase().includes(search.toLowerCase())
        ).map((e) => (
          <div
            key={e._id}
            onClick={() => {
              dispatch(setSelectedData(e));
              onUserSelect?.();
            }}
            className={`flex items-center gap-4 p-3 rounded-xl cursor-pointer border transition-all duration-200
              ${selectedData?._id === e._id
                ? "bg-gradient-to-r from-purple-600 to-indigo-500 text-white border-purple-700 shadow-lg"
                : "bg-white/10 hover:bg-white/20 border-white/20 text-white"
              }
            `}
          >
            {/* Avatar */}
            <div className="relative">
              <img
                src={e.image || dp}
                alt="profile"
                className="w-12 h-12 rounded-full object-cover border border-white/30"
              />
              {/* Online Dot */}
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-black rounded-full"></span>
            </div>

            {/* User Info */}
            <div>
              <h1 className="text-md font-semibold">{e.name}</h1>
              <h2 className="text-xs text-gray-300">@{e.username}</h2>
            </div>
          </div>
        ))}
      </div>

      {/* ---------- FOOTER USER PANEL ---------- */}
      <div className="p-5 bg-black/60 backdrop-blur-md text-white flex items-center gap-4 border-t border-white/10">
        <div
          className="w-14 h-14 rounded-full cursor-pointer border-2 border-purple-400 shadow-md"
          onClick={() => navigate("/profile")}
        >
          <img
            src={userData?.image || dp}
            alt="profile"
            className="w-full h-full rounded-full object-cover"
          />
        </div>

        <div className="flex-1">
          <h1 className="font-bold text-lg">{userData?.name}</h1>
          <p
            className="text-red-400 font-semibold cursor-pointer mt-1 hover:text-red-500 transition"
            onClick={handleLogout}
          >
            Logout
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
