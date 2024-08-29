import React, { useState } from 'react';
import BankAccountTable from './components/bankAccountTable';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const BankAccount = () => {
    const [isExportPopupOpen, setIsExportPopupOpen] = useState(false);

    return (
      <div className="min-h-screen bg-white border border-[#E4E7EC] rounded-lg p-8 sm:p-4 md:p-8">
        <div className="flex justify-between items-center mb-8">
          <header className="">
              <h1 className="text-[18px] md:text-[24px] text-[#101928] font-semibold text-gray-800">Merchant Bank Account</h1>
          </header>
          <button
            onClick={() => setIsExportPopupOpen(true)}
            className='flex items-center justify-center rounded-[8px] gap-[10px] px-[12px] py-[8px] text-white text-xs font-[600] bg-priColor'
          >
            <FontAwesomeIcon icon={faDownload}/>
            <span>Export</span>
          </button>
        </div>
          <BankAccountTable isExportPopupOpen={isExportPopupOpen} setIsExportPopupOpen={setIsExportPopupOpen} />
      </div>
    );
};

export default BankAccount;