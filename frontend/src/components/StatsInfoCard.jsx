import React from 'react';

const StatsInfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="z-10 flex gap-6 rounded-xl border border-gray-200/50 bg-white p-4 shadow-md shadow-purple-400/10">
      <div
        className={`flex size-12 items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl`}
      >
        {icon}
      </div>
      <div>
        <h6 className="mb-1 text-xs text-gray-500">{label}</h6>
        <span className="text-[20px]">${value}</span>
      </div>
    </div>
  );
};

export default StatsInfoCard;
