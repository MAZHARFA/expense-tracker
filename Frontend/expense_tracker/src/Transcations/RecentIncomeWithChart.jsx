import React, { useEffect, useState } from "react";
import CustomPieChart from "../Piecarts/CustomPieChart";
import { formatCurrency } from "../Utils/data";

const COLORS = ["#875CF5", "#FA2C37", "#FF6900","#4f39f6"];

const RecentIncomeWithChart = ({data,totalIncome}) => {
  const [chartData, setChartData] = useState([]);

  const prepareChartData = () => {
    const dataArr = data?.map((item) => ({
      name: item?.source,
      amount: item?.amount,
    }));

    setChartData(dataArr);
  };

  useEffect(() => {
    prepareChartData();

    return () => {};
  }, [data]);
  return (
    <>
      <div className="card">
        <div className="flex items-center justify-between ">
          <h5 className="text-lg font-semibold text-gray-800">
           Last Sixty Days Of Income
          </h5>
        </div>

        <CustomPieChart
          data={chartData}
          label="Total Income"
          totalAmount={formatCurrency(totalIncome)}
          colors={COLORS}
          showTextAnchor
        />
      </div>
     
    </>
  );
};

export default RecentIncomeWithChart;
