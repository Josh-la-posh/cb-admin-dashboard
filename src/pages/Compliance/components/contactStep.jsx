// src/components/ContactForm.js
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { setContactComplete } from '../complianceSlice';

const ContactForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { merchantData, isContactComplete } = useOutletContext();
    const token = localStorage.getItem("accessToken");

    const [formData, setFormData] = useState({
        businessEmail: '',
        phoneNumber: '',
        officeAddress: '',
    });

    useEffect(() => {
        // Populate form fields if merchantData exists
        if (merchantData) {
            setFormData({
                businessEmail: merchantData.businessEmail || '',
                phoneNumber: merchantData.phoneNumber || '',
                officeAddress: merchantData.officeAddress || ''
            });
            dispatch(setContactComplete());
        }
    }, [merchantData, dispatch, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // dispatch(setContactComplete());
        // navigate('/compliance/owner');

        const updatedData = {
            ...merchantData, // Keep the rest of the fields unchanged
            businessEmail: formData.businessEmail,
            phoneNumber: formData.phoneNumber,
            officeAddress: formData.officeAddress
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

            dispatch(setContactComplete());
            navigate('/compliance/owner');
        } catch (error) {
            console.error("Error updating profile data", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700">Business Email</label>
                <input
                    type="email"
                    name="businessEmail"
                    value={formData.businessEmail}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Office Address</label>
                <textarea
                    name="officeAddress"
                    value={formData.officeAddress}
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

export default ContactForm;