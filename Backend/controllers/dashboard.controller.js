import Income from "../Models/Income.js";
import Expense from "../Models/Expense.js";
import { Types } from "mongoose";

export const getDashboardData = async (req, res) => {
  const userId = req.user.id; 
  if (!userId) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  try {
    const userObjectId = new Types.ObjectId(userId);
   

    // Total Income
    const totalIncome = await Income.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    // Total Expense
    const totalExpense = await Expense.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    // Income transactions - last 60 days
    const incomeTransactions = await Income.find({
      userId: userObjectId,
      date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    const incomeData = incomeTransactions.reduce((sum, t) => sum + t.amount, 0);

    // Expense transactions - last 30 days
    const expenseTransactions = await Expense.find({
      userId: userObjectId,
      date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    const expenseData = expenseTransactions.reduce((sum, t) => sum + t.amount, 0);

    // Last 5 combined transactions
    const lastTranscation = [
      ...(await Income.find({ userId: userObjectId })
        .sort({ date: -1 })
        .limit(5)).map((txn) => ({ ...txn.toObject(), type: "income" })),
      ...(await Expense.find({ userId: userObjectId })
        .sort({ date: -1 })
        .limit(5)).map((txn) => ({ ...txn.toObject(), type: "expense" })),
    ].sort((a, b) => b.date - a.date);

    // Final Response
    res.json({
      totalBalance:
        (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
      totalIncome: totalIncome[0]?.total || 0,
      totalExpense: totalExpense[0]?.total || 0,
      transcationDataOfExpense: {
        total: expenseData,
        transcations: expenseTransactions,
      },
      transcationDataOfIncome: {
        total: incomeData,
        transcations: incomeTransactions,
      },
      recentTranscation: lastTranscation,
    });
  } catch (error) {
    console.error("Dashboard Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
