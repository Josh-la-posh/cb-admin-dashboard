import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import logo from "../../src/assets/logo.jpg"

const Sidebar = () => {
  const [isAggregatorOpen, setAggregatorOpen] = useState(false);
  const [isMerchantOpen, setMerchantOpen] = useState(false);
  const [isSettlementOpen, setSettlementOpen] = useState(false);

  return (
    <div className="relative h-[100vh] flex flex-col bg-[#272662] text-white pb-4">
      {/* <div className="pr-4 pl-6 font-bold text-lg">CodeByte</div> */}
      <div className='bg-green-500 w-full h-14'>
        <img src={logo} alt="CodeByte Logo" className="w-full h-full object-cover" />
      </div>
      <nav className="flex-1 my-5 overflow-y-auto"> {/* Change overflow-y-scroll to overflow-y-auto */}
        <Link to="/home" className="block py-2 pr-4 pl-6 text-sm lg:text-[16px] hover:bg-blue-700">Dashboard</Link>
        <Link to="/compliance" className="block py-2 pr-4 pl-6 text-sm lg:text-[16px] hover:bg-blue-700">Compliance</Link>
        <Link to="/customers" className="block py-2 pr-4 pl-6 text-sm lg:text-[16px] hover:bg-blue-700">Customers</Link>
        <Link to="/disputes" className="block py-2 pr-4 pl-6 text-sm lg:text-[16px] hover:bg-blue-700">Disputes</Link>
        <div>
          <button onClick={() => setAggregatorOpen(!isAggregatorOpen)} className="block w-full text-left py-2 pr-4 pl-6 text-sm lg:text-[16px] hover:bg-blue-700 flex justify-between">
            Aggregator
            {isAggregatorOpen ? <FiChevronUp /> : <FiChevronDown />}
          </button>
          {isAggregatorOpen && (
            <div className="ml-4">
              <Link to="/aggregator/bank" className="block py-2 px-4 text-[12px] lg:text-[14px] hover:bg-blue-700">Aggregator Bank</Link>
              <Link to="/aggregator/document" className="block py-2 px-4 text-[12px] lg:text-[14px] hover:bg-blue-700">Aggregator Document</Link>
            </div>
          )}
        </div>
        <div>
          <button onClick={() => setMerchantOpen(!isMerchantOpen)} className="block w-full text-left py-2 pr-4 pl-6 text-sm lg:text-[16px] hover:bg-blue-700 flex justify-between">
            Merchants
            {isMerchantOpen ? <FiChevronUp /> : <FiChevronDown />}
          </button>
          {isMerchantOpen && (
            <div className="ml-4">
              <Link to="/merchants/merchants" className="block py-2 px-4 text-[12px] lg:text-[14px] hover:bg-blue-700">Merchants</Link>
              <Link to="/merchants/register" className="block py-2 px-4 text-[12px] lg:text-[14px] hover:bg-blue-700">Register Merchant</Link>
            </div>
          )}
        </div>
        <div>
          <button onClick={() => setSettlementOpen(!isSettlementOpen)} className="block w-full text-left py-2 pr-4 pl-6 text-sm lg:text-[16px] hover:bg-blue-700 flex justify-between">
            Settlement
            {isSettlementOpen ? <FiChevronUp /> : <FiChevronDown />}
          </button>
          {isSettlementOpen && (
            <div className="ml-4">
              <Link to="/settlement/all" className="block py-2 px-4 text-[12px] lg:text-[14px] hover:bg-blue-700">All Settlement</Link>
              {/* <Link to="/settlement/configuration" className="block py-2 px-4 text-[12px] lg:text-[14px] hover:bg-blue-700">Configuration</Link> */}
              <Link to="/settlement/bank-account" className="block py-2 px-4 text-[12px] lg:text-[14px] hover:bg-blue-700">Bank Account</Link>
            </div>
          )}
        </div>
        <Link to="/role" className="block py-2 pr-4 pl-6 text-sm lg:text-[16px] hover:bg-blue-700">Role</Link>
        <Link to="/invoices" className="block py-2 pr-4 pl-6 text-sm lg:text-[16px] hover:bg-blue-700">Invoices</Link>
        <Link to="/transaction" className="block py-2 pr-4 pl-6 text-sm lg:text-[16px] hover:bg-blue-700">Transaction</Link>
        {/* <Link to="/users" className="block py-2 pr-4 pl-6 text-sm lg:text-[16px] hover:bg-blue-700">Users</Link> */}
      </nav>
      <nav className="flex-shrink-0">
        <Link to="/settings" className="block py-2 pr-4 pl-6 text-sm lg:text-[16px] hover:bg-blue-700">Settings</Link>
        <Link to="/logout" className="block py-2 pr-4 pl-6 text-sm lg:text-[16px] hover:bg-blue-700">Logout</Link>
      </nav>
    </div>
  );
};

export default Sidebar;
