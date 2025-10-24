import React, { useState } from 'react';
import EmojiPickerPopup from '../EmojiPickerPopup';
import Input from '../Inputs/Input';

const AddExpenseForm = ({ onAddExpense }) => {
  const [expense, setExpense] = useState({
    category: '',
    amount: '',
    date: '',
    icon: '',
  });

  const handleChange = (key, value) => setExpense({ ...expense, [key]: value });
  return (
    <div>
      <EmojiPickerPopup
        icon={expense.icon}
        onSelect={(selectedIcon) => handleChange('icon', selectedIcon)}
      />
      <Input
        value={expense.category}
        onChange={({ target }) => handleChange('category', target.value)}
        label="expense category"
        placeholder="Food, Shopping, etc."
        type="text"
      />
      <Input
        value={expense.amount}
        onChange={({ target }) => handleChange('amount', target.value)}
        label="Amount"
        placeholder="49xx.xx"
        type="number"
      />
      <Input
        value={expense.date}
        onChange={({ target }) => handleChange('date', target.value)}
        label="Date"
        placeholder="DD/MM/YYYY"
        type="date"
      />
      <div className="mt-6 flex justify-end">
        <button
          type="button"
          className="add-btn add-btn-fill"
          onClick={() => onAddExpense(expense)}
        >
          Add Expense
        </button>
      </div>
    </div>
  );
};

export default AddExpenseForm;
