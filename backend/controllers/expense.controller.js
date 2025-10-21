import expenseModel from "../models/Expense.model.js";
import xlsx from "xlsx";

// Add an Expense
export const addExpense = async (req, res) => {
  const userId = req.user.id;

  try {
    const { icon, category, amount, date } = req.body;

    // Check for any missing fields
    if (!category || !amount || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newExpense = new expenseModel({
      userId,
      icon,
      category,
      amount,
      date: new Date(date), //Global date
    });

    await newExpense.save();
    res.status(200).json({ message: "Expense added successfully", newExpense });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in adding expense", error: error.message });
  }
};

//Get all Expense
export const getAllExpense = async (req, res) => {
  const userId = req.user.id;

  try {
    const expense = await expenseModel
      .find({ userId })
      .select("-__v")
      .sort({ date: -1 });
    res.status(200).json(expense);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in getting expense", error: error.message });
  }
};

//delete an Expense
export const deleteExpense = async (req, res) => {
  const userId = req.user.id;

  try {
    const expense = await expenseModel.findOneAndDelete({
      _id: req.params.id,
      userId,
    });
    if (!expense) {
      return res
        .status(404)
        .json({ message: "Expense not found or unauthorized" });
    }
    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in deleting Expense", error: error.message });
  }
};

//download the Expense
export const downloadExpenseExcel = async (req, res) => {
  const userId = req.user.id;

  try {
    const expense = await expenseModel.find({ userId }).sort({ date: -1 });

    const data = expense.map((item) => ({
      Category: item.category,
      Amount: item.amount,
      Date: item.date.toISOString().split("T")[0],
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Expense");

    // Write workbook to buffer instead of file
    const buffer = xlsx.write(wb, { bookType: "xlsx", type: "buffer" });

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=Expense_details.xlsx"
    );
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.send(buffer);
  } catch (error) {
    res.status(500).json({
      message: "Error in downloading Expense",
      error: error.message,
    });
  }
};
