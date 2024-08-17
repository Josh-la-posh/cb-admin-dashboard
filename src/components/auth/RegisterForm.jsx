import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Sample data for dropdowns
const countries = [
    { isoCode: 'NG', name: 'Nigeria' },
    { isoCode: 'US', name: 'United States' },
    { isoCode: 'GB', name: 'United Kingdom' },
    // Add more countries as needed
];

const industryCategories = [
    { id: 1, name: 'Fintech' },
    { id: 2, name: 'Agriculture' },
    { id: 3, name: 'Healthcare' },
    // Add more industries as needed
];

const RegisterForm = () => {
    const baseUrl = process.env.REACT_APP_API_MERCHANT_BASE_URL
    const [formData, setFormData] = useState({
        country: 'NG',
        businessName: '',
        contactEmail: '',
        contactPhoneNumber: '',
        contactFirstName: '',
        contactLastName: '',
        industryCategoryId: 1,
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`${baseUrl}/api/onboard`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.success) {
                alert('Registration successful');
            } else {
                setError(data.message || 'Registration failed');
            }
        } catch (error) {
            setError('An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto lg:max-w-4xl">
            <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="businessName">
                        Business Name
                    </label>
                    <input
                        type="text"
                        id="businessName"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleChange}
                        className="w-full px-3 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="lg:flex lg:space-x-4">
                    <div className="mb-4 lg:w-1/2">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contactEmail">
                            Contact Email
                        </label>
                        <input
                            type="email"
                            id="contactEmail"
                            name="contactEmail"
                            value={formData.contactEmail}
                            onChange={handleChange}
                            className="w-full px-3 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4 lg:w-1/2">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contactPhoneNumber">
                            Contact Phone Number
                        </label>
                        <input
                            type="text"
                            id="contactPhoneNumber"
                            name="contactPhoneNumber"
                            value={formData.contactPhoneNumber}
                            onChange={handleChange}
                            className="w-full px-3 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                </div>
                <div className="lg:flex lg:space-x-4">
                    <div className="mb-4 lg:w-1/2">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contactFirstName">
                            First Name
                        </label>
                        <input
                            type="text"
                            id="contactFirstName"
                            name="contactFirstName"
                            value={formData.contactFirstName}
                            onChange={handleChange}
                            className="w-full px-3 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4 lg:w-1/2">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contactLastName">
                            Last Name
                        </label>
                        <input
                            type="text"
                            id="contactLastName"
                            name="contactLastName"
                            value={formData.contactLastName}
                            onChange={handleChange}
                            className="w-full px-3 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="country">
                        Country
                    </label>
                    <select
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full px-3 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    >
                        {countries.map((country) => (
                            <option key={country.isoCode} value={country.isoCode}>
                                {country.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="industryCategoryId">
                        Industry Category
                    </label>
                    <select
                        id="industryCategoryId"
                        name="industryCategoryId"
                        value={formData.industryCategoryId}
                        onChange={handleChange}
                        className="w-full px-3 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    >
                        {industryCategories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                    disabled={loading}
                >
                    {loading ? 'Registering...' : 'Register'}
                </button>
                <div className="text-center mt-4">
                    <Link to="/" className="text-sm text-blue-500 hover:underline">Already have an account? Log in</Link>
                </div>
            </form>
        </div>
    );
};

export default RegisterForm;
