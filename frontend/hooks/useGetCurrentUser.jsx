import React, { useEffect } from "react";
import axios from "axios";
import { serverURL } from "../src/App";
import { useDispatch } from "react-redux";
import { setUserData } from "../src/redux/userSlice";

export const useGetCurrentUser = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const currentUser = await axios.get(
          `${serverURL}/api/user/currentuser`,
          { withCredentials: true }
        );


          dispatch(setUserData(currentUser.data));

      } catch (error) {
        console.log("getcurrent user error ", error);
           dispatch(setUserData(null));


      }
    };

    fetchCurrentUser();
  }, [dispatch]);
};

export default useGetCurrentUser;
