import React from 'react'
import MerchantList from '../../components/merchants/MerchantList'
import MerchantCards from './components/MerchantCards'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd, faCloudArrowUp } from '@fortawesome/free-solid-svg-icons'

function Merchants() {
  return (
    <div className="min-h-screen bg-white border border-[#E4E7EC] rounded-lg p-8 sm:p-4 md:p-8">
        <div className="flex justify-between items-center mb-8">
          <header className="">
              <h1 className="text-[22px] md:text-[28px] text-[#101928] font-semibold text-gray-800">Merchant</h1>
          </header>
          <button className='flex items-center justify-center gap-[10px] border border-[#DDD5DD] rounded-[8px] px-[12px] py-[8px] text-[12px] sm:text-sm font-600 text-[#344054]'>
            <FontAwesomeIcon icon={faCloudArrowUp}/>
            <span>Import</span>
          </button>
      </div>
          
          <MerchantList />
    </div>
  )
}

export default Merchants