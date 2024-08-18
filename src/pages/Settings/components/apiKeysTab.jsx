import React from 'react';

const APIKeysTab = () => {
  return (
    <div className="p-6 bg-white">
      <h2 className="text-md font-medium mb-6">API Configuration - Test Mode</h2>
      
      <div className="bg-red-100 text-sm text-red-600 p-4 rounded mb-8">
        These keys are for testing only. Please DO NOT use them in production.
      </div>

      <div className="space-y-8">
        {/* Test Secret Key */}
        <div>
          <label className="block text-[12px] font-medium text-gray-700">Test Secret Key</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <input
              type="password"
              className="form-input block w-full pr-10 sm:text-sm border-gray-300 rounded-md"
              value="*******************"
            />
            <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500">
              <button className="text-sm text-blue-600 hover:text-blue-800">Show</button>
            </span>
          </div>
        </div>

        {/* IP Whitelist */}
        <div>
          <label className="block text-[12px] font-medium text-gray-700">IP Whitelist</label>
          <input
            type="text"
            className="px-2 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="Add IP addresses"
          />
          <button className="mt-2 text-sm text-blue-600 hover:text-blue-800">+ Add IP addresses</button>
        </div>

        {/* Test Public Key */}
        <div>
          <label className="block text-[12px] font-medium text-gray-700">Test Public Key</label>
          <input
            type="text"
            className="px-2 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
            value="pk_test_dec2bc0ba6eba24e4475db020378189f01521a26"
            readOnly
          />
        </div>

        {/* Test Callback URL */}
        <div>
          <label className="block text-[12px] font-medium text-gray-700">Test Callback URL</label>
          <input
            type="text"
            className="px-2 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="https://example.com"
          />
        </div>

        {/* Test Webhook URL */}
        <div>
          <label className="block text-[12px] font-medium text-gray-700">Test Webhook URL</label>
          <input
            type="text"
            className="px-2 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="https://example.com"
          />
        </div>
        
        <div className="flex justify-end">
          <button className="bg-blue-600 text-sm text-white px-4 py-2 rounded hover:bg-blue-700">Save changes</button>
        </div>
      </div>

      <div className="mt-6 text-[12px] text-center text-sm">
        Need help with your integration? <a href="#" className="text-blue-600 hover:text-blue-800">Check out our API documentation</a>
      </div>
    </div>
  );
};

export default APIKeysTab;
