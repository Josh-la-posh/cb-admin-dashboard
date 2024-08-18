import React from 'react';
import DataTable from '../../../components/tables/tables';

const columns = [
  {
    header: 'First Name',
    accessor: 'firstName',
  },
  {
    header: 'Last Name',
    accessor: 'lastName',
  },
  {
    header: 'Email Address',
    accessor: 'email',
  },
  {
    header: 'Phone Number',
    accessor: 'phone',
  },
];

const data = [
  { firstName: 'Samuel', lastName: 'John ', email: 'johnsamuel1023@yopmail.com', phone: '+2348102553461'},
  { firstName: 'Mike', lastName: 'Jane', email: 'jane@yahoo.com', phone: '+2348102553461'},
  { firstName: 'Afolashade', lastName: 'Acme', email: 'acmeshadds@convention.com.', phone: '+2348102553461' },
  { firstName: 'Olatunji', lastName: 'XYZ', email: 'acmeshadds@convention.com', phone: '+2348102553461', },
  { firstName: 'Chinadu', lastName: 'ABC.', email: 'acmeshadds@convention.com', phone: '+2348102553461', },
  { firstName: 'Simon', lastName: 'Doe', email: 'acmeshadds@convention.com', phone: '+2348102553461'},
  { firstName: 'Miguel', lastName: 'Smith', email: 'acmeshadds@convention.com', phone: '+2348102553461'},
  { firstName: 'Peter', lastName: 'Linux', email: 'acmeshadds@convention.com', phone: '+2348102553461'},
  { firstName: 'Imaete', lastName: 'Victoria', email: 'acmeshadds@convention.com', phone: '+2348102553461'},
  { firstName: 'Atebata', lastName: 'Ogundipe.', email: 'acmeshadds@convention.com', phone: '+2348102553461'},
];

const CustomerTable = () => {
  return (
    <div className="container mx-auto">
      <DataTable columns={columns} data={data} rowsPerPageOptions={[5, 10, 20]} />
    </div>
  );
};

export default CustomerTable;
