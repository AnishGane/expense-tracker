import React from 'react';

const InsightsInfoCard = ({ label, value, desc }) => {
  return (
    <div className="rounded-2xl border border-gray-200/50 bg-white p-6 shadow-md shadow-gray-100">
      <h6 className="mb-1 text-sm text-gray-500">{label}</h6>
      <div className='flex flex-col'>
        <span className="text-[22px] font-medium">{value}</span>
        <span className="text-[13px] font-medium">{desc}</span>
      </div>
    </div>
  );
};

export default InsightsInfoCard;
