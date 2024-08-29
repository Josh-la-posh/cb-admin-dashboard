import React from 'react';
import DataTable from '../../../components/tables/tables';
import ExportPopup from '../../../components/HelperFunctions/exportPopup';

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

const BankAccountTable = ({isExportPopupOpen, setIsExportPopupOpen}) => {
    return (
        <div className="container mx-auto">
            <DataTable 
                columns={columns}
                data={data}
                rowsPerPageOptions={[5, 10, 20]}
                display='true'
                placeholder='Search...'
                elementId='bankSettlementTable'
            />
            <ExportPopup
                isOpen={isExportPopupOpen}
                onClose={() => setIsExportPopupOpen(false)}
                data={data}
                elementId='bankSettlementTable'
            />
        </div>
    );
};

export default BankAccountTable;