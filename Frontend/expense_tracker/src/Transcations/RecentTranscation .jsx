import React from "react";
import { LuArrowRight } from "react-icons/lu";
import moment from "moment";
import TransactionInfoCard from "../cards/TransactionInfoCard";

const RecentTranscation = ({ transactions = [], onSeeMore }) => {
  return (
    <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-lg font-semibold text-gray-800">
          Recent Transactions
        </h5>
        <button
          onClick={onSeeMore}
          className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-gray-100 text-sm text-gray-700 hover:bg-gray-200 transition-all"
        >
          View Summary
          <LuArrowRight className="text-base" />
        </button>
      </div>

      {/* List */}
      <div className="space-y-4">
        {transactions.length === 0 ? (
          <p className="text-sm text-gray-500 text-center">
            No transactions found.
          </p>
        ) : (
          transactions.slice(0, 5).map((item) => (
            <TransactionInfoCard
              key={item._id}
              title={item.type === "expense" ? item.category : item.source}
              icon={item.icon}
              date={moment(item.date).format("Do MMM YYYY")}
              amount={item.amount}
              type={item.type}
              hideDeleteBtn
            />
          ))
        )}
      </div>
    </div>
  );
};

export default RecentTranscation;
