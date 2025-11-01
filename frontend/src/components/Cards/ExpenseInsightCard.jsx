import React, { use } from 'react';
import { useLocation } from 'react-router-dom';

const ExpenseInsightCard = ({ data }) => {
  const pathname = useLocation().pathname;
  return (
    <>
      <div className="rounded-2xl border border-gray-300 bg-white p-6 shadow-xs">
        <p className="text-sm text-gray-600">Spending Change</p>
        <div>
          <h2
            className={`my-0.5 text-2xl font-bold ${data.changePercent >= 0 ? 'text-red-500' : 'text-green-500'}`}
          >
            {data.changePercent}%
          </h2>
          <p className="text-xs text-gray-600">
            Compared to last month (${data.prevTotal?.toLocaleString()})
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-300 bg-white p-6 shadow-xs">
        <p className="text-sm text-gray-600">Top Category</p>
        <h2 className="my-0.5 text-2xl font-medium tracking-wide">
          {data.topCategory || (
            <p className="mt-0.5 text-base">No Top Category for current month</p>
          )}
        </h2>
        {data.topCategory ? (
          <p className="text-sm font-semibold tracking-wide text-gray-500">
            ${data.topCategoryAmount?.toLocaleString() || 0}
          </p>
        ) : (
          ''
        )}
      </div>

      <div className="rounded-2xl border border-gray-300 bg-white p-6 shadow-xs">
        <p className="my-0.5 text-sm text-gray-600">Average Expense (3 month)</p>
        <h2 className="text-2xl font-medium">${data.avgExpense.toFixed(0)}</h2>
      </div>

      {pathname === '/insights' && (
        <div className="rounded-2xl border border-gray-300 bg-white p-6 shadow-xs">
          <p className="my-0.5 text-sm text-gray-600"> Max Expense of Current Month</p>
          {data?.maxExpense && data?.maxExpense?.amount ? (
            <h2 className="text-2xl font-medium"> ${data?.maxExpense?.amount.toLocaleString()}</h2>
          ) : (
            <p className="mt-0.5 text-base">No Max Expense for current month</p>
          )}
        </div>
      )}
    </>
  );
};

export default ExpenseInsightCard;
