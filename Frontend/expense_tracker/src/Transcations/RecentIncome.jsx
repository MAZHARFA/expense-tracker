import React from "react";
import { LuArrowRight } from "react-icons/lu";
import TransactionInfoCard from "../cards/TransactionInfoCard";
import moment from "moment";

const RecentIncome = ({ transcations, onSeeMore }) => {
  return (
    <>
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h5 className="text-lg font-semibold text-gray-800">Income Details</h5>
          <button
            onClick={onSeeMore}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-gray-100 text-sm text-gray-700 hover:bg-gray-200 transition-all"
          >
            See All
            <LuArrowRight className="text-base" />
          </button>
        </div>
        <div className="space-y-4">
        {transcations.length === 0 ? (
          <p className="text-sm text-gray-500 text-center">
            No Data Found
          </p>
        ) : (
          transcations.slice(0, 5).map((item) => (
            <TransactionInfoCard
              key={item._id}
              title={item.source}
              icon={item.icon}
              date={moment(item.date).format("Do MMM YYYY")}
              amount={item.amount}
              type="income"
              hideDeleteBtn
            />
          ))
        )}
      </div>
      </div>
    </>
  );
};

export default RecentIncome;
