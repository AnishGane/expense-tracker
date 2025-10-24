import React from 'react';
import { LuUtensils, LuTrendingUp, LuTrendingDown, LuTrash2 } from 'react-icons/lu';

const TransactionInfoCard = ({ title, amount, icon, date, type, hideDeleteBtn, onDelete }) => {
  const getAmountStyles = () =>
    type === 'income' ? 'bg-green-50 text-green-500' : 'bg-red-50 text-red-500';
  return (
    <div className="group relative mt-2 flex items-center gap-4 rounded-lg p-3 hover:bg-gray-100/60">
      <div className="flex size-12 items-center justify-center rounded-full bg-gray-100 text-xl text-gray-800">
        {icon ? <img src={icon} alt={title} className="size-6" /> : <LuUtensils />}
      </div>

      <div className="flex flex-1 items-center justify-between">
        <div>
          <p className="text-[15px] font-medium text-gray-700">{title}</p>
          <p className="mt-1 text-xs text-gray-400">{date}</p>
        </div>

        <div className="flex items-center gap-2">
          {!hideDeleteBtn && (
            <button
              className="cursor-pointer text-gray-400 opacity-0 transition-opacity group-hover:opacity-100 hover:text-red-500"
              onClick={onDelete}
            >
              <LuTrash2 size={18} />
            </button>
          )}

          <div className={`flex items-center gap-2 rounded-md px-3 py-2 ${getAmountStyles()}`}>
            <h6 className="text-sm font-semibold">
              {type == 'income' ? '+' : '-'} ${amount}
            </h6>
            {type == 'income' ? <LuTrendingUp /> : <LuTrendingDown />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionInfoCard;
