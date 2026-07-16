import React from "react";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts";

const CustomLineBarchart = ({ data }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload?.length) {
      return (
        <div className="bg-white border border-gray-200 p-3 rounded-md shadow-md text-sm">
          <p className="font-semibold text-purple-700">{label}</p>
          <p className="text-gray-600">
            <span className="font-medium text-blue-600" >Amount:</span> PKR {payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#875CF5" stopOpacity={0.5} />
            <stop offset="100%" stopColor="#875CF5" stopOpacity={0} />
          </linearGradient>
        </defs>

        <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
        <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#666" }} />
        <YAxis tick={{ fontSize: 12, fill: "#666" }} />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="amount"
          stroke="#875CF5"
          fill="url(#expenseGradient)"
          strokeWidth={3}
          dot={{ r: 4, fill: "#875CF5", stroke: "#fff", strokeWidth: 1 }}
          activeDot={{ r: 6, fill: "#875CF5", stroke: "#fff", strokeWidth: 2 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default CustomLineBarchart;
