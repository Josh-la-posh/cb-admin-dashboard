import React, { useState, useEffect } from 'react';
import MerchantSelector from '../../components/merchants/MerchantSelector';
import IntegrationSettings from '../../components/merchants/IntegrationSettings';
import Pagination from '../../components/merchants/Pagination';
import MerchantPopUpForm from './MerchantPopUp';
import { Link } from 'react-router-dom';

const MerchantCredentials = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [credentials, setCredentials] = useState(null);
  const [showFullSecret, setShowFullSecret] = useState(false); // State to toggle full client secret visibility
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const storedMerchantData = localStorage.getItem('merchantData');
  const merchantData = storedMerchantData ? JSON.parse(storedMerchantData) : null;
  const baseUrl = process.env.REACT_APP_API_MERCHANT_BASE_URL

  console.log("merchantData", merchantData)

  useEffect(() => {
    const fetchCredentials = async () => {
      if (merchantData) {
        const url = `${baseUrl}/api/merchant/credentials/${merchantData.merchantCode}`;
        const token = localStorage.getItem('accessToken');
        try {
          const response = await fetch(url, {
            method: 'GET',
            headers: {
              'accept': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });
          const data = await response.json();
          if (data.requestSuccessful) {
            setCredentials(data.responseData);
          } else {
            console.error('Error fetching credentials:', data.message);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }
    };

    fetchCredentials();
  }, []);

  const handleGetCredentials = async () => {
    if (merchantData) {
      const url = `${baseUrl}/api/merchant/credentials/${merchantData.merchantCode}`;
      const token = localStorage.getItem('accessToken');
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log("ddd", data)
        if (data.requestSuccessful) {
          setCredentials(data.responseData);
        } else {
          console.error('Error fetching credentials:', data.message);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const toggleSecretVisibility = () => setShowFullSecret(!showFullSecret);

  return (
    <div className="p-8 bg-white min-h-screen relative overflow-auto">
      <h1 className="text-2xl font-semibold mb-4">Merchant Credentials ({merchantData?.merchantName})</h1>
      <Link to="/merchants" className="text-blue-800 mb-2 text-[14px] inline-block">Back To Merchant</Link>

      <div className="">
        <MerchantSelector merchant={merchantData} />
        <div className="mt-6 gap-4">
          <div className='font-[400] text-[15px] pl-3 pb-3 flex'>
            <p>Client ID</p>
            <p className='w-[300px]'>Client Secret</p>
          </div>
          {credentials ? (
            <div className='font-[400] text-[14px] pl-3 py-5 mt-4 flex border-y'>
              <p className='w-[300px]'>{credentials?.clientId}</p>
              <div className="flex items-center">
                <p>{showFullSecret ? credentials?.clientSecret : `${credentials?.clientSecret.slice(0, 10)}...`}</p>
                <button onClick={toggleSecretVisibility} className="ml-2 text-gray-500">
                  {showFullSecret ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.4 0 0 5.4 0 12c0 6.6 5.4 12 12 12 6.6 0 12-5.4 12-12C24 5.4 18.6 0 12 0zM12 22C6.5 22 2 17.5 2 12 2 6.5 6.5 2 12 2c5.5 0 10 4.5 10 10C22 17.5 17.5 22 12 22zM12 5.5c-1.4 0-2.5 1.1-2.5 2.5 0 1.4 1.1 2.5 2.5 2.5S14.5 9.4 14.5 8 13.4 5.5 12 5.5z"></path>
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.4 0 0 5.4 0 12c0 6.6 5.4 12 12 12 6.6 0 12-5.4 12-12C24 5.4 18.6 0 12 0zM12 22C6.5 22 2 17.5 2 12 2 6.5 6.5 2 12 2c5.5 0 10 4.5 10 10C22 17.5 17.5 22 12 22zM12 5.5c-1.4 0-2.5 1.1-2.5 2.5 0 1.4 1.1 2.5 2.5 2.5S14.5 9.4 14.5 8 13.4 5.5 12 5.5z"></path>
                    </svg>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className='font-[400] text-[14px] pl-3 py-5 mt-4 flex border-y'>
              <button onClick={handleGetCredentials} className="text-[#0000FF] ml-auto pr-[300px] text-[#0000FF]">
                Get Credentials
              </button>
            </div>
          )}
        </div>

        <div className="mt-6 pt-4">
          {credentials ? (
            <IntegrationSettings credentials={credentials} openModal={openModal} isModalOpen={isModalOpen} closeModal={closeModal} />
          ) : (
            <div className='font-[400] text-[14px] pl-3 py-5 mt-4 flex border-y'>
                Loading
            </div>
          )}         
        </div>
      </div>
      {credentials ? (
        <MerchantPopUpForm credentials={credentials} isModalOpen={isModalOpen} closeModal={closeModal} />
      ) : (
        <div className='font-[400] text-[14px] pl-3 py-5 mt-4 flex border-y'>
          Loading
        </div>
      )}         

      <Pagination />
    </div>
  );
};

export default MerchantCredentials;
