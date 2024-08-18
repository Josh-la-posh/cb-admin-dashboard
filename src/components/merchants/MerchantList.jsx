// components/MerchantList.js
import React, { useState } from 'react';
import MerchantItem from './MerchantItem';

const MerchantList = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const merchants = [
    { id: 1, name: 'Dan LTD', date: '27/07/2023', profile: 'Profile', document: 'Document', credentials: 'Credentials', bank: 'View', businessType: 'None', chargeType: 'Merchant', status: 'Sandbox' },
    { id: 2, name: 'Daddydof LTD', date: '15/07/2023', profile: 'Profile', document: 'Document', credentials: 'Credentials', bank: 'View', businessType: 'None', chargeType: 'Customer', status: 'Production' },
    // Add more merchants here
  ];

  const filteredMerchants = merchants.filter(merchant =>
    merchant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            {filteredMerchants.map(merchant => (
              <MerchantItem key={merchant.id} merchant={merchant} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MerchantList;