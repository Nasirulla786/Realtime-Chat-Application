import mongoose from "mongoose";
const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  receiver: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  image: {
    type: String,
  },

  message: {
    type: String,
    default: "",
  },
});

const messageModel = mongoose.model("messageModel",messageSchema);
export default messageModel;
