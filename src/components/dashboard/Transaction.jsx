import React from 'react';

const TransactionTable = () => {
    const transactions = [
        { id: 1, date: '2024-08-09', amount: '₦120.00', status: 'Success' },
        { id: 2, date: '2024-08-08', amount: '₦45.50', status: 'Failed' },
        { id: 3, date: '2024-08-09', amount: '₦120.00', status: 'Success' },
        { id: 4, date: '2024-08-08', amount: '₦45.50', status: 'Failed' },
        { id: 5, date: '2024-08-09', amount: '₦120.00', status: 'Success' },
    ];

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 uppercase tracking-wider">Status</th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {transactions.map((transaction) => (
                        <tr key={transaction.id}>
                            <td className="px-6 py-4 border-b border-gray-300">{transaction.date}</td>
                            <td className="px-6 py-4 border-b border-gray-300">{transaction.amount}</td>
                            <td className={`px-6 py-4 border-b border-gray-300 ${transaction.status === 'Success' ? 'text-green-600' : 'text-red-600'}`}>
                                {transaction.status}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionTable;