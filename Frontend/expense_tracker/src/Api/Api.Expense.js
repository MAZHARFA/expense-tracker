"use strict";

import axios from "axios";
import toast from "react-hot-toast";

const VITE_EXPENSE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api/tracker/expense"
    : "/api/tracker/expense";

export const expenseApi = {
  addExpense: async (icon, category, amount, date) => {
    try {
      const response = await axios.post(`${VITE_EXPENSE_URL}/add`, {
        icon,
        category,
        amount,
        date,
      });

      return response.data;
    } catch (error) {
      toast.error("Expense cannot Add!");
      throw error;
    }
  },

  getAllExpense: async () => {
    try {
      const response = await axios.get(`${VITE_EXPENSE_URL}/get`, {
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      toast.error("Error Fetching Expense");
      throw error;
    }
  },

  deleteExpense: async (id) => {
    try {
      const response = await axios.post(`${VITE_EXPENSE_URL}/delete/${id}`);

      return response.data;
    } catch (error) {
      toast.error("Error Deleteing Expense");
      throw error;
    }
  },

  fileDownloadExpense: async () => {
    try {
      const response = await axios.get(`${VITE_EXPENSE_URL}/download`, {
        responseType: "arraybuffer",
      });
  
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "expense_details.xlsx");
      document.body.appendChild(link);
      link.click();
  
      // Cleanup
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    }
  }
};  
