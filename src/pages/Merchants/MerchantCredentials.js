import React, {useState} from 'react';
import MerchantSelector from '../../components/merchants/MerchantSelector';
import IntegrationSettings from '../../components/merchants/IntegrationSettings';
import Pagination from '../../components/merchants/Pagination';
import MerchantPopUpForm from './MerchantPopUp';

const MerchantCredentials = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
    
  return (
    <div className="p-8 bg-white min-h-screen relative overflow-auto">
      <h1 className="text-2xl font-semibold mb-4">Merchant Credentials (Dan LTD)</h1>
      <a href="#" className="text-blue-800 mb-2 text-[14px] inline-block">Back To Merchant</a>

      <div className="">
        <MerchantSelector />
        <div className="mt-6 gap-4">
          <div className='font-[400] text-[15px] pl-3 pb-3 flex'>
            <p className='w-[300px]'>Client Secret</p>
            <p>Client ID</p>
          </div>
          <div className='font-[400] text-[14px] pl-3 py-5 mt-4 flex border-y'>
            <p className='w-[300px]'>Dan0000480</p>
            <div className="flex items-center">
              <p>24a90d56-b28a-4fa1-be73-ad3...</p>
              <button className="ml-2 text-gray-500">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.4 0 0 5.4 0 12c0 6.6 5.4 12 12 12 6.6 0 12-5.4 12-12C24 5.4 18.6 0 12 0zM12 22C6.5 22 2 17.5 2 12 2 6.5 6.5 2 12 2c5.5 0 10 4.5 10 10C22 17.5 17.5 22 12 22zM12 5.5c-1.4 0-2.5 1.1-2.5 2.5 0 1.4 1.1 2.5 2.5 2.5S14.5 9.4 14.5 8 13.4 5.5 12 5.5z"></path></svg>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4">
          <IntegrationSettings openModal={openModal} isModalOpen={isModalOpen} closeModal={closeModal} />
        </div>
      </div>
      <MerchantPopUpForm isModalOpen={isModalOpen} closeModal={closeModal} />
      
      <Pagination />
    </div>
  );
};

export default MerchantCredentials;