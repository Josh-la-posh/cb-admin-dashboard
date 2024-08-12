// src/components/Header.js
import React, { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../pages/auth/authSlice';


const Header = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    setTimeout(() => {
      dispatch(logout);
      alert('Logout successful');
      navigate('/');

    }, 1000)
  }

  return (
    <header className="bg-white shadow-md flex justify-between items-center p-4">
      <div className="text-lg font-semibold">Admin Dashboard</div>
      <div className="relative">
        <button onClick={() => setDropdownOpen(!isDropdownOpen)} className="flex items-center">
          <img
            src="profile-image-url"
            alt=""
            className="w-8 h-8 rounded-full"
          />
          <span className="ml-2">Demilade Folarin</span>
          <FiChevronDown className="ml-1" />
        </button>
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-10">
            <a href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Profile</a>
            <button onClick={handleLogout} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left">Logout</button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
