import React from 'react';
import MerchantPopUpForm from '../../pages/Merchants/MerchantPopUp';

const IntegrationSettings = ({ credentials, openModal, closeModal, isModalOpen }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Integration Settings</h2>
      <div className="mt-[50px] gap-4 pb-3 lg:pb-6 border-b flex items-center lg:block">
        <div className='font-[400] text-[15px] pl-3 pb-3 lg:p-0 lg:mb-12 flex flex-col lg:flex-row justify-between lg:justify-start gap-[20px] lg:gap-[unset]'>
          <p className='w-[190px] mr-6 lg:mr-0'>Environment</p>
          <p className='mr-6 lg:mr-0'>Integration Key</p>
        </div>
        <div className='font-[400] text-[15px] pl-3 pb-3 lg:p-0 flex flex-col lg:flex-row justify-between lg:justify-start gap-[20px] lg:gap-[unset]'>
          <p className='w-[190px]'>Test</p>
          <div className="flex-grow flex items-center justify-between">
            <div className="flex items-center">
              <p className='text-xs'>{credentials?.integrationKey}</p>
              <button className="ml-2 text-gray-500">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.4 0 0 5.4 0 12c0 6.6 5.4 12 12 12 6.6 0 12-5.4 12-12C24 5.4 18.6 0 12 0zM12 22C6.5 22 2 17.5 2 12 2 6.5 6.5 2 12 2c5.5 0 10 4.5 10 10C22 17.5 17.5 22 12 22zM12 5.5c-1.4 0-2.5 1.1-2.5 2.5 0 1.4 1.1 2.5 2.5 2.5S14.5 9.4 14.5 8 13.4 5.5 12 5.5z"></path></svg>
              </button>
            </div>
            {credentials ? (
            <button onClick={openModal} className='text-[#0000FF] text-[#0000FF] text-xs lg:text-sm ml-10'>Test</button>
          )
            : (
              <></>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default IntegrationSettings;