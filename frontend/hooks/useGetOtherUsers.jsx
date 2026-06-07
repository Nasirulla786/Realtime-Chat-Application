import axios from 'axios'
import React, { useEffect } from 'react'
import { serverURL } from '../src/App'
import { useDispatch } from 'react-redux'
import { setOtherUserData } from '../src/redux/userSlice'

const useGetOtherUsers = () => {
    const dispatch = useDispatch();

    useEffect(()=>{
        const fetchOtherUsers = async()=>{
            try {
                const res = await axios.get(`${serverURL}/api/user/otherusers` , {withCredentials:true});
                // console.log("this is current userdata", res.data);
                dispatch(setOtherUserData(res.data));


            } catch (error) {
                console.log("this is get other users error in frontend",error);

            }
        }
        fetchOtherUsers();
    },[dispatch])
}

export default useGetOtherUsers
