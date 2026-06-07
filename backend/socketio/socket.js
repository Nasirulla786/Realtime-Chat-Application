import http from "http";
import express from "express";

import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    //add frontend URl http://localhost:5173
    // origin: "http://localhost:5174",
    origin: "https://realtime-chat-application-2-9uto.onrender.com",
  },
});

export const onlineUsers = {};
export const getReciverSocketId = (rec)=>{
    return onlineUsers[rec]
}


  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    if (userId && userId !== "undefined") {  // Check if userId is valid
      onlineUsers[userId] = socket.id;
      io.emit("getOnlineUsers", Object.keys(onlineUsers));
    }
    socket.on("disconnect", () => {
      if (userId) {
        delete onlineUsers[userId];
        io.emit("getOnlineUsers", Object.keys(onlineUsers));
      }
    });
  });


export { app, server , io };
