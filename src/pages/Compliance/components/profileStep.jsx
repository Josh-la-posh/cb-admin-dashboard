// src/components/ProfileForm.js
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { setProfileComplete } from '../complianceSlice';
import axios from '../../../api/axios';

const ProfileForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { merchantData, isProfileComplete } = useOutletContext();
    const token = localStorage.getItem("accessToken");

    const [formData, setFormData] = useState({
        tradingName: '',
        description: '',
        staffSize: '',
        salesVolume: '',
        industry: '',
        category: '',
        businessType: '',
    });

    useEffect(() => {
        if (merchantData) {
            setFormData({
                tradingName: merchantData.tradingName || '',
                description: merchantData.description || '',
                staffSize: merchantData.staffSize || '1-5',
                salesVolume: merchantData.annualProjectedSalesVolume || '',
                industry: merchantData.industry || '',
                category: merchantData.category || '',
                businessType: merchantData.businessType || '',
            });

            dispatch(setProfileComplete());
        }
    }, [merchantData, dispatch, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // dispatch(setProfileComplete());
        // navigate('/compliance/contact');

        const updatedData = {
            ...merchantData, // Keep the rest of the fields unchanged
            tradingName: formData.tradingName,
            description: formData.description,
            staffSize: formData.staffSize,
            annualProjectedSalesVolume: formData.salesVolume,
            industry: formData.industry,
            category: formData.category,
            businessType: formData.businessType,
        };

        try {
            // Post the updated data using fetch
            const response = await fetch('http://localhost:4000/api/merchant-document', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updatedData),
            });

            if (!response.ok) {
                throw new Error('Failed to update profile data');
            }

            dispatch(setProfileComplete());
            navigate('/compliance/contact');
        } catch (error) {
            console.error("Error updating profile data", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700">Trading Name</label>
                <input
                    type="text"
                    name="tradingName"
                    value={formData.tradingName}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Staff Size</label>
                <select
                    name="staffSize"
                    value={formData.staffSize}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md"
                >
                    <option>1-5</option>
                    <option>6-10</option>
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Annual Projected Sales Volume</label>
                <input
                    type="text"
                    name="salesVolume"
                    value={formData.salesVolume}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Industry</label>
                <input
                    type="text"
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Business Type</label>
                <input
                    type="text"
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                />
            </div>
            <button type="submit" className="mt-4 bg-green-500 text-white py-2 px-4 rounded">
                Save and Continue
            </button>
        </form>
    );
};

export default ProfileForm;