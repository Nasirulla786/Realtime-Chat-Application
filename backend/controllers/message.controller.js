import uploadOncloudinary from "../config/cloudinary.js";
import conversation from "../models/conversation.model.js";
import messageModel from "../models/message.model.js";
import { getReciverSocketId, io } from "../socketio/socket.js";
// import io from "socket.io"

export const sendMessage = async (req, res) => {
  try {
    const sender = req.userId;
    const receiver = req.params.receiver;
    const { message } = req.body;

    let image;

    // If file exists → upload to cloudinary
    if (req.file) {
      image = await uploadOncloudinary(req.file.path);
    }

    // Create new message
    const newMessage = await messageModel.create({
      sender,
      receiver,
      message,
      image,
    });

    // Check existing conversation
    let CheckConversation = await conversation.findOne({
      participants: { $all: [sender, receiver] },
    });

    // Create NEW conversation
    if (!CheckConversation) {
      CheckConversation = await conversation.create({
        participants: [sender, receiver],
        message: [newMessage._id], // message must be array
      });

      return res.json(newMessage); // IMPORTANT return
    }

    // If conversation exists → push message
    CheckConversation.message.push(newMessage._id);
    await CheckConversation.save();

    const receiverSoketId = getReciverSocketId(receiver);
    if (receiverSoketId) {
      io.to(receiverSoketId).emit("newmessage", newMessage);
    }

    return res.json(newMessage);
  } catch (error) {
    console.log("this is error from message controller ", error);
  }
};

export const GetMessages = async (req, res) => {
  try {
    const sender = req.userId;
    const receiver = req.params.receiver;

    const CheckConversation = await conversation
      .findOne({
        participants: { $all: [sender, receiver] },
      })
      .populate("message");

    if (!CheckConversation) {
      return res.status(200).json([]);
      // no conversation = empty array, not error
    }

    return res.status(200).json(CheckConversation.message);
  } catch (error) {
    console.log("this is get message error", error);
  }
};
