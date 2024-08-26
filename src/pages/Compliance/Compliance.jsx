// src/Compliance.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './components/navigationSidebar';
import { AxiosPrivate } from '../../api/axios';
import { setBusinessComplete, setBankComplete, setserviceAgreementComplete, setComplianceData, setContactComplete, setProfileComplete } from '../../redux/complianceSlice';

const COMPLIANCE_DOC_URL = '/api/merchant-document';

const Compliance = () => {
    const axiosPrivate = AxiosPrivate();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const complianceData = useSelector((state) => state.compliance);
    const data = complianceData.complianceData;
    const storedMerchantData = localStorage.getItem('merchantData');
    const merchantDetails = storedMerchantData ? JSON.parse(storedMerchantData) : null;

    useEffect(() => {
        const fetchMerchantData = async () => {
            try {
                const response = await axiosPrivate.get(`${COMPLIANCE_DOC_URL}/${merchantDetails.aggregatorId}`);
                if (response.status === 200) {
                    const fetchedData = response.data.responseData[0];
                    dispatch(setComplianceData(fetchedData));
                    dispatch(setProfileComplete());
                    dispatch(setContactComplete());
                    dispatch(setBusinessComplete());
                    dispatch(setBankComplete());
                    dispatch(setserviceAgreementComplete());
                } else {
                    console.log("Error fetching merchant data", response.statusText);
                }
            } catch (err) {
                console.log(JSON.stringify(err))
                if (err.status === 400) {
                    navigate('/login');
                }
                console.log("Error fetching merchant data", err);
            }
        };

        fetchMerchantData();
    }, []);

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
                    <div className="min-w-[300px] max-w-[350px]">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Compliance;