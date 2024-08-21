import React, { useState } from 'react';
import BankAccountTable from './components/bankAccountTable';

const BankAccount = () => {

    return (
        <div className="p-6 bg-white">
            <h1 className="text-[20px] text-[#101928] font-semibold text-gray-800">Merchant Bank Account</h1>

            <BankAccountTable />


        </div>
    );
};

export default BankAccount;