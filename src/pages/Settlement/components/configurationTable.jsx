import React from 'react';
import DataTable from '../../../components/tables/tables';

const columns = [
  {
    header: 'Name',
    accessor: 'name',
  },
  {
    header: 'Configuration Code',
    accessor: 'configurationCode',
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
  { name: 'Samuel Mbah', configurationCode: '28894', status: 'Completed' },
];

const ConfigurationTable = () => {
  return (
    <div className="container mx-auto p-4">
      <DataTable columns={columns} data={data} rowsPerPageOptions={[5, 10, 20]} display='true' placeholder='Search...' />
    </div>
  );
};

export default ConfigurationTable;
