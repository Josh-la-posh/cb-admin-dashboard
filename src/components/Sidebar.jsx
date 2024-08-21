import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { faUserGroup, faHome, faHouse, faGear, faChartLine, faFlag, faEnvelope, faCreditCard, faUser, faCircleCheck, faHandshake, faArrowRightFromBracket, faUnlockKeyhole, faScaleUnbalancedFlip } from '@fortawesome/free-solid-svg-icons';
// import { faFlag, faEnvelope, faCreditCard, faUser, faCircleCheck, faHandshake  } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Sidebar = () => {
  const [isAggregatorOpen, setAggregatorOpen] = useState(false);
  const [isMerchantOpen, setMerchantOpen] = useState(false);
  const [isSettlementOpen, setSettlementOpen] = useState(false);

  return (
    <div className="relative h-[100vh] flex flex-col bg-priColor text-white py-4">
      <div className="pr-4 pl-6 font-bold text-lg">CodeByte</div>
      <nav className="flex-1 my-5 overflow-y-scroll">
        <Link to="/" className="block py-2 pr-4 pl-6 text-sm lg:text-[16px] hover:bg-blue-700">
          <div className='flex items-center gap-2'>
            <FontAwesomeIcon icon={faChartLine} size='xs' />
            Dashboard
          </div>
        </Link>
        <Link to="/compliance" className="block py-2 pr-4 pl-6 text-sm lg:text-[16px] hover:bg-blue-700">
          <div className='flex items-center gap-2'>
            <FontAwesomeIcon icon={faCircleCheck} size='xs' />
            Compliance
          </div>
        </Link>
        <Link to="/customers" className="block py-2 pr-4 pl-6 text-sm lg:text-[16px] hover:bg-blue-700">
          <div className='flex items-center gap-2'>
              <FontAwesomeIcon icon={faUserGroup} size='xs' />
              Customer
            </div>
          </Link>
        <Link to="/disputes" className="block py-2 pr-4 pl-6 text-sm lg:text-[16px] hover:bg-blue-700">
          <div className='flex items-center gap-2'>
            <FontAwesomeIcon icon={faFlag} size='xs'/>
            Disputes
          </div>
        </Link>
        <div>
          <button onClick={() => setAggregatorOpen(!isAggregatorOpen)} className="block w-full text-left py-2 pr-4 pl-6 text-sm lg:text-[16px] hover:bg-blue-700 flex justify-between">
            <div className='flex items-center gap-2'>
              <FontAwesomeIcon icon={faScaleUnbalancedFlip} size='xs'/>
              Aggregator
            </div>
            {isAggregatorOpen ? <FiChevronUp /> : <FiChevronDown />}
          </button>
          {isAggregatorOpen && (
            <div className="ml-4">
              <Link to="/aggregator/bank" className="block py-2 px-4 text-[12px] lg:text-[14px] hover:bg-blue-700">Aggregator Bank</Link>
              <Link to="/aggregator/document" className="block py-2 px-4 text-[12px] lg:text-[14px] hover:bg-blue-700">Aggregator Document</Link>
            </div>
          )}
        </div>
        <Link to="/merchants" className="block py-2 pr-4 pl-6 text-sm lg:text-[16px] hover:bg-blue-700">
          <div className='flex items-center gap-2'>
            <FontAwesomeIcon icon={faHome} size='xs'/>
            Merchant
          </div>
        </Link>
        {/* <div>
          <button onClick={() => setMerchantOpen(!isMerchantOpen)} className="block w-full text-left py-2 pr-4 pl-6 text-sm lg:text-[16px] hover:bg-blue-700 flex justify-between">
          <div className='flex items-center gap-2'>
              <FontAwesomeIcon icon={faHome} size='xs'/>
              Merchant
            </div>
            {isMerchantOpen ? <FiChevronUp /> : <FiChevronDown />}
          </button>
          {isMerchantOpen && (
            <div className="ml-4">
              <Link to="/merchants/merchants" className="block py-2 px-4 text-[12px] lg:text-[14px] hover:bg-blue-700">Merchants</Link>
              <Link to="/merchants/register" className="block py-2 px-4 text-[12px] lg:text-[14px] hover:bg-blue-700">Register Merchant</Link>
            </div>
          )}
        </div> */}
        <div>
          <button onClick={() => setSettlementOpen(!isSettlementOpen)} className="block w-full text-left py-2 pr-4 pl-6 text-sm lg:text-[16px] hover:bg-blue-700 flex justify-between">
            <div className='flex items-center gap-2'>
              <FontAwesomeIcon icon={faHandshake} size='xs'/>
              Settlement
            </div>
            {isSettlementOpen ? <FiChevronUp /> : <FiChevronDown />}
          </button>
          {isSettlementOpen && (
            <div className="ml-4">
              <Link to="/settlement/all" className="block py-2 px-4 text-[12px] lg:text-[14px] hover:bg-blue-700">All Settlement</Link>
              <Link to="/settlement/configuration" className="block py-2 px-4 text-[12px] lg:text-[14px] hover:bg-blue-700">Configuration</Link>
              <Link to="/settlement/bank-account" className="block py-2 px-4 text-[12px] lg:text-[14px] hover:bg-blue-700">Bank Account</Link>
            </div>
          )}
        </div>
        {/* <Link to="/role" className="block py-2 pr-4 pl-6 text-sm lg:text-[16px] hover:bg-blue-700">
          <div className='flex items-center gap-2'>
            <FontAwesomeIcon icon={faUnlockKeyhole} size='xs'/>
            Role
          </div>
        </Link> */}
        <Link to="/invoices" className="block py-2 pr-4 pl-6 text-sm lg:text-[16px] hover:bg-blue-700">
          <div className='flex items-center gap-2'>
            <FontAwesomeIcon icon={faEnvelope} size='xs'/>
            Invoices
          </div>
        </Link>
        <Link to="/transaction" className="block py-2 pr-4 pl-6 text-sm lg:text-[16px] hover:bg-blue-700">
          <div className='flex items-center gap-2'>
            <FontAwesomeIcon icon={faCreditCard} size='xs'/>
            Transaction
          </div>
        </Link>
        <Link to="/users" className="block py-2 pr-4 pl-6 text-sm lg:text-[16px] hover:bg-blue-700">
          <div className='flex items-center gap-2'>
            <FontAwesomeIcon icon={faUser} size='xs'/>
            User
          </div>
        </Link>
      </nav>
      <nav className="flex-shrink-0">
        <Link to="/settings" className="block py-2 pr-4 pl-6 text-sm lg:text-[16px] hover:bg-blue-700">
          <div className='flex items-center gap-2'>
            <FontAwesomeIcon icon={faGear} size='xs'/>
            Settings
          </div>
        </Link>
        <Link to="/logout" className="block py-2 pr-4 pl-6 text-sm lg:text-[16px] hover:bg-blue-700">
          <div className='flex items-center gap-2'>
            <FontAwesomeIcon icon={faArrowRightFromBracket} size='xs'/>
            Logout
          </div>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
