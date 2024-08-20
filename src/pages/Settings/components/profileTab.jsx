import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const ProfileTab = () => {
    const baseUrl = process.env.REACT_APP_API_MERCHANT_BASE_URL
    const storedUserData = localStorage.getItem('userData');
    const user = storedUserData ? JSON.parse(storedUserData) : null;
    const [userData, setUserData] = useState({})
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        isDeveloper: false,
    });

    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${baseUrl}/api/users/${user?._id}`, {
                    method: 'GET',
                    headers: {
                        'accept': 'application/json',
                        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyQGV4YW1wbGUuY29tIiwic2NvcGUiOiJtZXJjaGFudF9hcGkiLCJpYXQiOjE3MjQxMjMxMDcsImV4cCI6MTcyNDEyNjcwN30.438sIsNZBCWfKdlB9O_VdS8yz4AdFhH85kmV5_UbKJs'
                    }
                });
                const data = await response.json();

                if (data.requestSuccessful) {
                    const userData = data.responseData;
                    setUserData(userData);
                    setFormData({
                        firstName: userData.firstName,
                        lastName: userData.lastName,
                        email: userData.email,
                        phoneNumber: userData.phoneNumber,
                        isDeveloper: data.responseData.isDeveloper || false, // Set this based on additional logic if required
                    });
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`${baseUrl}/api/users/${userData?._id}`, {
                method: 'PUT',
                headers: {
                    'accept': '*/*',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    phoneNumber: formData.phoneNumber
                })
            });
            const result = await response.json();

            if (response.ok) {
                toast.success('User details updated successfully');
            } else {
                toast.error('Error updating user details');
            }
        } catch (error) {
            toast.error('Error during form submission');
            console.error('Error during form submission:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="bg-white p-6">
                <h2 className="text-md font-medium mb-6">Personal Information</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label htmlFor="fullName" className="block text-[12px] font-medium text-gray-700 mb-1">
                            Full Name
                        </label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                className="border rounded text-sm px-3 py-2 w-1/2 focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="First Name"
                            />
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                className="border rounded text-sm px-3 py-2 w-1/2 focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="Last Name"
                            />
                        </div>
                    </div>

                    <div className="mb-6">
                        <label htmlFor="email" className="block text-[12px] font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="border rounded text-sm px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="phoneNumber" className="block text-[12px] font-medium text-gray-700 mb-1">
                            Phone Number
                        </label>
                        <div className="flex gap-2">
                            <select className="border rounded-l text-sm px-3 py-2 bg-white">
                                <option>+234</option>
                                {/* Add more country codes as needed */}
                            </select>
                            <input
                                type="tel"
                                id="phoneNumber"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleInputChange}
                                className="border rounded-r text-sm px-3 py-2 flex-grow focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>
                    </div>

                    <div className="mb-6 flex gap-[40px]">
                        <label htmlFor="phoneNumber" className="block text-[12px] font-medium text-gray-700 mb-1">
                            Technical Skill
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                name="isDeveloper"
                                checked={formData.isDeveloper}
                                onChange={handleInputChange}
                                className="rounded text-blue-600 focus:ring-primary h-4 w-4 mr-2"
                            />
                            <span className="text-sm text-gray-700">I am a developer</span>
                        </label>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`border border-primary text-black text-sm px-4 py-2 rounded hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-1 focus:ring-primary focus:ring-offset-0 ${loading ? 'bg-blue-600 text-white' : ''}`}
                        >
                            {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>

            <div className="bg-white p-6 mt-8">
                <h2 className="text-md font-medium mb-6">Authentication</h2>
                <div className="mb-4">
                    <div className="flex justify-between items-center">
                        <span className="text-[12px] font-medium text-gray-700">Password</span>
                        <button className="text-sm text-primary hover:text-blue-600 focus:outline-none">
                            Change Password
                        </button>
                    </div>
                </div>
                <div className="mb-4">
                    <div className="flex justify-between items-center">
                        <span className="text-[12px] font-medium text-gray-700">Two-factor Auth</span>
                        <label className="flex items-center cursor-pointer">
                            <div className="relative">
                                <input type="checkbox" className="sr-only" />
                                <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
                                <div className="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition"></div>
                            </div>
                            <div className="ml-3 text-sm font-medium text-gray-700">Disabled</div>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileTab;