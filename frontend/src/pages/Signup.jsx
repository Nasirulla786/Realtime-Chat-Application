import React, { useState } from "react";
import axios from "axios";
import { serverURL } from "../App";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${serverURL}/api/auth/signup`,
        { name, username, email, password },
        { withCredentials: true }
      );
      dispatch(setUserData(res.data));
    } catch (error) {
      console.log("Signup error:", error);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-purple-800 via-indigo-900 to-black flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-10 flex flex-col gap-6 text-white"
      >
        <h2 className="text-4xl font-extrabold text-center mb-2 tracking-wide">
          Sign Up
        </h2>
        <p className="text-center text-sm text-gray-300 mb-6">
          Create your account and join the chat world.
        </p>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-4 rounded-lg bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-300"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Username"
          className="w-full p-4 rounded-lg bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-300"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email Address"
          className="w-full p-4 rounded-lg bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-300"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-4 rounded-lg bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-300"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full py-3 mt-4 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-500 hover:from-purple-700 hover:to-indigo-600 font-semibold text-lg shadow-lg transition duration-300"
        >
          Sign Up
        </button>

        <p className="text-center text-sm text-gray-400 mt-4">
          Already have an account?{" "}
          <span className="text-purple-400 hover:underline cursor-pointer" onClick={()=>navigate("/login")}>
            Log In
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
