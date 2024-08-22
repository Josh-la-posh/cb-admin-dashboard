import React from 'react';
import DataTable from '../../../components/tables/tables';

const columns = [
  {
    header: 'Account Name',
    accessor: 'accountName',
  },
  {
    header: 'Account Number',
    accessor: 'accountNumber',
  },
  {
    header: 'Batch Code',
    accessor: 'batchCode',
  },
  {
    header: 'Currency',
    accessor: 'currency',
  },
  {
    header: 'Reference',
    accessor: 'reference',
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
  { accountName: 'John Doe Store', accountNumber: '1232415267', batchCode: '249', currency: 'NGN', reference: '121212122', status: 'Completed' },
];

const AllSettlementTable = () => {
  return (
    <div className="container mx-auto p-4">
      <DataTable columns={columns} data={data} rowsPerPageOptions={[5, 10, 20]} display='true' placeholder='Search Merchant' />
    </div>
  );
};

export default AllSettlementTable;
