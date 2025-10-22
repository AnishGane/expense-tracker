import React from 'react';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-gray-300 bg-white p-2 shadow-md">
        <p className="mb-1 text-xs font-semibold text-purple-800">{payload[0].name}</p>
        <p className="text-sm text-gray-600">
          Amount: <span className="text-sm font-medium text-gray-900">${payload[0].value}</span>
        </p>
      </div>
    );
  }
};

export default CustomTooltip;
