import React, { useEffect, useState } from 'react';
import CustomBarChart from '../Charts/CustomBarChart';
import { prepareExpenseChartData } from '../../utils/helper';

const Last30DaysExpenses = ({ data, type }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareExpenseChartData(data);
    // console.log(result);
    setChartData(result);
    return () => {};
  }, [data]);

  return (
    <div className="card col-span-1">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Last 30 Days Expenses</h5>
      </div>
      <div className="mt-6">
        {data?.length === 0 && <p className="text-sm text-gray-500">No records of last 30 days expenses</p>}
        <CustomBarChart type={type} data={chartData} />
      </div>
    </div>
  );
};

export default Last30DaysExpenses;
