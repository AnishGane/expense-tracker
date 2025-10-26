import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const CustomBarChart = ({ data, type }) => {
  // Function to get alternate bar colors
  const getBarColor = (index) => {
    return index % 2 === 0
      ? type?.toLowerCase() === 'expense'
        ? '#ef4444'
        : '#22c55e'
      : type?.toLowerCase() === 'expense'
        ? '#fca5a5'
        : '#86efac';
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border border-gray-300 bg-white p-2 shadow-md">
          <p className="mb-1 text-xs font-semibold text-purple-800">
            {payload[0].payload.category}
          </p>
          <p className="text-sm text-gray-600">
            Amount:
            <span className="text-sm font-medium text-gray-900">${payload[0].payload.amount}</span>
          </p>
        </div>
      );
    }
    return null;
  };
  return (
    <div className="mt-6 bg-white">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid stroke="none" />

          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: '#555' }}
            stroke="none"
            tickFormatter={(value) => {
              // value is like "1st Oct (Salary)"
              // split by "(" and take the first part
              return value.split('(')[0].trim();
            }}
          />
          <YAxis tick={{ fontSize: 12, fill: '#555' }} stroke="none" />

          <Tooltip content={CustomTooltip} />

          <Bar dataKey="amount" fill="#FF8042" radius={[10, 10, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={entry.month || index} fill={getBarColor(index)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
