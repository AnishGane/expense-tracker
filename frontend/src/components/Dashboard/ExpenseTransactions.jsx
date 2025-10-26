import React from 'react';
import { LuArrowRight } from 'react-icons/lu';
import TransactionInfoCard from '../Cards/TransactionInfoCard';
import moment from 'moment';

const ExpenseTransactions = ({ transactions, onSeeMore }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Expenses</h5>

        <button className="card-btn" onClick={onSeeMore}>
          See All <LuArrowRight className="text-base" />
        </button>
      </div>

      <div className="mt-6">
        {transactions?.length === 0 ? (
          <div>
            <p className="text-sm text-gray-500">No records of expenses</p>
            <p className="mt-1 text-xs tracking-wide text-gray-500">
              Go to Expense to add an expense record
            </p>
          </div>
        ) : (
          transactions
            ?.slice(0, 5)
            .map((expense) => (
              <TransactionInfoCard
                key={expense._id}
                title={expense.category}
                amount={expense.amount}
                icon={expense.icon}
                date={moment(expense.date).format('Do MMM YYYY')}
                type={expense.type}
                hideDeleteBtn
              />
            ))
        )}
      </div>
    </div>
  );
};

export default ExpenseTransactions;
