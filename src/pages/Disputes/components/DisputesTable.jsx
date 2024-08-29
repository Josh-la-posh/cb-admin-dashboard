import React, { useEffect, useState } from 'react';
import DataTable from '../../../components/tables/tables';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import ExportPopup from '../../../components/HelperFunctions/exportPopup';
import { useSelector } from 'react-redux';
import { dateFormatter } from '../../../components/HelperFunctions/dateFormatter';

const columns = [
    {
        header: 'Customer Name',
        accessor: 'customerName',
        render: (customerName, row) => (
            <span>
                {row.transaction.customerName}
            </span>
        ),
    },
    {
        header: 'Transaction ID',
        accessor: 'paymentReference',
        render: (paymentReference, row) => (
            <span>
                {row.transaction.paymentReference.slice(0,17)}
            </span>
        ),
    },
    {
        header: 'Dispute ID',
        accessor: 'disputeId',
    },
    {
        header: 'Dispute Amount',
        accessor: 'amountCollected',
        render: (amountCollected, row) => (
            <span>
                {row.transaction.amountCollected}
            </span>
        ),
    },
    {
        header: 'Date',
        accessor: 'paymentDate',
        render: (paymentDate, row) => (
            <span>
                {dateFormatter(row.transaction.paymentDate)}
            </span>
        ),
    },
    {
        header: 'Payment Channel',
        accessor: 'paymentChannel',
        render: (paymentChannel, row) => (
            <span>
                {row.transaction.paymentChannel}
            </span>
        ),
    },
    {
        header: 'Status',
        accessor: 'status',
        render: (value) => (
            <span className={`${value === 'OPEN' ? 'text-green-600' : value === 'CLOSED' ? 'text-red-600' : 'text-orange-400'}`}>
                {value}
            </span>
        ),
    }
];


const DisputeTable = ({disputes, handleOpenModal,  isExportPopupOpen, setIsExportPopupOpen}) => {
    const [search, setSearch] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    // const disputes = useSelector((state) => state.dispute.disputes);
    const [selectedIndex, setSelectedIndex] = useState(null);

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const handleFilterChange = (e) => {
        setFilterStatus(e.target.value);
    };
    

    const handleSelectedRow = (index) => {
        setSelectedIndex(selectedIndex === index ? null : index);
    };

    const getDataToParent = (id) => {
        handleOpenModal(filteredData[id])
    }

    const disputeData = disputes.filter((data) => data.transaction.transactionStatus !== 'Successful');

    const filteredData = disputeData.filter((row) => {
        
        // Convert all relevant values to strings and apply the filter
        const rowValues = Object.values(row).map(val => (val || '').toString().toLowerCase());
    
        const matchesSearch = search
            ? rowValues.some(val => val.includes(search.toLowerCase()))
            : true;
    
        const matchesStatus = filterStatus
            ? row.status === filterStatus
            : true;
    
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="container mx-auto">
            <div className="my-3 py-3 flex items-center justify-between border-y border-[#F0F2F5] text-xs lg:text-sm">
                <select
                    value={filterStatus}
                    onChange={handleFilterChange}
                    className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-priColor text-xs lg:text-[13px]"
                    >
                    <option value="">All</option>
                    <option value="pending">Pending</option>
                    <option value="failed">Failed</option>
                </select>
                <div className="relative">
                    <input
                        type="text"
                        value={search}
                        onChange={handleSearch}
                        className="w-full p-2 pl-8 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-priColor"
                        placeholder="Search ..."
                    />
                    <FontAwesomeIcon
                        icon={faMagnifyingGlass}
                        className="absolute left-2 top-2/4 transform -translate-y-2/4 text-gray-400"
                    />
                </div>
            </div>

            <DataTable
                columns={columns}
                data={filteredData}
                rowsPerPageOptions={[5, 10, 20, 50]}
                onIndexChange={handleSelectedRow}
                selectedIndex={selectedIndex}
                displayActionButton={true}
                elementId='DisputeTable'
                actionButton={
                    <>
                    {
                        <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 shadow-lg z-10 rounded-[8px] text-xs">
                            <button onClick={() => getDataToParent(selectedIndex)} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                                View Details
                            </button>
                            {/* <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                                Edit
                            </button>
                            <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                                Change Status
                            </button>
                            <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                                Delete
                            </button> */}
                        </div>
                    }
                    </>
                }
            />
            <ExportPopup
                isOpen={isExportPopupOpen}
                onClose={() => setIsExportPopupOpen(false)}
                data={filteredData}
                elementId='DisputeTable'
            />
        </div>
    );
};

export default DisputeTable;
