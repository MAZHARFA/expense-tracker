"use strict";

import axios from "axios";

import toast from "react-hot-toast";

const VITE_INCOME_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api/tracker/income"
    : "/api/tracker/income";

export const incomeApi = {
  addIncome: async (icon, source, amount, date) => {
    if (!source.trim()) {
      toast.error("Source is required");
      return;
    }
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount should be a valid number Greather then zero");
      return;
    }
    if (!date) {
      toast.error("Date is Required");
      return;
    }

    try {
      const response = await axios.post(`${VITE_INCOME_URL}/add`, {
        icon,
        source,
        amount,
        date,
      });

      return response.data;
    } catch (error) {
      toast.error("Error Adding Income");
      throw error;
    }
  },

  getAllIncome: async () => {
    try {
      const response = await axios.get(`${VITE_INCOME_URL}/get`, {
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      toast.error("Error Fetching Income!");
      throw error;
    }
  },

  deleteIncome: async (id) => {
    try {
      const response = await axios.post(`${VITE_INCOME_URL}/delete/${id}`);

      return response.data;
    } catch (error) {
      toast.error("Error Deleting Income");
      throw error;
    }
  },

  fileDownloadIncome: async () => {
    try {
      const response = await axios.get(`${VITE_INCOME_URL}/download`, {
        responseType: "arraybuffer",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "income_details.xlsx");
      document.body.appendChild(link);
      link.click();

      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    }
  },
};
