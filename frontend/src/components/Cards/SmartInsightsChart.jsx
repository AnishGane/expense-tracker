import React, { useEffect, useState, useContext } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';
import { prepareSmartInsightsChartData } from '../../utils/helper';
import { UserContext } from '../../context/UserContext';

const SmartInsightsChart = () => {
  const { insightData, fetchInsightData } = useContext(UserContext);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (insightData) {
      const repsonse = prepareSmartInsightsChartData(insightData);
      setChartData(repsonse);
    } else {
      fetchInsightData();
    }
  }, [insightData]);

  if (!chartData.length) {
    return <div className="mt-4 text-center text-gray-500">Loading Smart Insights Chart...</div>;
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData} barGap={15}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip formatter={(v) => `$ ${v.toLocaleString()}`} />
        <Legend />
        <Bar dataKey="expense" fill="#8b5cf6" radius={[8, 8, 0, 0]} name="Expense ($)" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SmartInsightsChart;
