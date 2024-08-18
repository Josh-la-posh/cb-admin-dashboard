// components/MerchantItem.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MerchantItem = ({ merchant }) => {
  const [selectedRow, setSelectedRow] = useState(null);

  const handleActionClick = (index) => {
    setSelectedRow(selectedRow === index ? null : index);
  };


  return (
    <tr className='hover:bg-gray-50'>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{merchant.date}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{merchant.name}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#0000FF]"><Link to='/'>{merchant.profile}</Link></td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#0000FF]"><Link to='/'>{merchant.document}</Link></td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#0000FF]"><Link to={`/merchant/credentials`}>{merchant.credentials}</Link></td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#0000FF]"><Link to='/'>{merchant.bank}</Link></td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{merchant.businessType}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{merchant.chargeType}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{merchant.status}</td>
      <td className="relative px-6 py-4 whitespace-nowrap">
        <button onClick={(e) => handleActionClick(merchant.id)}>
          <span className="text-gray-500 hover:text-gray-700">⋮</span>
        </button>
        {selectedRow === merchant.id && (
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
