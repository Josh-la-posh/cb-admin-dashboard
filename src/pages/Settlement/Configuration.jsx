import React, { useState } from 'react';
import ConfigurationTable from './components/configurationTable';

const Configuration = () => {

    return (
        <div className="p-6 bg-white">
            <h1 className="text-[20px] text-[#101928] font-semibold text-gray-800">Settlement Configuration</h1>

            <ConfigurationTable />


        </div>
    );
};

export default Configuration;