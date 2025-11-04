import moment from 'moment';
import React from 'react';
import { FaFilePdf, FaFileExcel } from 'react-icons/fa';
import TransactionInfoCard from '../Cards/TransactionInfoCard';

const IncomeList = ({ transactions, onDelete, onDownload, onPDFDownload }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Income Sources</h5>

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
        {transactions?.map((income) => (
          <TransactionInfoCard
            key={income._id}
            title={income.source}
            icon={income.icon}
            date={moment(income.date).format('Do MM YYYY')}
            amount={income.amount}
            type="income"
            onDelete={() => onDelete(income._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default IncomeList;
