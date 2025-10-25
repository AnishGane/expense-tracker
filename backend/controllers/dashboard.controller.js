import incomeModel from "../models/Income.model.js";
import expenseModel from "../models/Expense.model.js";
import { isValidObjectId, Types } from "mongoose";

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

    // console.log("totalIncome: ", {
    //   totalIncome,
    //   userId: isValidObjectId(userId),
    // });

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
