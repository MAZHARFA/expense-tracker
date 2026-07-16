"use strict";
import Income from "../Models/Income.js";
import xlsx from "xlsx";

export const addIncome = async (req, res) => {
  try {
    const { icon, source, amount, date } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    if (!source || !amount || !date) {
      return res
        .status(400)
        .json({ success: false, message: "All Fields are Required" });
    }

    const income = new Income({
      userId,
      icon,
      source,
      amount,
      date: new Date(date),
    });

    await income.save();

    return res
      .status(200)
      .json({ success: true, message: "Data Saved", newIncome: income });
  } catch (error) {
    console.error("Error saving income:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const getAllIncome = async (req, res) => {
  const userId = req.user.id;

  try {
    const income = await Income.find({ userId }).sort({ date: -1 });
    return res.status(200).json({ success: true, message: income });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const deleteIncome = async (req, res) => {
  try {
    await Income.findByIdAndDelete(req.params.id);

    return res
      .status(200)
      .json({ success: true, message: "Income  Deleted Successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const fileDownloadIncome = async (req, res) => {
  const userId = req.user.id;
  try {
    const income = await Income.find({ userId }).sort({ date: -1 });

    const data = income.map((item) => ({
      Source: item.source,
      Amount: item.amount,
      Date: new Date(item.date).toLocaleDateString("en-GB"),
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Income");

    // Generate buffer
    const buffer = xlsx.write(wb, { bookType: "xlsx", type: "buffer" });

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=income_details.xlsx"
    );
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    return res.send(buffer);
  } catch (error) {
    console.error("Error generating Excel:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to download income file" });
  }
};
