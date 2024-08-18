import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for making HTTP requests
import { loginFailure, loginSuccess } from './authSlice';
import { useDispatch } from 'react-redux';

const RegisterMultiStepPage = () => {
    const dispatch = useDispatch();
    const baseUrl = process.env.REACT_APP_API_MERCHANT_BASE_URL
    const token = localStorage.getItem("accessTokenDemo");
    const storedMerchantData = localStorage.getItem('merchantData');
    const merchantData = storedMerchantData ? JSON.parse(storedMerchantData) : null;

    console.log("Merchant", merchantData)

    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        merchantCode: merchantData ? merchantData.merchantCode : '',
        businessName: merchantData ? merchantData.merchantName : '',
        businessType: 'Starter Business',
        country: 'NG',
        businessCategory: 'Sole Proprietorship',
        industryCategory: 'Fintech'
    });

    const navigate = useNavigate();

    const handleNextStep = () => {
        if (step < 3) {
            setStep(step + 1);
        }
    };

    const handlePrevStep = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Prepare the headers with the authorization token
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`, // Include the token in the Authorization header
                },
            };

            console.log("Form-Data", formData)
            // Send the form data to the backend endpoint
            const response = await axios.post(`${baseUrl}/api/merchant/confirm`, formData, config);
            alert('Registration completed successfully');
            // console.log('Response:', response.data);
            // Dispatch success action
            dispatch(loginSuccess({ email: merchantData.contactEmail }));
            navigate('/home'); // Redirect to dashboard after finishing
        } catch (error) {
            console.error('Error submitting form data:', error);
            alert('There was an error during registration. Please try again.');
            dispatch(loginFailure('An unexpected error occurred'));
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-white">
            <div className="w-full max-w-lg bg-white shadow-2xl rounded-xl p-8">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Register Your Business</h2>

                {/* Progress Bar */}
                <div className="relative mb-12">
                    <div className="flex items-center justify-between">
                        {['Business Info', 'Location & Category', 'Industry'].map((label, index) => (
                            <div key={index} className="relative flex-1 text-center">
                                <div
                                    className={`flex items-center justify-center w-12 h-12 rounded-full font-semibold border-4 ${step > index ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-gray-300 text-gray-600'
                                        }`}
                                >
                                    {step > index ? '✔' : index + 1}
                                </div>
                                <div
                                    className={`mt-2 text-sm font-medium ${step > index ? 'text-blue-600' : 'text-gray-600'
                                        }`}
                                >
                                    {label}
                                </div>
                                {index < 2 && (
                                    <div
                                        className={`absolute top-1/2 w-1/2 h-1 ${step > index ? 'bg-blue-600' : 'bg-gray-300'
                                            }`}
                                        style={{
                                            transform: 'translateY(-50%)',
                                            left: 'calc(100% / 3)',
                                            zIndex: -1,
                                        }}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                    <div
                        className={`absolute inset-0 flex items-center justify-center ${step === 1 ? 'opacity-0' : 'opacity-100'
                            }`}
                    >
                        <div
                            className={`absolute inset-0 flex items-center ${step > 1 ? 'bg-blue-600' : 'bg-gray-300'
                                }`}
                            style={{ height: '2px', width: `${(step / 3) * 100}%`, transition: 'width 0.3s ease' }}
                        />
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-8">
                    {step === 1 && (
                        <div className="space-y-6">
                            <div>
                                <label className="block text-gray-700 text-lg font-semibold mb-2" htmlFor="businessName">
                                    Business Name
                                </label>
                                <input
                                    type="text"
                                    id="businessName"
                                    name="businessName"
                                    value={formData.businessName}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                                    placeholder="Enter your business name"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-lg font-semibold mb-2" htmlFor="businessType">
                                    Business Type
                                </label>
                                <select
                                    id="businessType"
                                    name="businessType"
                                    value={formData.businessType}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                                    required
                                >
                                    <option value="Starter Business">Starter Business</option>
                                    <option value="Registered Business">Registered Business</option>
                                </select>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={handleNextStep}
                                    className="bg-blue-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-6">
                            <div>
                                <label className="block text-gray-700 text-lg font-semibold mb-2" htmlFor="country">
                                    Country
                                </label>
                                <select
                                    id="country"
                                    name="country"
                                    value={formData.country}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                                    required
                                >
                                    <option value="NG">Nigeria</option>
                                    <option value="US">United States</option>
                                    <option value="GB">United Kingdom</option>
                                    {/* Add more countries as needed */}
                                </select>
                            </div>
                            <div>
                                <label className="block text-gray-700 text-lg font-semibold mb-2" htmlFor="businessCategory">
                                    Business Category
                                </label>
                                <select
                                    id="businessCategory"
                                    name="businessCategory"
                                    value={formData.businessCategory}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                                    required
                                >
                                    <option value="Sole Proprietorship">Sole Proprietorship</option>
                                    <option value="Partnership">Partnership</option>
                                    <option value="NGO">NGO</option>
                                    {/* Add more categories as needed */}
                                </select>
                            </div>
                            <div className="flex justify-between">
                                <button
                                    type="button"
                                    onClick={handlePrevStep}
                                    className="bg-gray-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-gray-600 transition duration-300"
                                >
                                    Back
                                </button>
                                <button
                                    type="button"
                                    onClick={handleNextStep}
                                    className="bg-blue-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-6">
                            <div>
                                <label className="block text-gray-700 text-lg font-semibold mb-2" htmlFor="industryCategory">
                                    Industry Category
                                </label>
                                <select
                                    id="industryCategory"
                                    name="industryCategory"
                                    value={formData.industryCategory}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                                    required
                                >
                                    <option value="Fintech">Fintech</option>
                                    <option value="Healthcare">Healthcare</option>
                                    <option value="Agriculture">Agriculture</option>
                                    {/* Add more industries as needed */}
                                </select>
                            </div>
                            <div className="flex justify-between">
                                <button
                                    type="button"
                                    onClick={handlePrevStep}
                                    className="bg-gray-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-gray-600 transition duration-300"
                                >
                                    Back
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default RegisterMultiStepPage;
