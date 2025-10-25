import React from 'react';

const InsightsInfoCard = ({ label, value }) => {
  return (
    <div className="rounded-2xl border border-gray-200/50 bg-white p-6 shadow-md shadow-gray-100">
      <h6 className="mb-1 text-sm text-gray-500">{label}</h6>
      <span className="text-[22px] font-medium">{value}</span>
    </div>
  );
};

export default InsightsInfoCard;
