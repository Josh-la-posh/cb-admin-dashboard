import React from 'react';

const MerchantSelector = ({ merchant }) => {
  return (
    <div className="">
      <p className="block text-sm pl-2 font-medium text-gray-700 mb-1">
        Merchant:
      </p>
      <div className='flex items-center'>
        <select
          id="merchant"
          name="merchant"
          className="mt-1 block w-64 pl-3 pr-10 py-2 text-base bg-white border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
        >
          <option>{merchant.merchantName}</option>
          {/* Add other merchant options here */}
        </select>
        <button className="ml-4 bg-blue-800 text-white px-4 py-1 rounded">
          Submit
        </button>
      </div>
    </div>
  );
};

export default MerchantSelector;