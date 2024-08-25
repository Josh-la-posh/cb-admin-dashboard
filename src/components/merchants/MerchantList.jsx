import React, { useEffect, useState } from 'react';
import MerchantItem from './MerchantItem';
import { AxiosPrivate } from '../../api/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const MERCHANT_URL = '/api/merchants';

const MerchantList = () => {
  const axiosPrivate = AxiosPrivate();
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
        const response = await axiosPrivate.get(`${MERCHANT_URL}/${aggregatorId}`)

        if (response.status !== 200) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.data;
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
    <div className="">

      <div className="my-3 sm:my-6 py-3 sm:py-6 flex flex-col sm:flex-row sm:items-center gap-[30px] border-y border-[#F0F2F5]">
        <div className="relative">
            <input
                type="text"
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-priColor"
                placeholder="Search customers..."
            />
            <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="absolute left-3 top-2/4 transform -translate-y-2/4 text-gray-400"
            />
        </div>

        {/* <div className="flex-1">
            <select
                value={filterStatus}
                onChange={handleFilterChange}
                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-priColor"
            >
                <option value="">All</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Suspended">Suspended</option>
            </select>
        </div> */}
    </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg border border-gray-200">
          <thead className='bg-[#F0F2F5]'>
            <tr>
              <th className="px-6 py-3 text-left text-[9px] md:text-xs font-medium text-gray-500 uppercase tracking-wider">Created Date</th>
              <th className="px-6 py-3 text-left text-[9px] md:ttext-xs font-medium text-gray-500 uppercase tracking-wider">Merchant Name</th>
              <th className="px-6 py-3 text-left text-[9px] md:ttext-xs font-medium text-gray-500 uppercase tracking-wider">Profile</th>
              <th className="px-6 py-3 text-left text-[9px] md:ttext-xs font-medium text-gray-500 uppercase tracking-wider">Document</th>
              <th className="px-6 py-3 text-left text-[9px] md:ttext-xs font-medium text-gray-500 uppercase tracking-wider">Credentials</th>
              <th className="px-6 py-3 text-left text-[9px] md:ttext-xs font-medium text-gray-500 uppercase tracking-wider">Bank</th>
              <th className="px-6 py-3 text-left text-[9px] md:ttext-xs font-medium text-gray-500 uppercase tracking-wider">Business Type</th>
              <th className="px-6 py-3 text-left text-[9px] md:ttext-xs font-medium text-gray-500 uppercase tracking-wider">Charge Type</th>
              <th className="px-6 py-3 text-left text-[9px] md:ttext-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-[9px] md:ttext-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200 text-xs sm:text-sm'>
            {filteredMerchants.length > 0 ? (
              filteredMerchants.map(merchant => (
                <MerchantItem key={merchant._id} merchant={merchant} />
              ))
            ) : (
              <tr>
                <td colSpan="10" className="px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 text-center">
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
