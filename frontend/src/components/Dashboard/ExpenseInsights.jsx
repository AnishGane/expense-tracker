import React from 'react';
import { LuArrowRight } from 'react-icons/lu';
import ExpenseInsightCard from '../Cards/ExpenseInsightCard';

const ExpenseInsights = ({ data, onSeeMore }) => {
  return (
    <div className="card col-span-2">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Expense Insights</h5>

        <button className="card-btn" onClick={onSeeMore}>
          See All <LuArrowRight className="text-base" />
        </button>
      </div>

      {data && (
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <ExpenseInsightCard data={data} />
        </div>
      )}
    </div>
  );
};

export default ExpenseInsights;
