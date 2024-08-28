import React from 'react';
import CustomModal from '../../components/Modal';
import { dateFormatter } from '../../components/HelperFunctions/dateFormatter';


const TRANSACTION_URL = '/api/transactions';

function TransactionForm({ handleCloseModal, data }) {
  return (
    <CustomModal handleOpenModal={handleCloseModal}>
      <div className="mb-8">
        <div className='text-[20px] font-[500]'>Transaction Details</div>
      </div>
      <form>
        <div className="flex flex-col md:flex-row mb-4 gap-4">
            <div className="">
            <label className="block text-black text-[11px] lg:text-[13px] mb-1 lg:mb-2 flex items-center" htmlFor="firstName">
                Name
            </label>
            <input
                type="text"
                value={data.customerName}
                className="w-full px-3 py-2 text-xs md:text-sm border border-gray rounded-lg focus:outline-none"
                disabled
            />
            </div>
            <div className="">
            <label className="block text-black text-[11px] lg:text-[13px] mb-1 lg:mb-2 flex items-center" htmlFor="lastName">
                Account Number
            </label>
            <input
                type="text"
                value={data.accountNumberMasked}
                className="w-full px-3 py-2 text-xs md:text-sm border border-gray rounded-lg focus:outline-none"
                disabled
            />
            </div>
        </div>
        <div className="flex flex-col md:flex-row mb-4 gap-4">
            <div className="">
            <label className="block text-black text-[11px] lg:text-[13px] mb-1 lg:mb-2 flex items-center" htmlFor="email">
                Amount
            </label>
            <input
                type="email"
                id="email"
                name="email"
                value={`${data.currencyCode}${data.amount}`}
                className="w-full px-3 py-2 text-xs md:text-sm border border-gray rounded-lg focus:outline-none"
                disabled
            />
            </div>
            <div className="">
                <label className="block text-black text-[11px] lg:text-[13px] mb-1 lg:mb-2 flex items-center" htmlFor="country">
                Payment Channel
                </label>
                <input
                type="text"
                value={data.paymentChannel}
                className="w-full px-3 py-2 text-xs md:text-sm border border-gray rounded-lg focus:outline-none"
                disabled
                />
            </div>
        </div>
        <div className="flex flex-col md:flex-row mb-4 gap-4">
            <div className="">
                <label className="block text-black text-[11px] lg:text-[13px] mb-1 lg:mb-2 flex items-center" htmlFor="phone">
                    Amount Collected
                </label>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={`${data.currencyCode}${data.amountCollected}`}
                    className="w-full px-3 py-2 text-xs md:text-sm border border-gray rounded-lg focus:outline-none"
                    disabled
                />
            </div>
            <div className="">
            <label className="block text-black text-[11px] lg:text-[13px] mb-1 lg:mb-2 flex items-center" htmlFor="city">
                Narration
            </label>
            <input
                type="text"
                value={data.narration}
                className="w-full px-3 py-2 text-xs md:text-sm border border-gray rounded-lg focus:outline-none"
            disabled
            />
            </div>
        </div>
        <div className="flex flex-col md:flex-row mb-4 gap-4">
          <div className="">
            <label className="block text-black text-[11px] lg:text-[13px] mb-1 lg:mb-2 flex items-center" htmlFor="code">
              Transaction Reference
            </label>
            <input
              type='text'
              id="code"
              name="code"
              value={data.paymentReference}
              className="w-full px-3 py-2 text-xs md:text-sm border border-gray rounded-lg focus:outline-none"
              disabled
            />
          </div>
          <div className="">
            <label className="block text-black text-[11px] lg:text-[13px] mb-1 lg:mb-2 flex items-center" htmlFor="code">
              Payment Date
            </label>
            <input
              type='text'
              id="code"
              name="code"
              value={dateFormatter(data.paymentDate)}
              className="w-full px-3 py-2 text-xs md:text-sm border border-gray rounded-lg focus:outline-none"
              disabled
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row mb-4 gap-4">
          <div className="">
            <label className="block text-black text-[11px] lg:text-[13px] mb-1 lg:mb-2 flex items-center" htmlFor="code">
              Status
            </label>
            <input
              type='text'
              id="code"
              name="code"
              value={data.transactionStatus}
              className="w-full px-3 py-2 text-xs md:text-sm border border-gray rounded-lg focus:outline-none"
              disabled
            />
          </div>
            <div className="">
            <label className="block text-black text-[11px] lg:text-[13px] mb-1 lg:mb-2 flex items-center" htmlFor="address">
                Message
            </label>
            <input
                type="text"
                value={data.message}
                className="w-full px-3 py-2 text-xs md:text-sm border border-gray rounded-lg focus:outline-none"
                disabled
            />
            </div>
        </div>
      </form>
    </CustomModal>
  );
}

export default TransactionForm;
