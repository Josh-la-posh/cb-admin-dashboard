import React, { useEffect } from 'react'
import Card from '../../../components/dashboard/Card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan, faCartShopping, faCheck, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import Spinner from '../../../components/Spinner';

function DashboardCards({ isLumpsum, totalRevenue, transactionLumpsum, }) {

  if (isLumpsum) {
    return <div className="h-[120px] w-[300px]">Loading ...</div>
  }
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card title="Total Revenue" value={`₦${totalRevenue}`} color="bg-[#EEE8FA]" icon={<FontAwesomeIcon icon={faDollarSign} style={{ color: '#7447C6' }} />} />
      <Card title="Total Transactions" value={transactionLumpsum.reduce((total, current) => total + current.TransactionCount, 0)} color="bg-[#FFF8E1]" icon={<FontAwesomeIcon icon={faCartShopping} style={{ color: '#FFC107' }} />} />
      <Card title="Successful Payments" value={transactionLumpsum.find(item => item.TransactionStatus === "Successful").TransactionCount} color="bg-[#E7F6EC]" icon={<FontAwesomeIcon icon={faCheck} style={{ color: '#40B869' }} />} />
      <Card title="Failed Payments" value={transactionLumpsum.find(item => item.TransactionStatus === "Failed").TransactionCount} color="bg-red-300" icon={<FontAwesomeIcon icon={faBan} style={{ color: 'red' }} />} />
    </div>
  )
}

export default DashboardCards