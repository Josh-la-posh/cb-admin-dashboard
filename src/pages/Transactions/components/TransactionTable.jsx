import React from 'react';
import DataTable from '../../../components/tables/tables';

// const columns = [
//     {
//         header: 'Date',
//         accessor: 'date',
//         render: (value) => (
//             <span className='font-medimu text-gray-900'>
//                 {value}
//             </span>
//         ),
//     },
//     {
//         header: 'Merchant',
//         accessor: 'merchant',
//     },
//     {
//         header: 'Description',
//         accessor: 'description',
//     },
//     {
//         header: 'Amount',
//         accessor: 'amount',
//     },
//     {
//         header: 'Payment Channel',
//         accessor: 'paymentChannel',
//         render: (value) => (
//             <span className={`text-${value === 'USSD' ? 'orange' : value === 'Card' ? 'green' : 'blue'}-600`}>
//                 {value}
//             </span>
//         ),
//     },
//     {
//         header: 'Status',
//         accessor: 'status',
//         render: (value) => (
//             <span className={`text-${value === 'Completed' ? 'green' : value === 'Pending' ? 'orange' : 'red'}-600`}>
//                 {value}
//             </span>
//         ),
//     },
// ];

const columns = [
    {
        header: 'Date',
        accessor: 'paymentDate',
        render: (value) => (
            <span className='font-medimu text-gray-900'>
                {value}
            </span>
        ),
    },
    {
        header: 'Merchant',
        accessor: 'merchantCode',
    },
    {
        header: 'Description',
        accessor: 'narration',
    },
    {
        header: 'Amount',
        accessor: 'amount',
    },
    {
        header: 'Payment Channel',
        accessor: 'paymentChannel',
        render: (value) => (
            <span className={`text-${value === 'USSD' ? 'orange' : value === 'Card' ? 'green' : 'blue'}-600`}>
                {value}
            </span>
        ),
    },
    {
        header: 'Status',
        accessor: 'transactionStatus',
        render: (value) => (
            <span className={`text-${value === 'Successful' ? 'green' : value === 'Failed' ? 'red' : 'orange'}-600`}>
                {value}
            </span>
        ),
    },
];

const data = [
    { date: '2024-08-01', merchant: 'John Doe Store', description: 'Payment from John Doe', amount: '₦12,345', paymentChannel: 'Card', status: 'Completed' },
    { date: '2024-08-02', merchant: 'Jane Smith Boutique', description: 'Payment from Jane Smith', amount: '₦8,900', paymentChannel: 'Virtual Account', status: 'Pending' },
    { date: '2024-08-03', merchant: 'Acme Corporation', description: 'Payment from Acme Corp.', amount: '₦25,000', paymentChannel: 'USSD', status: 'Failed' },
    { date: '2024-08-04', merchant: 'XYZ Limited', description: 'Payment from XYZ Ltd.', amount: '₦15,000', paymentChannel: 'Bank Account', status: 'Completed' },
    { date: '2024-08-05', merchant: 'ABC Inc.', description: 'Payment from ABC Inc.', amount: '₦9,500', paymentChannel: 'Card', status: 'Pending' },
    { date: '2024-08-01', merchant: 'John Doe Store', description: 'Payment from John Doe', amount: '₦12,345', paymentChannel: 'Card', status: 'Completed' },
    { date: '2024-08-02', merchant: 'Jane Smith Boutique', description: 'Payment from Jane Smith', amount: '₦8,900', paymentChannel: 'Virtual Account', status: 'Pending' },
    { date: '2024-08-03', merchant: 'Acme Corporation', description: 'Payment from Acme Corp.', amount: '₦25,000', paymentChannel: 'USSD', status: 'Failed' },
    { date: '2024-08-04', merchant: 'XYZ Limited', description: 'Payment from XYZ Ltd.', amount: '₦15,000', paymentChannel: 'Bank Account', status: 'Completed' },
    { date: '2024-08-05', merchant: 'ABC Inc.', description: 'Payment from ABC Inc.', amount: '₦9,500', paymentChannel: 'Card', status: 'Pending' },
];

const TransactionTable = ({ transactions }) => {
    return (
        <div className="container mx-auto p-4">
            <DataTable columns={columns} data={transactions} rowsPerPageOptions={[5, 10, 20]} display='true' />
        </div>
    );
};

export default TransactionTable;