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
      <table className="min-w-full bg-white border rounded">
        <thead>
          <tr>
            <th className="border p-4 text-left">Created Date</th>
            <th className="border p-4 text-left">Merchant Name</th>
            <th className="border p-4 text-left">Profile</th>
            <th className="border p-4 text-left">Document</th>
            <th className="border p-4 text-left">Credentials</th>
            <th className="border p-4 text-left">Bank</th>
            <th className="border p-4 text-left">Business Type</th>
            <th className="border p-4 text-left">Charge Type</th>
            <th className="border p-4 text-left">Status</th>
            <th className="border p-4 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredMerchants.map(merchant => (
            <MerchantItem key={merchant.id} merchant={merchant} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MerchantList;
