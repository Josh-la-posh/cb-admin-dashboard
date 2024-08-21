// src/App.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './components/navigationSidebar';

const Compliance = () => {
  return (
      <div className="bg-white p-6">
        <h1 className="text-[20px] text-[#101928] font-semibold text-gray-800 mb-8">Compliance</h1>
        <div className="flex flex-col md:flex-row overflow-y-auto">
            <div className="relative w-[250px] md:h-full">
                <div className="md:fixed top-[170px]">
                    <Sidebar />
                </div>
            </div>
            <div className="ml-4 flex-grow">
                <div className="min-w-[300px] max-w-[400px]">
                    <Outlet />
                </div>
            </div>
        </div>
      </div>
  );
};

export default Compliance;
