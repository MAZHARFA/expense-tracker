import React from "react";
import CustomPieChart from "../Piecarts/CustomPieChart";
import { formatCurrency } from "../Utils/data";

const COLORS = ["#6366F1", "#F59E0B", "#EF4444"];

const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {
  const balanceData = [
    { name: "Total Balance", amount: totalBalance, color: COLORS[0] },
    { name: "Total Income", amount: totalIncome, color: COLORS[1] },
    { name: "Total Expense", amount: totalExpense, color: COLORS[2] },
  ];

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg font-semibold text-gray-800">
          Financial Overview
        </h5>
      </div>

      <CustomPieChart
        data={balanceData}
        label="Total Balance"
        totalAmount={formatCurrency(totalBalance)} 
        colors={COLORS}
        showTextAnchor
      />
    </div>
  );
};

export default FinanceOverview;
