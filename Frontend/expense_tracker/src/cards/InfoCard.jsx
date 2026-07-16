import React from "react";

const InfoCard = ({
  icon,
  label,
  value = 0,
  currency = "Rs.",
  color = "bg-blue-100 text-blue-700",
}) => {
  return (
    <div className="flex items-center gap-6 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow w-full">
      <div className={`w-14 h-14 flex items-center justify-center rounded-full ${color}`}>
        {icon}
      </div>
      <div className="flex flex-col">
        <h6 className="text-sm font-medium text-gray-600 dark:text-gray-300">{label}</h6>
        <span className="text-xl font-semibold text-gray-900 dark:text-white">
          {currency} {value}
        </span>
      </div>
    </div>
  );
};

export default InfoCard;
