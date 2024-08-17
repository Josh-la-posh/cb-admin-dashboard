import React from 'react';

const Card = ({ title, value, interest, rate }) => {
    return (
        <div className='p-[16px] rounded-[8px] border border-[#E4E7EC] text-white bg-white'>
            <div className='h-[58px] w-[58px] rounded-full bg-[#E3EFFC] flex justify-center items-center mb-[5px]'>
                <div className="h-[26px] w-[14px] text-[#1761D9] text-2xl">4</div>
            </div>
            <h2 className="text-[#1D2739] text-[36px] font-semibold">{value}</h2>
            <div className="flex">
                <p className="text-[14px] font-[500] text-[#667185] flex-1">{title}</p>
                <p className={`text-[14px] font-[500] ${interest === 'positive' ? 'text-[#036B26]' : 'text-[#9E0A05]'} flex-1 text-center`}>{rate}%</p>

            </div>
        </div>
    );
};

export default Card;
