import React, { useEffect, useState } from "react";
import { prepareExpenseBarChartData } from "../Utils/data";
import CustomBarChart from "../Piecarts/CustomBarChart";

const LastThirtyDaysOfExpenses = ({ data }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareExpenseBarChartData(data);
    setChartData(result);
  }, [data]);

  return (
    <div className="card w-full md:col-span-1">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-lg font-semibold text-gray-800">
          Last 30 Days Of  Expenses
        </h5>
      </div>

      {chartData.length > 0 ? (
        <CustomBarChart data={chartData} />
      ) : (
        <p className="text-sm text-gray-500 text-center">No expense data available.</p>
      )}
    </div>
  );
};

export default LastThirtyDaysOfExpenses;
