import React, { useEffect, useState } from 'react';
import MerchantItem from './MerchantItem';

const MerchantList = () => {
  const [merchants, setMerchants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseUrl = process.env.REACT_APP_API_MERCHANT_BASE_URL
  const storedMerchantData = localStorage.getItem('merchantData');
  const merchantData = storedMerchantData ? JSON.parse(storedMerchantData) : null;
  const aggregatorId = merchantData.aggregatorId;

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchMerchants = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/merchants/${aggregatorId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        if (result.success) {
          setMerchants(result.data);
        } else {
          setMerchants([]);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMerchants();
  }, []);

  const filteredMerchants = merchants.filter(merchant =>
    merchant.merchantName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by Merchant Name"
          className="border p-2 rounded w-1/2"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="bg-green-500 text-white px-4 py-2 rounded">Create New Merchant</button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg border border-gray-200">
          <thead className='bg-[#F0F2F5]'>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Merchant Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profile</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Credentials</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bank</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Business Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Charge Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {filteredMerchants.length > 0 ? (
              filteredMerchants.map(merchant => (
                <MerchantItem key={merchant._id} merchant={merchant} />
              ))
            ) : (
              <tr>
                <td colSpan="10" className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  No merchants found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MerchantList;
