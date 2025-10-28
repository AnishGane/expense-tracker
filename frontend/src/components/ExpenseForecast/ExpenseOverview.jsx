import React from 'react';
import { addThousandsSeparator } from '../../utils/helper';
import ExpForecastInfoCard from '../Cards/ExpForecastInfoCard';
import ExpenseForecastChart from '../Charts/ExpenseForecastChart';

const ExpenseOverview = ({ data }) => {
  const { prediction, averageExpense, expenseToIncomeRatio } = data || {};

  return (
    <div>
      <h2 className="text-lg">Expense Forecast</h2>
      <p className="mb-6 text-xs text-gray-500">
        Based on your past expenses, we have predicted your expenses for the next month & calculated
        your average monthly expense.
      </p>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <ExpForecastInfoCard
          label="Predicted Next Month Expense"
          value={`$${addThousandsSeparator(prediction?.predictedExpense || 0)}`}
        />
        <ExpForecastInfoCard
          label="Average Monthly Expense"
          value={`$${addThousandsSeparator(averageExpense.toFixed(2) || 0)}`}
        />
        <ExpForecastInfoCard
          label="Expense/Income Ratio"
          value={expenseToIncomeRatio}
          desc={`You have spent ${expenseToIncomeRatio * 100}% of your income on expenses.` || ''}
        />
        <div className="">
          <p className="text-sm text-gray-500"></p>
          <h3 className="text-xl font-medium"></h3>
        </div>
      </div>

      <div className="mt-6">
        {prediction?.monthlyData && (
          <ExpenseForecastChart
            data={prediction.monthlyData}
            predictedExpense={prediction.predictedExpense}
            regressionInfo={prediction.regressionInfo}
          />
        )}
      </div>
    </div>
  );
};

export default ExpenseOverview;
