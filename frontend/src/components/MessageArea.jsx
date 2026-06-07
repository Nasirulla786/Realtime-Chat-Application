import {
  ArrowLeft,
  Image,
  SendHorizonal,
} from "lucide-react";
import React, { useRef, useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import dp from "../assets/dp.webp";
import EmojiPicker from "emoji-picker-react";
import SendMesage from "./SendMesage";
import RecieveMesaeg from "./RecieveMesaeg";
import axios from "axios";
import { serverURL } from "../App";
import { setMessage } from "../redux/messageSlice";
import SocketContext from "../SocketContext";

const MessageArea = ({ onBackClick, showBackButton }) => {
  const dispatch = useDispatch();
  const { selectedUser, userData } = useSelector((state) => state.user);
  const { Messages } = useSelector((state) => state.message);
  const socket = useContext(SocketContext);

  const [showEmoji, setShowEmoji] = useState(false);
  const [inputt, setInputt] = useState("");
  const [frontendImage, setFrontendImage] = useState(null);
  const [backendImage, setBackendImage] = useState(null);

  const imageClick = useRef();

  const handleEmoji = (e) => {
    setInputt((prev) => prev + e.emoji);
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFrontendImage(URL.createObjectURL(file));
      setBackendImage(file);
    }
  };

  const handleSubmit = async () => {
    try {
      if (!inputt.trim() && !backendImage) return;

      const formData = new FormData();
      formData.append("message", inputt);

      if (backendImage) {
        formData.append("image", backendImage);
      }

      const res = await axios.post(
        `${serverURL}/api/message/sendmessage/${selectedUser._id}`,
        formData,
        { withCredentials: true }
      );

      dispatch(setMessage((prev) => [...prev, res.data]));

      setFrontendImage(null);
      setInputt("");
      setBackendImage(null);
    } catch (error) {
      console.log("send message error", error);
    }
  };

  useEffect(() => {
    if (!socket) return;

    const handler = (mess) => {
      dispatch(setMessage((prev) => [...prev, mess]));
    };

    socket.on("newmessage", handler);

    return () => {
      socket.off("newmessage", handler);
    };
  }, [socket, dispatch]);

  return (
    <div className="w-full h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black flex flex-col relative">

      {!selectedUser && (
        <div className="w-full h-full flex items-center justify-center text-white text-2xl font-semibold tracking-wide px-4 text-center">
          Welcome to <span className="text-purple-400 ml-2">ChatApp</span> 🚀
        </div>
      )}

      {selectedUser && (
        <>
          {/* TOP BAR */}
          <div className="w-full h-[10vh] bg-black/40 backdrop-blur-md text-white flex items-center gap-4 px-5 shadow-md border-b border-white/10">
            {showBackButton && (
              <ArrowLeft
                className="cursor-pointer hover:text-purple-400 transition"
                onClick={onBackClick}
              />
            )}

            <div className="w-11 h-11 rounded-full overflow-hidden border border-purple-400 shadow-md">
              <img
                src={selectedUser?.image || dp}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>

            <h1 className="text-lg font-semibold tracking-wide">
              {selectedUser?.name}
            </h1>
          </div>

          {/* EMOJI PICKER */}
          {showEmoji && (
            <div className="absolute bottom-20 left-4 z-50 shadow-xl rounded-xl">
              <EmojiPicker onEmojiClick={handleEmoji} theme="dark" />
            </div>
          )}

          {/* IMAGE PREVIEW */}
          {frontendImage && (
            <div className="absolute bottom-24 right-10 w-[220px] h-[220px]
            rounded-xl overflow-hidden shadow-xl border border-purple-500 bg-black/40 backdrop-blur-md">
              <img
                src={frontendImage}
                alt="Preview"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          )}

          {/* CHAT MESSAGES */}
          <div className="flex-1 overflow-y-auto flex flex-col gap-3 p-4 scrollbar-hide">
            {Array.isArray(Messages) &&
              Messages.map((mess) =>
                mess.sender === userData?._id ? (
                  <SendMesage
                    key={mess._id}
                    image={mess.image}
                    message={mess.message}
                  />
                ) : (
                  <RecieveMesaeg
                    key={mess._id}
                    image={mess.image}
                    message={mess.message}
                  />
                )
              )}
          </div>

          {/* INPUT BAR */}
          <div className="w-full h-16 bg-black/40 backdrop-blur-md border-t border-white/10 flex items-center px-4 gap-4 shadow-inner">

            {/* EMOJI BTN */}
            <span
              className="cursor-pointer text-2xl hover:text-purple-400 transition"
              onClick={() => setShowEmoji((prev) => !prev)}
            >
              😊
            </span>

            {/* IMAGE UPLOAD */}
            <Image
              className="cursor-pointer hover:text-purple-400 transition"
              onClick={() => imageClick.current.click()}
            />
            <input type="file" hidden ref={imageClick} onChange={handleImage} />

            {/* INPUT */}
            <input
              type="text"
              placeholder="Type a message..."
              value={inputt}
              onChange={(e) => setInputt(e.target.value)}
              className="flex-1 bg-white/10 text-white px-4 py-2 rounded-lg
              outline-none border border-transparent focus:ring-2 focus:ring-purple-400 placeholder-gray-400"
            />

            {/* SEND BTN */}
            <SendHorizonal
              className="cursor-pointer text-xl hover:text-purple-400 transition"
              onClick={handleSubmit}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default MessageArea;
