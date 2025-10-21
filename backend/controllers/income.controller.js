import incomeModel from "../models/Income.model.js";
import xlsx from "xlsx";

// Add an Income
export const addIncome = async (req, res) => {
  const userId = req.user.id;

  try {
    const { icon, source, amount, date } = req.body;

    // Check for any missing fields
    if (!source || !amount || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newIncome = new incomeModel({
      userId,
      icon,
      source,
      amount,
      date: new Date(date),
    });

    await newIncome.save();
    res.status(200).json({ message: "Income added successfully", newIncome });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in adding income", error: error.message });
  }
};

//Get all Income
export const getAllIncome = async (req, res) => {
  const userId = req.user.id;

  try {
    const income = await incomeModel
      .find({ userId })
      .select("-__v")
      .sort({ date: -1 });
    res.status(200).json(income);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in getting income", error: error.message });
  }
};

//delete an Income
export const deleteIncome = async (req, res) => {
  const userId = req.user.id;

  try {
    const income = await incomeModel.findOneAndDelete({
      _id: req.params.id,
      userId,
    });
    if (!income) {
      return res
        .status(404)
        .json({ message: "Income not found or unauthorized" });
    }
    res.status(200).json({ message: "Income deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in deleting income", error: error.message });
  }
};

//download the Income
export const downloadIncomeExcel = async (req, res) => {
  const userId = req.user.id;

  try {
    const income = await incomeModel.find({ userId }).sort({ date: -1 });

    const data = income.map((item) => ({
      Source: item.source,
      Amount: item.amount,
      Date: item.date.toISOString().split("T")[0],
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Income");

    // Write workbook to buffer instead of file
    const buffer = xlsx.write(wb, { bookType: "xlsx", type: "buffer" });

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=Income_details.xlsx"
    );
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.send(buffer);
  } catch (error) {
    res.status(500).json({
      message: "Error in downloading Income",
      error: error.message,
    });
  }
};
