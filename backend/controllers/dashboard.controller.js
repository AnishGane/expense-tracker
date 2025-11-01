import incomeModel from "../models/Income.model.js";
import expenseModel from "../models/Expense.model.js";
import { isValidObjectId, Types } from "mongoose";
import moment from "moment";

export const getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;
    // Convert it to userObjectId , so Mongoose queries recognize it
    const userObjectId = new Types.ObjectId(String(userId));

    // Fetch total income & expenses for the user
    //$match: Finds all income documents for this user
    // $group: Groups all those documents together (since _id: null) and sums the amount field
    const totalIncome = await incomeModel.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const totalExpenses = await expenseModel.aggregate([
      {
        $match: { userId: userObjectId },
      },
      {
        $group: { _id: null, total: { $sum: "$amount" } },
      },
    ]);

    const now = new Date();
    const sixtyDaysAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);

    // Get Income transactions in the last 60 days
    const last60DaysIncomeTransaction = await incomeModel
      .find({
        userId,
        date: { $gte: sixtyDaysAgo }, //$gte -> greater than or equal
      })
      .sort({ date: -1 }); // newest first

    // Get total income in the last 60 days
    const incomeLast60Days = last60DaysIncomeTransaction.reduce(
      (sum, transaction) => sum + Number(transaction.amount || 0),
      0
    );

    // Get Expense transactions in the last 30 days
    const last30DaysExpenseTransaction = await expenseModel
      .find({
        userId,
        date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
      })
      .sort({ date: -1 });

    // Get total expense in the last 30 days
    const expenseLast30Days = last30DaysExpenseTransaction.reduce(
      (sum, transaction) => sum + Number(transaction.amount || 0),
      0
    );

    // Get last 10 transactions
    const lastTransactions = await incomeModel.aggregate([
      { $match: { userId: userObjectId } },
      {
        $project: {
          amount: 1,
          date: 1,
          source: 1,
          type: { $literal: "income" },
        },
      },
      {
        $unionWith: {
          coll: "expenses",
          pipeline: [
            { $match: { userId: userObjectId } },
            {
              $project: {
                amount: 1,
                date: 1,
                category: 1,
                type: { $literal: "expense" },
              },
            },
          ],
        },
      },
      { $sort: { date: -1 } },
      { $limit: 10 },
    ]);

    // Final Response
    res.status(200).json({
      totalBalance:
        (totalIncome[0]?.total || 0) - (totalExpenses[0]?.total || 0),
      totalIncome: totalIncome[0]?.total || 0,
      totalExpenses: totalExpenses[0]?.total || 0,
      last30DaysExpenses: {
        total: expenseLast30Days,
        transactions: last30DaysExpenseTransaction,
      },
      last60DaysIncome: {
        total: incomeLast60Days,
        transactions: last60DaysIncomeTransaction,
      },
      recentTransactions: lastTransactions,
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export const getSmartInsights = async (req, res) => {
  try {
    const userId = new Types.ObjectId(String(req.user.id));

    // Define date ranges for current and previous months
    const startOfCurrentMonth = moment().startOf("month").toDate();
    const endOfCurrentMonth = moment().endOf("month").toDate();

    const startOfPrevMonth = moment()
      .subtract(1, "month")
      .startOf("month")
      .toDate();
    const endOfPrevMonth = moment()
      .subtract(1, "month")
      .endOf("month")
      .toDate();

    // Fetch current and previous month expenses by date range
    const [currExpenses, prevExpenses] = await Promise.all([
      expenseModel.find({
        userId,
        date: { $gte: startOfCurrentMonth, $lte: endOfCurrentMonth },
      }),
      expenseModel.find({
        userId,
        date: { $gte: startOfPrevMonth, $lte: endOfPrevMonth },
      }),
    ]);

    // Calculate totals
    const currentTotal = currExpenses.reduce((sum, e) => sum + e.amount, 0);
    const prevTotal = prevExpenses.reduce((sum, e) => sum + e.amount, 0);

    // Calculate percentage change
    const changePercent = prevTotal
      ? (((currentTotal - prevTotal) / prevTotal) * 100).toFixed(1)
      : 0;

    // Find top category (this month)
    const categoryTotals = {};
    currExpenses.forEach((e) => {
      categoryTotals[e.category] = (categoryTotals[e.category] || 0) + e.amount;
    });
    const topCategory =
      Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0] || [];

    // Find biggest expense
    const maxExpense =
      currExpenses.length > 0
        ? currExpenses.reduce((max, e) => (e.amount > max.amount ? e : max))
        : null;

    // Calculate average expense over past 3 months
    const last3Months = await expenseModel.aggregate([
      {
        $match: {
          userId,
          date: { $gte: moment().subtract(3, "months").toDate() },
        },
      },
      { $group: { _id: null, avgAmount: { $avg: "$amount" } } },
    ]);
    const avgExpense = last3Months[0]?.avgAmount || 0;

    res.json({
      currentTotal,
      prevTotal,
      changePercent,
      topCategory: topCategory[0],
      topCategoryAmount: topCategory[1],
      maxExpense,
      avgExpense,
    });
  } catch (error) {
    console.error("Error fetching insights:", error);
    res.status(500).json({ message: "Failed to fetch insights" });
  }
};
