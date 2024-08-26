import React, { useEffect, useState } from 'react';
import InvoicesTable from './components/InvoicesTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

const Invoices = () => {
  const [invoice, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseUrl = process.env.REACT_APP_API_MERCHANT_BASE_URL
  const storedMerchantData = localStorage.getItem('merchantData');
  const merchantData = storedMerchantData ? JSON.parse(storedMerchantData) : null;

  console.log("Merchant", merchantData)

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/Transaction/${merchantData.merchantCode}`, {
          headers: {
            'accept': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch invoice');
        }

        const data = await response.json();
        setInvoices(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="min-h-screen bg-white border border-[#E4E7EC] rounded-lg p-8 sm:p-4 md:p-8">
      <div className="flex justify-between items-center">
        <header className="">
            <h1 className="text-[22px] md:text-[28px] text-[#101928] font-semibold text-gray-800">Invoices</h1>
        </header>
        <button className='flex items-center justify-center rounded-[8px] gap-[10px] px-[12px] py-[8px] text-white text-xs font-[600] bg-priColor'>
          <FontAwesomeIcon icon={faDownload}/>
          <span>Export CSV</span>
        </button>
      </div>
      <InvoicesTable  />
    </div>
  );
};

export default Invoices;