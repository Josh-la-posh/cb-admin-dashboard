import React, { useState } from 'react';

const allTransactions = [
  { id: 1, date: '2024-08-01', description: 'Payment from John Doe', amount: '₦12,345', status: 'Completed', merchant: 'John Doe Store', paymentChannel: 'Card' },
  { id: 2, date: '2024-08-02', description: 'Payment from Jane Smith', amount: '₦8,900', status: 'Pending', merchant: 'Jane Smith Boutique', paymentChannel: 'Virtual Account' },
  { id: 3, date: '2024-08-03', description: 'Payment from Acme Corp.', amount: '₦25,000', status: 'Failed', merchant: 'Acme Corporation', paymentChannel: 'USSD' },
  { id: 4, date: '2024-08-04', description: 'Payment from XYZ Ltd.', amount: '₦15,000', status: 'Completed', merchant: 'XYZ Limited', paymentChannel: 'Bank Account' },
  { id: 5, date: '2024-08-05', description: 'Payment from ABC Inc.', amount: '₦9,500', status: 'Pending', merchant: 'ABC Inc.', paymentChannel: 'Card' },
  { id: 6, date: '2024-08-06', description: 'Payment from DEF LLC', amount: '₦7,200', status: 'Failed', merchant: 'DEF LLC', paymentChannel: 'Virtual Account' },
  { id: 7, date: '2024-08-07', description: 'Payment from GHI Corp.', amount: '₦11,800', status: 'Completed', merchant: 'GHI Corporation', paymentChannel: 'USSD' },
  { id: 8, date: '2024-08-08', description: 'Payment from JKL Ltd.', amount: '₦14,400', status: 'Pending', merchant: 'JKL Limited', paymentChannel: 'Bank Account' },
  { id: 9, date: '2024-08-09', description: 'Payment from MNO Ltd.', amount: '₦13,200', status: 'Failed', merchant: 'MNO Limited', paymentChannel: 'Card' },
  { id: 10, date: '2024-08-10', description: 'Payment from PQR Inc.', amount: '₦17,600', status: 'Completed', merchant: 'PQR Inc.', paymentChannel: 'Virtual Account' },
  { id: 11, date: '2024-08-11', description: 'Payment from STU Ltd.', amount: '₦10,900', status: 'Pending', merchant: 'STU Limited', paymentChannel: 'USSD' },
  { id: 12, date: '2024-08-12', description: 'Payment from VWX Ltd.', amount: '₦6,800', status: 'Failed', merchant: 'VWX Limited', paymentChannel: 'Bank Account' },
];

const Transactions = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const indexOfLastTransaction = currentPage * pageSize;
  const indexOfFirstTransaction = indexOfLastTransaction - pageSize;
  const currentTransactions = allTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction);
  const totalPages = Math.ceil(allTransactions.length / pageSize);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(Number(event.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Transactions</h1>

      <div className="mb-4 flex justify-between items-center">
        <div className="text-sm text-gray-500">
          <label htmlFor="pageSize" className="mr-2">Items per page:</label>
          <select
            id="pageSize"
            value={pageSize}
            onChange={handlePageSizeChange}
            className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-700"
          >
            {[5, 10, 15, 20].map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Merchant</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Channel</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentTransactions.map((transaction) => (
              <tr key={transaction.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{transaction.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.merchant}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.description}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.amount}</td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-500 ${transaction.paymentChannel === 'Card' ? 'text-green-600' : transaction.paymentChannel === 'Virtual Account' ? 'text-blue-600' : transaction.paymentChannel === 'USSD' ? 'text-yellow-600' : 'text-gray-600'}`}>
                  {transaction.paymentChannel}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${transaction.status === 'Completed' ? 'text-green-600' : transaction.status === 'Pending' ? 'text-yellow-600' : 'text-red-600'}`}>
                  {transaction.status}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900">
                    <svg className="w-5 h-5 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8.5c1.933 0 3.5 1.567 3.5 3.5S13.933 15.5 12 15.5 8.5 13.933 8.5 12 10.067 8.5 12 8.5zM12 4a8 8 0 00-8 8 8 8 0 0015.536 4.465A8 8 0 0012 4z" />
                    </svg>
                  </button>
                  <button className="text-red-600 hover:text-red-900 ml-4">
                    <svg className="w-5 h-5 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex flex-col items-center md:flex-row md:justify-between">
        <div className="text-sm text-gray-500 mb-4 md:mb-0">
          Showing {indexOfFirstTransaction + 1} to {Math.min(indexOfLastTransaction, allTransactions.length)} of {allTransactions.length} entries
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 disabled:opacity-50"
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 rounded-lg ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-white text-gray-600'} hover:bg-blue-700 hover:text-white`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
