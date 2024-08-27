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
      {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-[#0000FF]"><Link to={`/merchant/document/${merchant._id}`}>Document</Link></td> */}
      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#0000FF]"><Link to={`/merchant/credentials/${merchant.merchantCode}`}>Credentials</Link></td>
      {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-[#0000FF]"><Link to={`/merchant/bank/${merchant._id}`}>View</Link></td> */}
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{merchant.businessType || 'None'}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{merchant.chargeType || 'Merchant'}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{merchant.status}</td>
    </tr>
  );
};

export default MerchantItem;
