import React from 'react'
import Card from '../../../components/dashboard/Card'

function CustomerCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card title="Total Revenue" value="₦12,345" rate='5' interest='negative' />
      <Card title="Total Transactions" value="1,234" rate='8' interest='positive'/>
      <Card title="Successful Payments" value="1,200"  rate='40' interest='positive'/>
      <Card title="Failed Payments" value="34"  rate='2' interest='negative' />
    </div>
  )
}

export default CustomerCards