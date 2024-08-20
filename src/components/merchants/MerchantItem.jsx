import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MerchantItem = ({ merchant }) => {
  const [selectedRow, setSelectedRow] = useState(null);

  const handleActionClick = () => {
    setSelectedRow(selectedRow === merchant._id ? null : merchant._id);
  };

  return (
    <tr className='hover:bg-gray-50'>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(merchant.createdDate).toLocaleDateString()}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{merchant.merchantName}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#0000FF]"><Link to={`/merchant/profile/${merchant._id}`}>Profile</Link></td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#0000FF]"><Link to={`/merchant/document/${merchant._id}`}>Document</Link></td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#0000FF]"><Link to={`/merchant/credentials/${merchant.merchantCode}`}>Credentials</Link></td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#0000FF]"><Link to={`/merchant/bank/${merchant._id}`}>View</Link></td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{merchant.businessType || 'None'}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{merchant.chargeType || 'Merchant'}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{merchant.status}</td>
      <td className="relative px-6 py-4 whitespace-nowrap">
        <button onClick={handleActionClick}>
          <span className="text-gray-500 hover:text-gray-700">⋮</span>
        </button>
        {selectedRow === merchant._id && (
          <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 shadow-lg z-10">
            <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Edit
            </button>
            <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Delete
            </button>
          </div>
        )}
      </td>
    </tr>
  );
};

export default MerchantItem;
