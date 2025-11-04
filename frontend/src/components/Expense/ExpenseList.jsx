import React from 'react';
import TransactionInfoCard from '../Cards/TransactionInfoCard';
import moment from 'moment';
import { FaFileExcel, FaFilePdf } from 'react-icons/fa6';

const ExpenseList = ({ transactions, onDelete, onDownload, onPDFDownload }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">All Expenses</h5>

        <div className="flex items-center gap-2">
          <button className="card-btn" onClick={onDownload}>
            <FaFileExcel className="text-balance" /> Download Excel
          </button>
          <button className="card-btn" onClick={onPDFDownload}>
            <FaFilePdf className="text-balance" /> Download PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        {transactions?.map((expense) => (
          <TransactionInfoCard
            key={expense._id}
            title={expense.category}
            icon={expense.icon}
            date={moment(expense.date).format('Do MM YYYY')}
            amount={expense.amount}
            type="expense"
            onDelete={() => onDelete(expense._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ExpenseList;
