import React from "react";
import { LuDownload } from "react-icons/lu";
import TranscationInfoCard from "../cards/TransactionInfoCard";
import moment from "moment";
import { motion } from "framer-motion";

const ExpenseList = ({ transactions = [], onDelete, onDownload }) => {
  return (
    <motion.div
      className="flex justify-center items-start min-h-screen pt-8 sm:pt-12 px-3 sm:px-4"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="w-full max-w-5xl bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-4 sm:p-6">
  
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-4">
          <h5 className="text-xl sm:text-3xl font-semibold text-gray-800 dark:text-white">
            Expense Details
          </h5>
          <button
            className="flex items-center gap-2 bg-blue-100 hover:bg-blue-200 transition px-3 sm:px-4 py-2 rounded-md text-sm font-medium"
            onClick={onDownload}
          >
            <LuDownload className="text-base sm:text-lg" />
            Download
          </button>
        </div>

   
        {transactions.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 text-sm sm:text-base">
            No Expense found.
          </p>
        ) : (
          <div className="w-full grid grid-cols-1 sm:grid-cols-0 lg:grid-cols-0 gap-4 sm:gap-6">
            {transactions.map((item) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <TranscationInfoCard
                  title={item.category}
                  icon={item.icon}
                  date={moment(item.date).format("DD MMM YYYY")}
                  amount={item.amount}
                  type="expense"
                  hideDeleteBtn={false}
                  onDelete={() => onDelete(item._id)}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ExpenseList;
