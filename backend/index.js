import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import userRouter from "./routes/user.route.js";
import messageRouter from "./routes/message.routes.js";
import { app, server } from "./socketio/socket.js";
dotenv.config();



const port = 8000
app.use(cors({
    origin: "https://realtime-chat-application-2-9uto.onrender.com",
    credentials:true
}))
// app.use(cors({
//     origin: "http://localhost:5173" ,
//     credentials:true
// }))
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth",authRouter);
app.use("/api/user" , userRouter);
app.use("/api/message" , messageRouter);



server.listen(port,()=>{
    connectDB();
    console.log(`server is running at ${port}`)
})
