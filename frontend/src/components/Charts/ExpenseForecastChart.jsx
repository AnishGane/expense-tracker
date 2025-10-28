import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  ReferenceDot,
  ReferenceLine,
  Area,
  AreaChart,
} from 'recharts';
import { prepareInsightsChartData } from '../../utils/helper';

const ExpenseForecastChart = ({ data, predictedExpense, regressionInfo }) => {
  const [displayData, setDisplayData] = useState([]);

  useEffect(() => {
    const formatted = prepareInsightsChartData(data, predictedExpense);
    setDisplayData(formatted);
  }, [data, predictedExpense]);

  if (!displayData.length) return <p>No data available.</p>;

  return (
    <>
      <div className="h-80 w-full rounded-2xl bg-white p-4 shadow">
        <h2 className="mb-4 text-lg">Expense Trend & Prediction</h2>

        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={displayData}>
            <defs>
              <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f87171" stopOpacity={0.5} />
                <stop offset="95%" stopColor="#f87171" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
            <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#555' }} stroke="none" />
            <YAxis tick={{ fontSize: 12, fill: '#555' }} stroke="none" />

            <Tooltip />
            <Area
              type="monotone"
              dataKey="amount"
              stroke="#f87171"
              fill="url(#incomeGradient)"
              strokeWidth={3}
              dot={{ r: 3, fill: '#ab8df8' }}
            />
            <Line
              type="monotone"
              dataKey="expense"
              stroke="#4f46e5"
              strokeWidth={2}
              dot={{ r: 4 }}
              name="Actual Expense"
            />
            {/* Predicted point */}
            {predictedExpense && (
              <>
                <ReferenceLine
                  x={displayData[displayData.length - 1].name}
                  stroke="#22c55e"
                  strokeDasharray="4 4"
                  label={{
                    value: 'Predicted',
                    position: 'top',
                    fill: '#22c55e',
                    fontSize: 12,
                  }}
                />
                <ReferenceDot
                  x={displayData[displayData.length - 1].name}
                  y={predictedExpense}
                  r={6}
                  fill="#22c55e"
                  stroke="none"
                  label={{
                    value: `${predictedExpense}`,
                    position: 'top',
                    fill: '#22c55e',
                    fontSize: 12,
                  }}
                />
              </>
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Regression info */}
      <div className="mt-14 w-full rounded-2xl border border-gray-200 bg-white px-10 py-5 shadow-md md:max-w-fit">
        {regressionInfo && (
          <div className="text-gray-500">
            <h4 className="mb-2 font-medium text-black">Regression Information</h4>
            <p className="mb-0.5 text-xs">
              <span className="text-gray-700">Trend:</span> {regressionInfo.trend}
            </p>
            <p className="text-xs">
              <span className="mb-1 text-gray-700">Slope:</span> {regressionInfo.slope} |{' '}
              <span className="text-gray-700">Intercept:</span> {regressionInfo.intercept}
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default ExpenseForecastChart;
