// src/components/ContactForm.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setComplianceData, setContactComplete } from '../../../redux/complianceSlice';
import { AxiosPrivate } from '../../../api/axios';

const COMPLIANCE_DOC_URL = '/api/merchant-document';

const ContactForm = () => {
    const axiosPrivate = AxiosPrivate();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const complianceData = useSelector((state) => state.compliance.complianceData);

    const handleChange = (e) => {
        const {name, value} = e.target;
        dispatch(setComplianceData({[name]: value}));
    };
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
            dispatch(setContactComplete());
            navigate('/compliance/business');
        } catch (error) {
            console.error("Error updating profile data", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className='mb-4 text-[12px]'>
                <label className="block text-gray-700">Business Email</label>
                <input
                    type="email"
                    name="businessEmail"
                    value={complianceData.businessEmail}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
            </div>
            <div className='mb-4 text-[12px]'>
                <label className="block text-gray-700">Phone Number</label>
                <div className="flex w-full border border-gray-300 rounded-md">
                    <div className='flex items-center justify-center w-[55px] border-r-2 border-gray-300'>+234</div>
                    <input
                        type="tel"
                        name="phoneNumber"
                        value={complianceData.phoneNumber}
                        onChange={handleChange}
                        className=" px-3 py-2 flex-grow "
                    />
                </div>
            </div>
            <div className='mb-4 text-[12px]'>
                <label className="block text-gray-700">Office Address</label>
                <textarea
                    name="officeAddress"
                    value={complianceData.officeAddress}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
            </div>
            <button type="submit" className="mt-4 bg-priColor text-white py-2 px-4 rounded">
                Save and Continue
            </button>
        </form>
    );
};

export default ContactForm;