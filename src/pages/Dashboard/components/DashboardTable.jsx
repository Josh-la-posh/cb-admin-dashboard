import React, { useState } from 'react';
import DataTable from '../../../components/tables/tables';
import { useSelector } from 'react-redux';

const columns = [
    {
        header: 'Customer Name',
        accessor: 'customerName',
        render: (value) => (
            <span className='font-medimu text-gray-900'>
                {value}
            </span>
        ),
    },
    {
        header: 'Transaction ID',
        accessor: 'paymentReference',
    },
    {
        header: 'Date Added',
        accessor: 'date',
    },
    {
        header: 'Amount',
        accessor: 'amount',
    },
    {
        header: 'Payment Channel',
        accessor: 'paymentChannel',
    },
    {
        header: 'Status',
        accessor: 'transactionStatus',
        render: (value) => (
            <span className={`${value === 'Successful' ? 'text-green-600' : value === 'Failed' ? 'text-red-600' : 'text-orange-400'}`}>
                {value}
            </span>
        ),
    },
];

const DashboardTable = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const transactionData = useSelector((state) => state.transaction);

    const filteredData = transactionData.transactions.slice(0,3);

    // console.log(filteredData.transactions)

    

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="container mx-auto">
            <DataTable
                columns={columns}
                data={filteredData}
                rowsPerPageOptions={[5, 10, 20, 50]}
                drpp=''
            />
        </div>
    );
};

export default DashboardTable;