import React, { useEffect, useState } from 'react';
import DataTable from '../../../components/tables/tables';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const columns = [
    {
        header: 'Full Name',
        accessor: 'fullName',
    },
    {
        header: 'Email Address',
        accessor: 'customerEmail',
    },
    {
        header: 'Phone Number',
        accessor: 'customerPhoneNumber',
    }
];

const CustomerTable = ({customerData, handleOpenModal}) => {
    const [search, setSearch] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(null);

    const processedData = customerData.map(row => ({
        ...row,
        fullName: `${row.customerFirstName} ${row.customerLastName}`, // Combine first and last name
    }));

    const getVal = (id, name) => {
        // console.log(filteredData[id]);
        handleOpenModal(filteredData[id], name);
    }
    

    const handleSelectedRow = (index) => {
        setSelectedIndex(selectedIndex === index ? null : index);
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const handleFilterChange = (e) => {
        setFilterStatus(e.target.value);
    };

    const filteredData = processedData.filter((row) => {
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
            <div className="my-3 py-3 flex flex-row-reverse items-center justify-between border-y border-[#F0F2F5] text-xs lg:text-sm">
                <div className="relative">
                    <input
                        type="text"
                        value={search}
                        onChange={handleSearch}
                        className="p-2 pl-8 border border-gray-300 rounded-lg focus:outline-none"
                        placeholder="Search customers..."
                    />
                    <FontAwesomeIcon
                        icon={faMagnifyingGlass}
                        className="absolute left-2 top-2/4 transform -translate-y-2/4 text-gray-400"
                    />
                </div>

                <div className="">
                    <select
                        value={filterStatus}
                        onChange={handleFilterChange}
                        className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-priColor"
                    >
                        <option value="">All</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Suspended">Suspended</option>
                    </select>
                </div>
            </div>

            <DataTable
                columns={columns}
                data={filteredData}
                rowsPerPageOptions={[5, 10, 20, 50]}
                onIndexChange={handleSelectedRow}
                selectedIndex={selectedIndex}
                displayActionButton={true}
                actionButton={
                    <>
                        {
                            <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 shadow-lg z-10 rounded-[8px] text-xs">
                                <button onClick={()=>getVal(selectedIndex, 'view')} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                                    View Details
                                </button>
                                <button onClick={()=>getVal(selectedIndex, 'edit')} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                                    Edit
                                </button>
                            </div>
                        }
                    </>
                }
            />
        </div>
    );
};

export default CustomerTable;

