// src/Compliance.js
import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './components/navigationSidebar';
import axios from 'axios';

const Compliance = () => {
    const [merchantData, setMerchantData] = useState(null);
    const [isProfileComplete, setIsProfileComplete] = useState(false);
    const [isAccountComplete, setIsAccountComplete] = useState(false);
    const [isContactComplete, setIsContactComplete] = useState(false);
    const [isOwnerComplete, setIsOwnerComplete] = useState(false);
    const [isServiceComplete, setIsServiceComplete] = useState(false);
    const token = localStorage.getItem("accessToken");
    const baseUrl = process.env.REACT_APP_API_MERCHANT_BASE_URL
    const storedMerchantData = localStorage.getItem('merchantData');
    const merchantDetails = storedMerchantData ? JSON.parse(storedMerchantData) : null;

    console.log("Merchant", merchantData)

    useEffect(() => {
        // Fetch the merchant data when the component loads
        const fetchMerchantData = async () => {
            try {
                const response = await fetch(`${baseUrl}/api/merchant-document/${merchantDetails.aggregatorId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    const fetchedData = data.responseData[0];
                    setMerchantData(fetchedData);
                    checkCompletionStatus(fetchedData);
                } else {
                    console.error("Error fetching merchant data", response.statusText);
                }
            } catch (error) {
                console.error("Error fetching merchant data", error);
            }
        };

        fetchMerchantData();
    }, []);

    // Check the completion status based on the merchant data
    const checkCompletionStatus = (data) => {
        const profileComplete = data.tradingName && data.description && data.staffSize && data.annualProjectedSalesVolume && data.industry && data.category && data.businessType;
        const accountComplete = data.bankName && data.accountName && data.accountNumber;
        const contactComplete = data.businessEmail && data.phoneNumber && data.officeAddress;
        const ownerComplete = data.firstName;
        const serviceComplete = data.slaBoolean;

        setIsProfileComplete(profileComplete);
        setIsAccountComplete(accountComplete);
        setIsContactComplete(contactComplete);
        setIsOwnerComplete(ownerComplete);
        setIsServiceComplete(serviceComplete);
    };

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
                    <div className="min-w-[300px] w-[500px]">
                        {/* Pass the merchantData as props to the Outlet */}
                        {/* <Outlet context={merchantData} /> */}
                        <Outlet context={{ merchantData, isProfileComplete, isAccountComplete, isContactComplete, isOwnerComplete, isServiceComplete }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Compliance;
