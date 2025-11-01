import React from 'react';
import ExpenseInsightCard from '../Cards/ExpenseInsightCard';

const InsightOverview = ({ data }) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <ExpenseInsightCard data={data} />
    </div>
  );
};

export default InsightOverview;
