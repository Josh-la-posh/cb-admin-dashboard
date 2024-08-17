// src/components/Sidebar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const Sidebar = () => {
  const [isAggregatorOpen, setAggregatorOpen] = useState(false);
  const [isMerchantOpen, setMerchantOpen] = useState(false);
  const [isSettlementOpen, setSettlementOpen] = useState(false);

  return (
    <div className="w-64 bg-blue-900 text-white">
      <div className="p-4 font-bold text-lg">CodeByte</div>
      <nav className="mt-5">
        <Link to="/home" className="block py-2 px-4 hover:bg-blue-700">Dashboard</Link>
        <Link to="/customers" className="block py-2 px-4 hover:bg-blue-700">Customers</Link>
        <Link to="/disputes" className="block py-2 px-4 hover:bg-blue-700">Disputes</Link>
        <div>
          <button onClick={() => setAggregatorOpen(!isAggregatorOpen)} className="block w-full text-left py-2 px-4 hover:bg-blue-700 flex justify-between">
            Aggregator
            {isAggregatorOpen ? <FiChevronUp /> : <FiChevronDown />}
          </button>
          {isAggregatorOpen && (
            <div className="ml-4">
              <Link to="/aggregator/bank" className="block py-2 px-4 hover:bg-blue-700">Aggregator Bank</Link>
              <Link to="/aggregator/document" className="block py-2 px-4 hover:bg-blue-700">Aggregator Document</Link>
            </div>
          )}
        </div>
        <div>
          <button onClick={() => setMerchantOpen(!isMerchantOpen)} className="block w-full text-left py-2 px-4 hover:bg-blue-700 flex justify-between">
            Merchants
            {isMerchantOpen ? <FiChevronUp /> : <FiChevronDown />}
          </button>
          {isMerchantOpen && (
            <div className="ml-4">
              <Link to="/merchants/merchants" className="block py-2 px-4 hover:bg-blue-700">Merchants</Link>
              <Link to="/merchants/register" className="block py-2 px-4 hover:bg-blue-700">Register Merchant</Link>
            </div>
          )}
        </div>
        <div>
          <button onClick={() => setSettlementOpen(!isSettlementOpen)} className="block w-full text-left py-2 px-4 hover:bg-blue-700 flex justify-between">
            Settlement
            {isSettlementOpen ? <FiChevronUp /> : <FiChevronDown />}
          </button>
          {isSettlementOpen && (
            <div className="ml-4">
              <Link to="/settlement/all" className="block py-2 px-4 hover:bg-blue-700">All Settlement</Link>
              <Link to="/settlement/configuration" className="block py-2 px-4 hover:bg-blue-700">Configuration</Link>
              <Link to="/settlement/bank-account" className="block py-2 px-4 hover:bg-blue-700">Bank Account</Link>
            </div>
          )}
        </div>
        <Link to="/role" className="block py-2 px-4 hover:bg-blue-700">Role</Link>
        <Link to="/invoices" className="block py-2 px-4 hover:bg-blue-700">Invoices</Link>
        <Link to="/transaction" className="block py-2 px-4 hover:bg-blue-700">Transaction</Link>
        <Link to="/users" className="block py-2 px-4 hover:bg-blue-700">Users</Link>
        {/* <Link to="/page-customization" className="block py-2 px-4 hover:bg-blue-700">Page Customization</Link> */}
      </nav>
    </div>
  );
};

export default Sidebar;
