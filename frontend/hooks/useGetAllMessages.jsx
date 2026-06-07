import axios from "axios";
import React, { useEffect } from "react";
import { serverURL } from "../src/App";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../src/redux/messageSlice";

const useGetAllMessages = () => {
  const { selectedUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!selectedUser?._id) return; // If no user selected → no API call

    const getMessage = async () => {
      try {
        const res = await axios.get(
          `${serverURL}/api/message/getmessage/${selectedUser._id}`,
          { withCredentials: true }
        );
        console.log(res)

        dispatch(setMessage(res.data));
      } catch (error) {
        console.log("get message error", error);
      }
    };

    getMessage();
  }, [selectedUser, dispatch]); // Only depend on selectedUser

};

export default useGetAllMessages;
