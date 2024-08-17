import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const MainLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-100 relative">
      <div className='fixed top-0 left-0 w-64'>
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden ml-64">
        <div className='border-b border-gray-200'>
          <Header />
        </div>
        <main className="flex-1 overflow-y-auto p-5">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
