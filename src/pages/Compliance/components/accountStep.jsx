// src/components/ContactForm.js
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { setAccountComplete } from '../complianceSlice';

const AccountForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { merchantData, isAccountComplete } = useOutletContext();
    const token = localStorage.getItem("accessToken");

    const [formData, setFormData] = useState({
        bankName: '',
        accountName: '',
        accountNumber: '',
    });

    useEffect(() => {
        // Populate form fields if merchantData exists
        if (merchantData) {
            setFormData({
                bankName: merchantData.bankName || '',
                accountName: merchantData.accountName || '',
                accountNumber: merchantData.accountNumber || '',
            });
            dispatch(setAccountComplete());
        }
    }, [merchantData, dispatch, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // dispatch(setAccountComplete());
        // navigate('/compliance/service-agreement');
        const updatedData = {
            ...merchantData, // Keep the rest of the fields unchanged
            bankName: formData.bankName,
            accountName: formData.accountName,
            accountNumber: formData.accountNumber
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

            dispatch(setAccountComplete());
            navigate('/compliance/service-agreement');
        } catch (error) {
            console.error("Error updating profile data", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700">Bank Name</label>
                <input
                    type="text"
                    name="bankName"
                    value={formData.bankName}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Account Number</label>
                <input
                    type="number"
                    name="accountNumber"
                    value={formData.accountNumber}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Name on Account</label>
                <input
                    name="accountName"
                    value={formData.accountName}
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

export default AccountForm;