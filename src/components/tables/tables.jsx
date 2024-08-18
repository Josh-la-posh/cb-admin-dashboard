import React, { useState } from 'react';

const DataTable = ({ columns, data, rowsPerPageOptions, display }) => {
    const [selectedRow, setSelectedRow] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

    const handleActionClick = (index) => {
        setSelectedRow(selectedRow === index ? null : index);
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    const handleFilterChange = (e) => {
        setFilterStatus(e.target.value);
        setCurrentPage(1);
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleRowsPerPageChange = (e) => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setCurrentPage(1);
    };

    console.log("Transaction-Data", data)
    const filteredData = data
        .filter((row) => {
            // const matchesSearch = Object.values(row).some((value) =>
            //     value.toLowerCase().includes(searchQuery.toLowerCase())
            // );
            const matchesSearch = Object.values(row).some((value) => {
                if (typeof value === 'string') {
                    return value.toLowerCase().includes(searchQuery.toLowerCase());
                }
                return false; // Or handle other types as needed
            });

            const matchesStatus = filterStatus
                ? row.status === filterStatus
                : true;
            return matchesSearch && matchesStatus;
        });

    const paginatedData = filteredData.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    const totalPages = Math.ceil(filteredData.length / rowsPerPage);

    return (
        <div className="">
            <div className="my-8 py-8 flex items-center gap-[30px] border-y border-[#F0F2F5]">
                <input
                    type="text"
                    placeholder="Search..."
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-0 "
                    value={searchQuery}
                    onChange={handleSearch}
                />
                {display == 'true' &&
                    <select
                        value={filterStatus}
                        onChange={handleFilterChange}
                        className="px-4 py-2 border border-gray-300 bg-white rounded"
                    >
                        <option value="">All</option>
                        <option value="Completed">Completed</option>
                        <option value="Pending">Pending</option>
                        <option value="Failed">Failed</option>
                    </select>}
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg border border-gray-200">
                    <thead className='bg-[#F0F2F5]'>
                        <tr>
                            {columns.map((column, colIndex) => (
                                <th
                                    key={colIndex}
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    {column.header}
                                </th>
                            ))}
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">

                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {paginatedData.map((row, rowIndex) => (
                            <tr key={rowIndex} className="hover:bg-gray-50">
                                {columns.map((column, colIndex) => (
                                    <td key={colIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {column.render
                                            ? column.render(row[column.accessor], row)
                                            : row[column.accessor]}
                                    </td>
                                ))}
                                <td className="relative px-6 py-4 whitespace-nowrap">
                                    <button onClick={() => handleActionClick(rowIndex)}>
                                        <span className="text-gray-500 hover:text-gray-700">⋮</span>
                                    </button>
                                    {selectedRow === rowIndex && (
                                        <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 shadow-lg z-10">
                                            <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                Edit
                                            </button>
                                            <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                Delete
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex flex-col md:flex-row md:justify-between md:items-center mt-4 gap-4">
                <div className='text-sm text-gray-500'>
                    <span className='mr-2'>Items per page:</span>
                    <select
                        value={rowsPerPage}
                        onChange={handleRowsPerPageChange}
                        className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-700"
                    >
                        {rowsPerPageOptions.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-2 py-1 py-1 lg:px-4 lg:py-2 border border-gray-300 text-gray-500 rounded-lg ${currentPage == 1 ? 'text-gray-300' : 'hover:border-blue-700 hover:text-black'}`}
                    >
                        &lt;
                    </button>



                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageChange(index + 1)}
                            className={`text-xs md:text-sm px-2 py-1 lg:px-4 lg:py-2 ml-4 rounded-lg ${currentPage === index + 1 ? 'border border-blue-600 text-black' : 'bg-white text-gray-600'} hover:bg-blue-700 hover:text-white`}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`px-2 py-1 py-1 lg:px-4 lg:py-2 ml-4 border border-gray-300 text-gray-500 rounded-lg ${currentPage == totalPages ? 'text-gray-300' : 'hover:border-blue-700 hover:text-black'}`}
                    >
                        &gt;
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DataTable;