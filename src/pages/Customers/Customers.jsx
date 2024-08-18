import React from 'react'
import Card from '../../components/dashboard/Card'
import CustomerCards from './components/CustomerCards'
import CustomerTable from './components/CustomerTable'

function Customers() {
  return (
    <div className='min-h-screen bg-white border border-[#E4E7EC] rounded-lg p-8'>
        <header className="mb-8">
            <h1 className="text-[20px] text-[#101928] font-semibold text-gray-800">Customer</h1>
        </header>

        <CustomerCards />

      <div className="mt-12">
        <h3 className="text-[20px] font-[600] text-[#101928]">Add Customers</h3>
        <p className="text-[14px] font-[400] text-[#475367]">Add Customers to your database</p>
      </div>

      <CustomerTable />


    </div>
  )
}

export default Customers