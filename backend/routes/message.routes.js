import express from "express"
import isAuth from "../middleware/isAuth.js";
import { upload } from "../middleware/multer.js";
import { GetMessages, sendMessage } from "../controllers/message.controller.js";
const messageRouter = express.Router();

messageRouter.post("/sendmessage/:receiver" , isAuth , upload.single("image") , sendMessage)
messageRouter.get("/getmessage/:receiver" , isAuth , GetMessages)

export default messageRouter
