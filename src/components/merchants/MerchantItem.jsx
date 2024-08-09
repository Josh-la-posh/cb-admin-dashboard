// components/MerchantItem.js
import React from 'react';
import { Link } from 'react-router-dom';

const MerchantItem = ({ merchant }) => {
  return (
    <tr>
      <td className="border p-4">{merchant.date}</td>
      <td className="border p-4">{merchant.name}</td>
      <td className="border p-4 text-[#0000FF]"><Link to='/'>{merchant.profile}</Link></td>
      <td className="border p-4 text-[#0000FF]"><Link to='/'>{merchant.document}</Link></td>
      <td className="border p-4 text-[#0000FF]"><Link to={`/merchant/credentials`}>{merchant.credentials}</Link></td>
      <td className="border p-4 text-[#0000FF]"><Link to='/'>{merchant.bank}</Link></td>
      <td className="border p-4">{merchant.businessType}</td>
      <td className="border p-4">{merchant.chargeType}</td>
      <td className="border p-4">{merchant.status}</td>
      <td className="border p-4">
        <a href="/" className="text-blue-500 hover:underline mr-4">Edit</a>
        <a href="/" className="text-red-500 hover:underline">Delete</a>
      </td>
    </tr>
  );
};

export default MerchantItem;
