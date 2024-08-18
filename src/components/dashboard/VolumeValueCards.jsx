import React from 'react';

const VolumeValueCards = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white shadow rounded-lg p-6 text-center">
                <h3 className="text-lg font-semibold text-gray-700">Till Date</h3>
                <p className="text-xl font-bold text-gray-800">Value: ₦100,000</p>
                <p className="text-lg font-semibold text-gray-600">Volume: 10,000</p>
            </div>
            <div className="bg-white shadow rounded-lg p-6 text-center">
                <h3 className="text-lg font-semibold text-gray-700">Month</h3>
                <p className="text-xl font-bold text-gray-800">Value: ₦20,000</p>
                <p className="text-lg font-semibold text-gray-600">Volume: 2,000</p>
            </div>
            <div className="bg-white shadow rounded-lg p-6 text-center">
                <h3 className="text-lg font-semibold text-gray-700">Today</h3>
                <p className="text-xl font-bold text-gray-800">Value: ₦1,000</p>
                <p className="text-lg font-semibold text-gray-600">Volume: 100</p>
            </div>
        </div>
    );
};

export default VolumeValueCards;
