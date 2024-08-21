import React from 'react'
import MerchantList from '../../components/merchants/MerchantList'
import MerchantCards from './components/MerchantCards'

function Merchants() {
  return (
    <div className="">
      {/* <MerchantCards /> */}
      <div className="bg-white">
        <MerchantList />
      </div>
    </div>
  )
}

export default Merchants