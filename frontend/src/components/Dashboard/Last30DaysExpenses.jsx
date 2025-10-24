import React, { useEffect, useState } from 'react';
import CustomBarChart from '../Charts/CustomBarChart';
import { prepareExpenseBarChartData } from '../../utils/helper';

const Last30DaysExpenses = ({ data, type }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareExpenseBarChartData(data);
    // console.log(result);
    setChartData(result);
    return () => {};
  }, [data]);

  return (
    <div className="card col-span-1">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Last 30 Days Expenses</h5>
      </div>

      <CustomBarChart type={type} data={chartData} />
    </div>
  );
};

export default Last30DaysExpenses;
