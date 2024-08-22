import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MainLayout = () => {
  const [openSidebar, setOpenSidebar] = useState(false);

  const handleSidebar = () => {
    setOpenSidebar(false);
  };

import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MainLayout = () => {
  const [openSidebar, setOpenSidebar] = useState(false);

  const handleSidebar = () => {
    setOpenSidebar(false);
  };

  return (
    <div className="w-full h-svh max-h-svh bg-gray-100 relative">
      {openSidebar && (
        <div className='fixed top-0 left-0 w-64 z-20 block lg:hidden'>
          <Sidebar />
          <button
            className="absolute top-4 right-5 text-white"
            onClick={handleSidebar}
          >
            <FontAwesomeIcon icon={faCircleXmark} />
          </button>
        </div>
      )}
      <div className='fixed top-0 left-0 w-64 z-20 hidden lg:block'>
        <Sidebar />
      </div>
      <div className="flex flex-col overflow-hidden lg:ml-64">
        <div className='border-b border-gray-200'>
          <Header setOpenSidebar={setOpenSidebar} openSidebar={openSidebar} />
        </div>
      </div>
      <div className="flex flex-col overflow-hidden lg:ml-64">
        <div className='border-b border-gray-200'>
          <Header setOpenSidebar={setOpenSidebar} openSidebar={openSidebar} />
        </div>
        <main className="flex-1 overflow-y-auto p-5">
          {/* Correctly render the Outlet component */}
          <Outlet />
          {/* Correctly render the Outlet component */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;