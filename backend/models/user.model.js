import { Timestamp } from "mongodb";
import mongoose from "mongoose";

const userScheman = mongoose.Schema(
  {
    name: {
      type: String,
    },
    username: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
  },
  { timestamps:true }
);

const User = mongoose.model("User", userScheman);
export default User;
