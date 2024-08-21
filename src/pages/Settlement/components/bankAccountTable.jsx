import React from 'react';
import DataTable from '../../../components/tables/tables';

const columns = [
    {
        header: 'Bank Name',
        accessor: 'bankName',
    },
    {
        header: 'Account Name',
        accessor: 'accountName',
    },
    {
        header: 'Account Number',
        accessor: 'accountNumber',
    },
    {
        header: 'Status',
        accessor: 'status',
        render: (value) => (
            <span className={`text-${value === 'Completed' ? 'green' : value === 'Pending' ? 'orange' : 'red'}-600`}>
                {value}
            </span>
        ),
    },
];

const data = [
    { bankName: 'GTB', accountNumber: '12357654333', accountName: 'Payment from John Doe', status: 'Completed' },
];

const BankAccountTable = () => {
    return (
        <div className="container mx-auto p-4">
            <DataTable columns={columns} data={data} rowsPerPageOptions={[5, 10, 20]} display='true' placeholder='Search...' />
        </div>
    );
};

export default BankAccountTable;