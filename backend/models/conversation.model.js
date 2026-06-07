import mongoose from "mongoose";
const conversationSchema = new mongoose.Schema({
  participants: [
    {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
  ],

  message: [
    {
      type: mongoose.Types.ObjectId,
      ref: "messageModel",
    },
  ],
});

const conversation = mongoose.model("conversation", conversationSchema);
export default conversation;
