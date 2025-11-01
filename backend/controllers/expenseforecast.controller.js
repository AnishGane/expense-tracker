import incomeModel from "../models/Income.model.js";
import expenseModel from "../models/Expense.model.js";
import { Types } from "mongoose";

export const getExpenseForecast = async (req, res) => {
  try {
    const userId = req.user.id;
    const userObjectId = new Types.ObjectId(String(userId));

    // Use past 6 months of data for prediction
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    // 1️ Get expense data for past 6 months grouped by month
    const monthlyExpenses = await expenseModel.aggregate([
      {
        $match: {
          userId: userObjectId,
          date: { $gte: sixMonthsAgo },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" },
          },
          totalExpenses: { $sum: "$amount" },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    let prediction = null;

    if (monthlyExpenses.length >= 2) {
      // 2️ Predict next month's expense using Simple Linear Regression
      const expenses = monthlyExpenses.map((m) => m.totalExpenses);
      const n = expenses.length;
      const x = Array.from({ length: n }, (_, i) => i + 1);

      const meanX = x.reduce((sum, v) => sum + v, 0) / n;
      const meanY = expenses.reduce((sum, v) => sum + v, 0) / n;

      const numerator = x.reduce(
        (sum, xi, i) => sum + (xi - meanX) * (expenses[i] - meanY),
        0
      );
      const denominator = x.reduce(
        (sum, xi) => sum + Math.pow(xi - meanX, 2),
        0
      );

      const b = denominator !== 0 ? numerator / denominator : 0;
      const a = meanY - b * meanX;

      const predictedExpense = a + b * (n + 1);

      prediction = {
        predictedExpense: Math.round(
          predictedExpense > 0 ? predictedExpense : meanY
        ),
        monthlyData: monthlyExpenses.map((m) => ({
          month: m._id.month,
          year: m._id.year,
          total: m.totalExpenses,
        })),
        regressionInfo: {
          slope: b.toFixed(2),
          intercept: a.toFixed(2),
          trend:
            b > 0
              ? "increasing trend"
              : b < 0
              ? "decreasing trend"
              : "stable expenses",
        },
      };
    } else if (monthlyExpenses.length === 1) {
      // 3️ If only one month of data, predict same as last month
      const single = monthlyExpenses[0];
      prediction = {
        predictedExpense: Math.round(single.totalExpenses),
        monthlyData: [
          {
            month: single._id.month,
            year: single._id.year,
            total: single.totalExpenses,
          },
        ],
        regressionInfo: {
          slope: "0.00",
          intercept: single.totalExpenses.toFixed(2),
          trend: "insufficient data — assumed stable expenses",
        },
      };
    } else {
      // 4️ No data at all
      prediction = {
        predictedExpense: 0,
        monthlyData: [],
        regressionInfo: {
          slope: "0.00",
          intercept: "0.00",
          trend: "no expense data available",
        },
      };
    }

    // 5️ Get income data to compute average income-expense ratio
    const incomeData = await incomeModel.aggregate([
      {
        $match: {
          userId: userObjectId,
          date: { $gte: sixMonthsAgo },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" },
          },
          totalIncome: { $sum: "$amount" },
        },
      },
    ]);

    const avgExpense =
      monthlyExpenses.length > 0
        ? monthlyExpenses.reduce((sum, e) => sum + e.totalExpenses, 0) /
          monthlyExpenses.length
        : 0;

    // Current month range
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    const endOfMonth = new Date();
    endOfMonth.setMonth(endOfMonth.getMonth() + 1);
    endOfMonth.setDate(0);

    // Get current month's income and expenses
    const [currentMonthIncome, currentMonthExpense] = await Promise.all([
      incomeModel.aggregate([
        {
          $match: {
            userId: userObjectId,
            date: { $gte: startOfMonth, $lte: endOfMonth },
          },
        },
        { $group: { _id: null, totalIncome: { $sum: "$amount" } } },
      ]),
      expenseModel.aggregate([
        {
          $match: {
            userId: userObjectId,
            date: { $gte: startOfMonth, $lte: endOfMonth },
          },
        },
        { $group: { _id: null, totalExpense: { $sum: "$amount" } } },
      ]),
    ]);

    const currentIncome = currentMonthIncome[0]?.totalIncome || 0;
    const currentExpense = currentMonthExpense[0]?.totalExpense || 0;

    // Calculate current month ratio
    const currentMonthRatio = currentIncome
      ? (currentExpense / currentIncome).toFixed(2)
      : null;

    // ✅ Final Response
    res.status(200).json({
      success: true,
      prediction,
      averageExpense: avgExpense,
      expenseToIncomeRatio: currentMonthRatio,
      regressionInfo: prediction?.regressionInfo || null,
    });
  } catch (error) {
    console.error("Insights error:", error);
    res.status(500).json({
      message: "Failed to generate insights",
      error: error.message,
    });
  }
};
