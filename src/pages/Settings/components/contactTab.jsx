import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { AxiosPrivate } from '../../../api/axios';

const MERCHANT_URL = "/api/merchant";

const ContactTab = () => {
    const axiosPrivate = AxiosPrivate();
    const baseUrl = process.env.REACT_APP_API_MERCHANT_BASE_URL;
    const token = localStorage.getItem("accessToken");
    const storedMerchantData = localStorage.getItem('merchantData');
    const merchant = storedMerchantData ? JSON.parse(storedMerchantData) : null;

    const [contactData, setContactData] = useState({
        disputeEmail: [],
        supportEmail: '',
        contactEmail: '',
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!merchant) {
            toast.error('Merchant data not available');
            return;
        }

        const fetchUserData = async () => {
            setLoading(true);
            try {
                const response = await axiosPrivate.get(`${MERCHANT_URL}/${merchant.merchantCode}`);
                const data = response.data;

                console.log(data);

                if (data.requestSuccessful) {
                    const contactData = data.responseData;
                    console.log("Contact-data", contactData)
                    setContactData({
                        disputeEmail: contactData.disputeEmail || [],
                        supportEmail: contactData.supportEmail || '',
                        contactEmail: contactData.contactEmail || '',
                    });
                } else {
                    toast.error('Failed to fetch contact data');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                toast.error('Error fetching contact data');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const handleInputChange = (e, field) => {
        const { value } = e.target;
        setContactData(prevData => ({
            ...prevData,
            [field]: value
        }));
    };

    const handleDisputeEmailAdd = () => {
        setContactData(prevData => ({
            ...prevData,
            disputeEmail: [...prevData.disputeEmail, '']
        }));
    };

    const handleDisputeEmailChange = (index, value) => {
        setContactData(prevData => {
            const newEmails = [...prevData.disputeEmail];
            newEmails[index] = value;
            return { ...prevData, disputeEmail: newEmails };
        });
    };

    const handleDisputeEmailRemove = (index) => {
        setContactData(prevData => {
            const newEmails = prevData.disputeEmail.filter((_, i) => i !== index);
            return { ...prevData, disputeEmail: newEmails };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading state to true during submission
        
        const updatedData = {
            disputeEmail: contactData.disputeEmail,
            supportEmail: contactData.supportEmail,
            contactEmail: contactData.contactEmail,
        };

        console.log("daata", updatedData)
        try {
            const response = await fetch(`${baseUrl}/api/merchant/update/${merchant.merchantCode}`, {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    // Replace with a dynamic token or handle authorization differently
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(updatedData)
            });

            if (response.ok) {
                toast.success('User details updated successfully');
            } else {
                toast.error('Error updating user details');
            }
        } catch (error) {
            toast.error('Error during form submission');
            console.error('Error during form submission:', error);
        } finally {
            setLoading(false); // Reset loading state after submission
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="bg-white p-6">
                <h2 className="text-md font-medium mb-6">Contact</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <p className="text-sm text-gray-600 mb-4">
                            As soon as a dispute (chargeback or fraud claim) is raised for a transaction
                            or more support is required from your team, MoneyXpay will notify you via
                            email in the email addresses that you specify below.
                        </p>
                        <label className="block text-[12px] font-medium text-gray-700 mb-2">
                            Dispute emails
                        </label>
                        {contactData.disputeEmail.map((email, index) => (
                            <div key={index} className="flex mb-2">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => handleDisputeEmailChange(index, e.target.value)}
                                    className="border rounded-l text-sm px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter email address"
                                />
                                {index > 0 && (
                                    <button
                                        type="button"
                                        onClick={() => handleDisputeEmailRemove(index)}
                                        className="bg-red-500 text-white px-3 py-2 rounded-r hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                                    >
                                        Remove
                                    </button>
                                )}
                            </div>
                        ))}
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={handleDisputeEmailAdd}
                                className="text-blue-500 text-[12px] hover:text-blue-600 text-sm focus:outline-none"
                            >
                                Add more emails
                            </button>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="supportEmail" className="block text-[12px] font-medium text-gray-700 mb-1">
                            Support email
                        </label>
                        <input
                            type="email"
                            id="supportEmail"
                            value={contactData.supportEmail}
                            onChange={(e) => handleInputChange(e, 'supportEmail')}
                            className="border rounded text-sm px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="contactEmail" className="block text-[12px] font-medium text-gray-700 mb-1">
                            Contact email
                        </label>
                        <input
                            type="email"
                            id="contactEmail"
                            value={contactData.contactEmail}
                            onChange={(e) => handleInputChange(e, 'contactEmail')}
                            className="border rounded text-sm px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mt-8 flex justify-end">
                        <button
                            type="submit"
                            className={`border border-blue-500 text-black text-sm px-4 py-2 rounded hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-0 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={loading}
                        >
                            {loading ? 'Saving...' : 'Save changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ContactTab;
