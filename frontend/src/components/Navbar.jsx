import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { serverURL } from '../App';
import { setUserData } from '../redux/userSlice';

const Navbar = () => {
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(`${serverURL}/api/auth/logout`, {}, { withCredentials: true });
      dispatch(setUserData(null));
      navigate('/login');
    } catch (error) {
      console.log('Logout error', error);
    }
  };

  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md border-b border-gray-700">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">ChatApp</Link>
        <div className="flex items-center space-x-4">
          <Link to="/profile" className="hover:underline">Profile</Link>
          <button onClick={handleLogout} className="bg-red-600 px-4 py-2 rounded hover:bg-red-700">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
