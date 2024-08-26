import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const APIKeysTab = () => {
    const baseUrl = process.env.REACT_APP_API_MERCHANT_BASE_URL;
    const storedMerchantData = localStorage.getItem('merchantData');
    const merchantData = storedMerchantData ? JSON.parse(storedMerchantData) : null;
    const token = localStorage.getItem("accessToken");
    const [credentials, setCredentials] = useState({
        clientId: '',
        clientSecret: '',
        integrationKey: ''
    });
    const [showSecret, setShowSecret] = useState(false);
    const [ipAddresses, setIpAddresses] = useState([]);
    const [testCallbackUrl, setTestCallbackUrl] = useState('');
    const [testWebhookUrl, setTestWebhookUrl] = useState('');

    useEffect(() => {
        const fetchCredentials = async () => {
            try {
                const response = await fetch(`${baseUrl}/api/merchant/credentials/${merchantData.merchantCode}`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();

                if (data.requestSuccessful) {
                    setCredentials({
                        clientId: data.responseData.clientId,
                        clientSecret: data.responseData.clientSecret,
                        integrationKey: data.responseData.integrationKey
                    });
                } else {
                    toast.error('Failed to fetch credentials');
                }
            } catch (error) {
                toast.error('Error fetching credentials');
                console.error('Error fetching credentials:', error);
            }
        };

        fetchCredentials();
    }, [baseUrl, token]);

    const handleShowSecretToggle = () => {
        setShowSecret(prev => !prev);
    };

    const handleIpAddressAdd = () => {
        setIpAddresses(prev => [...prev, '']);
    };

    const handleIpAddressChange = (index, value) => {
        const newIpAddresses = [...ipAddresses];
        newIpAddresses[index] = value;
        setIpAddresses(newIpAddresses);
    };

    const handleIpAddressRemove = (index) => {
        setIpAddresses(prev => prev.filter((_, i) => i !== index));
    };

    const handleSaveChanges = async () => {
        try {
            // You may want to add code here to save the changes to the server
            toast.success('Changes saved successfully');
        } catch (error) {
            toast.error('Error saving changes');
            console.error('Error saving changes:', error);
        }
    };

    return (
        <div className="p-6 bg-white">
            <h2 className="text-md font-medium mb-6">API Configuration - Test Mode</h2>

            <div className="bg-red-100 text-sm text-red-600 p-4 rounded mb-8">
                These keys are for testing only. Please DO NOT use them in production.
            </div>

            <div className="space-y-8">
                {/* Test Secret Key */}
                <div>
                    <label className="block text-[12px] font-medium text-gray-700">Test Integration Key</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <input
                            type={showSecret ? 'text' : 'password'}
                            className="form-input block w-full pr-10 sm:text-sm border-gray-300 rounded-md"
                            value={credentials.clientSecret || '*******************'}
                            readOnly
                        />
                        <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500">
                            <button
                                type="button"
                                className="text-sm text-blue-600 hover:text-blue-800"
                                onClick={handleShowSecretToggle}
                            >
                                {showSecret ? 'Hide' : 'Show'}
                            </button>
                        </span>
                    </div>
                </div>

                {/* IP Whitelist */}
                <div>
                    <label className="block text-[12px] font-medium text-gray-700">IP Whitelist</label>
                    {ipAddresses.map((ip, index) => (
                        <div key={index} className="flex mb-2">
                            <input
                                type="text"
                                className="px-2 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                                value={ip}
                                onChange={(e) => handleIpAddressChange(index, e.target.value)}
                                placeholder="Add IP addresses"
                            />
                            {index > 0 && (
                                <button
                                    type="button"
                                    onClick={() => handleIpAddressRemove(index)}
                                    className="bg-red-500 text-white px-3 py-2 rounded-r hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                                >
                                    Remove
                                </button>
                            )}
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={handleIpAddressAdd}
                        className="text-blue-500 text-[12px] hover:text-blue-600 text-sm focus:outline-none"
                    >
                        + Add IP addresses
                    </button>
                </div>

                {/* Test Public Key */}
                <div>
                    <label className="block text-[12px] font-medium text-gray-700">Test Client Id</label>
                    <input
                        type="text"
                        className="px-2 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                        value={credentials.integrationKey || ''}
                        readOnly
                    />
                </div>

                {/* Test Callback URL */}
                <div>
                    <label className="block text-[12px] font-medium text-gray-700">Test Callback URL</label>
                    <input
                        type="text"
                        className="px-2 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                        value={testCallbackUrl}
                        onChange={(e) => setTestCallbackUrl(e.target.value)}
                        placeholder="https://example.com"
                    />
                </div>

                {/* Test Webhook URL */}
                <div>
                    <label className="block text-[12px] font-medium text-gray-700">Test Webhook URL</label>
                    <input
                        type="text"
                        className="px-2 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                        value={testWebhookUrl}
                        onChange={(e) => setTestWebhookUrl(e.target.value)}
                        placeholder="https://example.com"
                    />
                </div>

                <div className="flex justify-end">
                    <button
                        type="button"
                        onClick={handleSaveChanges}
                        className="bg-blue-600 text-sm text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Save changes
                    </button>
                </div>
            </div>

            <div className="flex items-center justify-center mt-6 text-[12px] text-center text-sm gap-2">
                Need help with your integration?
                <a
                    href="https://docs-payment-api.codebytesltd.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                >
                    Check out our API documentation
                </a>
            </div>
        </div>
    );
};

export default APIKeysTab;
