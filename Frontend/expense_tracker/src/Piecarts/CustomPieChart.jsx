import React from "react";
import CustomTool from "./CustomTool";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = ["#6366F1", "#47B39C", "#F59E0B", "#EF4444", "#3B82F6"];

const CustomPieChart = ({
  data,
  label,
  totalAmount,
  showTextAnchor = true,
}) => {
  return (
    <ResponsiveContainer width="100%" height={380}>
      <PieChart>
        <Pie
          data={data}
          dataKey="amount"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={130}
          innerRadius={100}
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>

        <Tooltip content={CustomTool} />
        <Legend iconType="circle" />

        {showTextAnchor && (
          <>
            <text
              x="50%"
              y="50%"
              dy={-10}
              textAnchor="middle"
              fill="#666"
              fontSize="14px"
            >
              {label}
            </text>
            <text
              x="50%"
              y="50%"
              dy={16}
              textAnchor="middle"
              fill="#111"
              fontSize="24px"
              fontWeight="600"
            >
              {totalAmount}
            </text>
          </>
        )}
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;
