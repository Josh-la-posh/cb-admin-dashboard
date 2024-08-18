import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const MainLayout = ({ children }) => {


  const [openSidebar, setOpenSidebar]= useState(true);
  
  const handleSidebar = () => {
    setOpenSidebar(false);
  }

  return (
    <div className="w-full h-svh max-h-svh bg-gray-100 relative">
      {openSidebar == true && <div className='fixed top-0 left-0 w-64 z-20 block lg:hidden'>
        <Sidebar/>

        {openSidebar === true && <button className="absolute top-4 right-5 text-white w-[25px] h-[25px] rounded-full border border-white" onClick={handleSidebar}>
          X
        </button>}
      </div>}
      <div className='fixed top-0 left-0 w-64 z-20 hidden lg:block'>
        <Sidebar/>
      </div>
      <div className="flex flex-col overflow-hidden lg:ml-64">
        <div className='border-b border-gray-200'>
          <Header setOpenSidebar={setOpenSidebar} openSidebar={openSidebar}/>
        </div>
        <main className="flex-1 overflow-y-auto p-5">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
