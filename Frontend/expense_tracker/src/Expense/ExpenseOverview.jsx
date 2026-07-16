import React, { useState, useMemo } from "react";
import { LuHandCoins, LuPlus } from "react-icons/lu";
import { motion } from "framer-motion";
import { prepareExpenseLineChartData } from "../Utils/data";
import CustomLineBarchart from "../Piecarts/CustomLineBarchart";

const ExpenseOverview = ({ transactions = [], onAddExpense }) => {
  const [filter, setFilter] = useState("all");

  const chartData = useMemo(() => {
    return prepareExpenseLineChartData(transactions, filter);
  }, [transactions, filter]);

  return (
    <>
      <motion.div
        className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-6 px-4"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
          <LuHandCoins className="text-2xl" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
          Expense
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-4xl bg-white dark:bg-gray-900 shadow-md rounded-2xl p-4 sm:p-6 mx-auto mt-6"
      >
        <h5 className="text-xl sm:text-3xl font-semibold text-center">
          Expense Overview
        </h5>

        <motion.p
          className="text-center text-gray-500 dark:text-gray-400 text-sm sm:text-base mb-4 sm:mb-6 mt-3 sm:mt-5"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          Analyze your spending patterns over time and discover where your money
          is going.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-4 sm:mb-6 px-2 sm:px-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          <button
            onClick={onAddExpense}
            className="flex items-center gap-2 bg-green-300 hover:bg-green-400 px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base font-medium transition"
          >
            <LuPlus className="text-lg sm:text-xl" />
            Add Expense
          </button>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-300 rounded-md px-2 sm:px-3 py-1 text-sm dark:bg-gray-800 dark:text-white"
          >
            <option value="all">All</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
        </motion.div>

        <motion.div
          className="h-64 sm:h-80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <CustomLineBarchart data={chartData} />
        </motion.div>
      </motion.div>
    </>
  );
};

export default ExpenseOverview;
