// src/components/ContactForm.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AxiosPrivate } from '../../../api/axios';
import { setBankComplete, setComplianceData } from '../../../redux/complianceSlice';

const COMPLIANCE_DOC_URL = '/api/merchant-document';

const BankForm = () => {
    const axiosPrivate = AxiosPrivate();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const complianceData = useSelector((state) => state.compliance.complianceData);

    const handleChange = (e) => {
        const {name, value} = e.target;
        dispatch(setComplianceData({[name]: value}));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Post the updated data using fetch
            const response = await axiosPrivate.post(COMPLIANCE_DOC_URL,
                JSON.stringify({...complianceData})
            );
            if (response.status !== 200) {
                throw new Error('Failed to update profile data');
            }
            if (complianceData.bankName !== '' && complianceData.accountName !== '' && complianceData.accountNumber !== '') {
                dispatch(setBankComplete());
            }
            navigate('/compliance/service-agreement');
        } catch (error) {
            console.error("Error updating profile data", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className='mb-4 text-[12px]'>
                <label className="block text-gray-700">Bank Name</label>
                <input
                    type="text"
                    name="bankName"
                    value={complianceData.bankName}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                />
            </div>
            <div className='mb-4 text-[12px]'>
                <label className="block text-gray-700">Account Number</label>
                <input
                    type="number"
                    name="accountNumber"
                    value={complianceData.accountNumber}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                />
            </div>
            <div className='mb-4 text-[12px]'>
                <label className="block text-gray-700">Name on Account</label>
                <input
                    name="accountName"
                    value={complianceData.accountName}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                />
            </div>
            <button type="submit" className="mt-4 bg-priColor text-white py-2 px-4 rounded">
                Save and Continue
            </button>
        </form>
    );
};

export default BankForm;