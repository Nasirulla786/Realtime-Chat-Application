import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import useGetCurrentUser from "../hooks/useGetCurrentUser";
import { useDispatch, useSelector } from "react-redux";
import Home from "./pages/Home";
import ProfilePage from "./pages/ProfilePage";
import useGetOtherUsers from "../hooks/useGetOtherUsers";
import useGetAllMessages from "../hooks/useGetAllMessages";
import { io } from "socket.io-client";
import { setonlineUsers } from "./redux/userSlice";
import { useEffect, useState } from "react";
import SocketContext from "./SocketContext";

export const serverURL = "https://realtime-chat-application-1-6pfu.onrender.com";
// export const serverURL = "http://localhost:8000" ;

function App() {
  useGetCurrentUser();
  useGetOtherUsers();
  useGetAllMessages();
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!userData) return;


    //add localhost url http://localhot:8000 for locally run
    const newSocket = io("https://realtime-chat-application-1-6pfu.onrender.com", {
      query: { userId: userData?._id },
    });

    setSocket(newSocket);

    newSocket.on("getOnlineUsers", (data) => {
      dispatch(setonlineUsers(data));
    });

    return () => {
      newSocket.close();
      setSocket(null);
    };
  }, [userData, dispatch]);

  useEffect(() => {
    if (!userData && socket) {
      socket.close();
      setSocket(null);
    }
  }, [userData, socket]);

  return (
    <SocketContext.Provider value={socket}>
      <Routes>
        <Route
          path="/"
          element={userData ? <Home /> : <Navigate to="/login" replace />}
        />

        <Route
          path="/signup"
          element={!userData ? <Signup /> : <Navigate to={"/"} />}
        />
        <Route
          path="/login"
          element={!userData ? <Login /> : <Navigate to={"/"} />}
        />

        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </SocketContext.Provider>
  );
}

export default App;
