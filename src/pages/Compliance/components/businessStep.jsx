import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setBusinessComplete, setComplianceData } from '../../../redux/complianceSlice';
import { AxiosPrivate } from '../../../api/axios';

const COMPLIANCE_DOC_URL = '/api/merchant-document';

const BusinessForm = () => {
    const axiosPrivate = AxiosPrivate();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const complianceData = useSelector((state) => state.compliance.complianceData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch(setComplianceData({ [name]: value }));
    };

    const handleFileUpload = (e) => {
        setComplianceData({ ...complianceData, [e.target.name]: e.target.files[0] });
    };

    const handleCheckboxChange = () => {
        setComplianceData({ ...complianceData, sameAsBusinessAddress: !complianceData.sameAsBusinessAddress });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log({ ...complianceData });

        try {
            // Post the updated data using fetch
            const response = await axiosPrivate.post(COMPLIANCE_DOC_URL,
                JSON.stringify({ ...complianceData })
            );
            if (response.status !== 200) {
                throw new Error('Failed to update profile data');
            }
            dispatch(setBusinessComplete());
            navigate('/compliance/bank');
        } catch (error) {
            console.error("Error updating profile data", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='mb-4 text-[12px]'>
                <label>Name<span className='text-[red]'>*</span></label>
                <div className="flex gap-3">
                    <input type="text" placeholder='First Name' className='mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md' name="firstName" value={complianceData.firstName} onChange={handleChange} />
                    <input type="text" placeholder='Last Name' className='mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md' name="lastName" value={complianceData.lastName} onChange={handleChange} />
                </div>
            </div>
            <div className='mb-4 text-[12px]'>
                <label>Date of Birth*</label>
                <input type="date" className='mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md' name="dateOfBirth" value={complianceData.dateOfBirth} onChange={handleChange} />
            </div>
            <div className='mb-4 text-[12px]'>
                <label>Nationality*</label>
                <br />
                <select className='mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md' name="nationality" value={complianceData.nationality} onChange={handleChange}>
                    <option value="Nigeria">Nigeria</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            <div className='mb-4 text-[12px]'>
                <label>Identification Document*</label>
                <br />
                <select className='mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md' name="idDocument" value={complianceData.idDocument} onChange={handleChange}>
                    <option value="Voter's Card">Voter's Card</option>
                    <option value="Passport">Passport</option>
                </select>
            </div>
            <div className='mb-4 text-[12px]'>
                <label>{complianceData.idDocument} ID Number*</label>
                <br />
                <input className='mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md' type="text" name="idNumber" value={complianceData.idNumber} onChange={handleChange} />
            </div>
            <div className='mb-4 text-[12px]'>
                <label>Upload a copy of your {complianceData.idDocument || 'ID'}</label>
                <input className='mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md' type="file" name="fileUpload" onChange={handleFileUpload} />
            </div>
            <div className='mb-4 text-[12px]'>
                <label>Home Address</label>
                <br />
                <div className="flex items-center gap-2 my-2">
                    <input type="checkbox" name="sameAsBusinessAddress" checked={complianceData.sameAsBusinessAddress} onChange={handleCheckboxChange} />
                    <label className='text-sm'>Same as business address</label>
                </div>
            </div>
            <div className='mb-4 text-[12px]'>
                <label>Proof of address*</label>
                <br />
                <input className='mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md' type="file" name="proofOfAddress" onChange={handleFileUpload} />
            </div>
            <button type="submit" className='mt-4 bg-priColor text-white py-2 px-4 rounded'>
                Save and Continue
            </button>
        </form>
    );
};

export default BusinessForm;