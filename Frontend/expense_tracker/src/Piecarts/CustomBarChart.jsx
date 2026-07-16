import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";

const COLORS = ["#92A8D1", "#A78BFA", "#6366F1","#88B04B","#F7CAC9","#FF6F61","#6B5B95"];

const CustomBarChart = ({ data = [] }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload?.length) {
      return (
        <div className="bg-white p-2 rounded shadow text-sm">
          <p className="font-semibold">{label}</p>
          <span className="font-medium text-blue-600">Amount:</span> PKR{" "}
          {payload[0].value}
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="70%" height={300}>
      <BarChart data={data} margin={{ top: 10, right: 20, bottom: 30 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="category" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="amount" radius={[8, 8, 0, 0]}>
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CustomBarChart;
