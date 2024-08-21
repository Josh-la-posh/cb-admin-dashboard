import React, { useState } from 'react';
import AllSettlementTable from './components/allSettlmentTable';

const AllSettlement = () => {

    return (
        <div className="p-6 bg-white">
            <h1 className="text-[20px] text-[#101928] font-semibold text-gray-800">Settlement History</h1>

            <AllSettlementTable />


        </div>
    );
};

export default AllSettlement;