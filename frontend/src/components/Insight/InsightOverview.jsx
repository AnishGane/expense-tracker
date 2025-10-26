import React from 'react';
import { addThousandsSeparator } from '../../utils/helper';
import InsightsChart from '../Charts/InsightsChart';
import InfoCard from '../Cards/InfoCard';
import InsightsInfoCard from '../Cards/InsightsInfoCard';

const InsightOverview = ({ data }) => {
  const { prediction, averageExpense, expenseToIncomeRatio } = data || {};

  return (
    <div>
      <h2 className="text-lg">Expense Forecast</h2>
      <p className="mb-6 text-xs text-gray-500">
        Based on your past expenses, we have predicted your expenses for the next month & calculated
        your average monthly expense.
      </p>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <InsightsInfoCard
          label="Predicted Next Month Expense"
          value={`$${addThousandsSeparator(prediction?.predictedExpense || 0)}`}
        />
        <InsightsInfoCard
          label="Average Monthly Expense"
          value={`$${addThousandsSeparator(averageExpense.toFixed(2) || 0)}`}
        />
        <InsightsInfoCard label="Expense/Income Ratio" value={expenseToIncomeRatio} />
        <div className="">
          <p className="text-sm text-gray-500"></p>
          <h3 className="text-xl font-medium"></h3>
        </div>
      </div>

      <div className="mt-6">
        {prediction?.monthlyData && (
          <InsightsChart
            data={prediction.monthlyData}
            predictedExpense={prediction.predictedExpense}
            regressionInfo={prediction.regressionInfo}
          />
        )}
      </div>
    </div>
  );
};

export default InsightOverview;
