"use strict";

import Expense from "../Models/Expense.js";
import xlsx from "xlsx";

export const addExpense = async (req, res) => {
  const userId = req.user.id;

  try {
    const { icon, category, amount, date } = req.body;
    console.log("data", req.body);

    if (!category || !amount || !date) {
      return res
        .status(400)
        .json({ success: false, message: "All Fields are Required" });
    }

    const expense = new Expense({
      userId,
      icon,
      category,
      amount,
      date: new Date(date),
    });

    await expense.save();

    return res.status(200).json({
      success: true,
      message: "Expense saved!",
      newExpense: expense,
    });
  } catch (error) {
    console.log("Error", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const getAllExpense = async (req, res) => {
  const userId = req.user.id;
  try {
    const expense = await Expense.find({ userId }).sort({ date: -1 });
    return res.status(200).json({ success: true, message: expense });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    return res
      .status(200)
      .json({ success: true, message: "Expense Data Deleted Successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const fileDownloadExpense = async (req, res) => {
  const userId = req.user.id;

  try {
    const expense = await Expense.find({ userId }).sort({ date: -1 });

    const data = expense.map((item) => ({
      Category: item.category,
      Amount: item.amount,
      Date: new Date(item.date).toLocaleDateString("en-GB"),
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Expenses");

    const buffer = xlsx.write(wb, { bookType: "xlsx", type: "buffer" });

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=expense_details.xlsx"
    );
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    return res.send(buffer);
  } catch (error) {
    console.error("Error generating Excel:", error);
    return res.status(500).json({ success: false, message: "Download failed" });
  }
};
