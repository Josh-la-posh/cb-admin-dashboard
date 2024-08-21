import React from 'react';

const Card = ({ title, value, icon, color }) => {
    return (
        <div className='p-[16px] rounded-[8px] border border-[#E4E7EC] text-white bg-white'>
            <div className={`h-[58px] w-[58px] rounded-full ${color || 'bg-priColor'} flex justify-center items-center mb-[12px]`}>
                <div className="text-[#1761D9] text-xl flex justify-center items-center">{icon}</div>
            </div>
            <h2 className="text-[#1D2739] text-[28px] lg:text-[24px] font-semibold">{value}</h2>
            <div className="flex">
                <p className="text-[14px] font-[500] text-[#667185] flex-1">{title}</p>
                {/* <p className={`text-[14px] font-[500] ${interest === 'positive' ? 'text-[#036B26]' : 'text-[#9E0A05]'} flex-1 text-center`}>{rate}%</p> */}

            </div>
        </div>
    );
};

export default Card;
