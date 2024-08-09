import React from 'react';
import MerchantPopUpForm from '../../pages/Merchants/MerchantPopUp';
// import {Dialog}

const IntegrationSettings = ({openModal, closeModal, isModalOpen}) => {

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Integration Settings</h2>
      <div className="">
          <div className='font-[400] text-[15px] pl-3 pb-3 flex gap-[120px]'>
            <p>Environment</p>
            <p>Integration Key</p>
          </div>
          <div className='font-[400] text-[14px] pl-3 py-5 mt-4 flex border-y'>
            <p className='w-[200px]'>Test</p>
            <div className="flex items-center">
              <p>483f5585-19a7-45d8-9e82-4db...</p>
              <button className="ml-2 text-gray-500">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.4 0 0 5.4 0 12c0 6.6 5.4 12 12 12 6.6 0 12-5.4 12-12C24 5.4 18.6 0 12 0zM12 22C6.5 22 2 17.5 2 12 2 6.5 6.5 2 12 2c5.5 0 10 4.5 10 10C22 17.5 17.5 22 12 22zM12 5.5c-1.4 0-2.5 1.1-2.5 2.5 0 1.4 1.1 2.5 2.5 2.5S14.5 9.4 14.5 8 13.4 5.5 12 5.5z"></path></svg>
              </button>
            </div>
            <button onClick={openModal} className='text-[#0000FF] ml-auto pr-[300px] text-[#0000FF]'>Text Transaction</button>
          
          </div>
      </div>
    </div>
  );
};

export default IntegrationSettings;