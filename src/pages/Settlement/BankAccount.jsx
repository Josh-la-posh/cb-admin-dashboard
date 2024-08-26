import React, { useState } from 'react';
import BankAccountTable from './components/bankAccountTable';

const BankAccount = () => {

    return (
        <div className="min-h-screen bg-white border border-[#E4E7EC] rounded-lg p-8 sm:p-4 md:p-8">
            <header className="mb-8">
                <h1 className="text-[22px] md:text-[28px] text-[#101928] font-semibold text-gray-800">Merchant Bank Account</h1>
            </header>
            <BankAccountTable />
        </div>
    );
};

export default BankAccount;