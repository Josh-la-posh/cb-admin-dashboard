// src/components/ProfileForm.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { setComplianceData, setProfileComplete } from '../../../redux/complianceSlice';
import { AxiosPrivate } from '../../../api/axios';

const COMPLIANCE_DOC_URL = '/api/merchant-document';

const ProfileForm = () => {
    const axiosPrivate = AxiosPrivate();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { updateTitle } = useOutletContext();

    const complianceData = useSelector((state) => state.compliance.complianceData);

    const handleChange = (e) => {
        const {name, value} = e.target;
        dispatch(setComplianceData({[name]: value}));
    }

    useEffect(() => {
        updateTitle('Profile');
    }, [updateTitle])

    useEffect(() => {
        console.log({...complianceData})
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log({...complianceData});

        try {
            // Post the updated data using fetch
            const response = await axiosPrivate.post(COMPLIANCE_DOC_URL,
                JSON.stringify({...complianceData})
            );
            if (response.status !== 200) {
                throw new Error('Failed to update profile data');
            }
            dispatch(setProfileComplete());
            navigate('/compliance/contact');
        } catch (error) {
            console.error("Error updating profile data", error);
        }
        console.log('working')
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className='mb-4 text-[12px]'>
                <label className="block text-gray-700">Company Name</label>
                <input
                    type="text"
                    name="tradingName"
                    value={complianceData.tradingName}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    
                />
            </div>
            <div className='mb-4 text-[12px]'>
                <label className="block text-gray-700">Description</label>
                <textarea
                    name="description"
                    value={complianceData.description}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    
                />
            </div>
            <div className='mb-4 text-[12px]'>
                <label className="block text-gray-700">Staff Size</label>
                <select
                    name="staffSize"
                    value={complianceData.staffSize}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md"
                >
                    <option>1-5</option>
                    <option>6-10</option>
                </select>
            </div>
            <div className='mb-4 text-[12px]'>
                <label className="block text-gray-700">Annual Projected Sales Volume (NGN)</label>
                <input
                    type="text"
                    name="salesVolume"
                    value={complianceData.annualProjectedSalesVolume}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    
                />
            </div>
            <div className='mb-4 text-[12px]'>
                <label className="block text-gray-700">Industry</label>
                <select
                    type="text"
                    name="industry"
                    value={complianceData.industry}
                    onChange={handleChange}
                    className="mt-1 bg-white block w-full px-3 py-3 border border-gray-300 rounded-md"
                    
                >
                    <option value="techi">Techi</option>
                    <option value="none">none</option>
                </select>
            </div>
            <div className='mb-4 text-[12px]'>
                <label className="block text-gray-700">Category</label>
                <select
                    type="text"
                    name="category"
                    value={complianceData.category}
                    onChange={handleChange}
                    className="mt-1 bg-white block w-full px-3 py-3 border border-gray-300 rounded-md"
                    
                >
                    <option value='fintech'>Fintech</option>
                    <option value='none'>None</option>
                </select>
            </div>
            <div className='mb-4 text-[12px]'>
                <label className="block text-gray-700">Business Type</label>
                <select
                    type="text"
                    name="businessType"
                    value={complianceData.businessType}
                    onChange={handleChange}
                    className="mt-1 bg-white block w-full px-3 py-3 border border-gray-300 rounded-md"
                    
                >
                    <option value='sole'>Sole Proprietor</option>
                    <option value='ngo'>NGO</option>
                    <option value='partner'>Partnership</option>
                </select>
            </div>
            <button type="submit" className="mt-4 bg-priColor text-white py-2 px-4 rounded">
                Save and Continue
            </button>
        </form>
    );
};

export default ProfileForm;