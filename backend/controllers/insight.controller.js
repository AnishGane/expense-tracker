import incomeModel from "../models/Income.model.js";
import expenseModel from "../models/Expense.model.js";
import { Types } from "mongoose";

export const getExpenseInsights = async (req, res) => {
  try {
    const userId = req.user.id;
    const userObjectId = new Types.ObjectId(String(userId));

    // Use past 6 months of data for prediction
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    // 1 Get expense data for past 6 months grouped by month
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

    // 2 Predict next month's expense using Simple Linear Regression
    let prediction = null;

    if (monthlyExpenses.length >= 2) {
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
        monthlyData: monthlyExpenses.map((m, i) => ({
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
    }

    // 3️ Get average income-expense ratio
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

    const avgIncome =
      incomeData.length > 0
        ? incomeData.reduce((sum, i) => sum + i.totalIncome, 0) /
          incomeData.length
        : 0;

    const avgExpense =
      monthlyExpenses.length > 0
        ? monthlyExpenses.reduce((sum, e) => sum + e.totalExpenses, 0) /
          monthlyExpenses.length
        : 0;

    const ratio = avgIncome ? (avgExpense / avgIncome).toFixed(2) : null;

    // 4️ Final Response
    res.status(200).json({
      success: true,
      prediction,
      averageExpense: avgExpense,
      averageIncome: avgIncome,
      expenseToIncomeRatio: ratio,
      regressionInfo: prediction?.regressionInfo || null,
    });
  } catch (error) {
    console.error("Insights error:", error);
    res
      .status(500)
      .json({ message: "Failed to generate insights", error: error.message });
  }
};
