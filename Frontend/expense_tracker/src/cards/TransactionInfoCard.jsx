import React from "react";
import {
  LuTrendingUp,
  LuTrendingDown,
  LuTrash2,
  LuActivity,
} from "react-icons/lu";
import clsx from "clsx";

const TransactionInfoCard = ({
  title,
  icon,
  date,
  amount,
  type = "income",
  hideDeleteBtn = true,
  onDelete,
}) => {
  const income = type === "income";

  return (
    <div className="group flex items-center justify-between gap-4 p-4 rounded-xl shadow-sm bg-white hover:shadow-md transition">
      <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-gray-100 rounded-lg ">
        {icon ? (
          <img src={icon} alt={icon} className="w-6 h-6 object-contain" />
        ) : (
          <LuActivity className="text-gray-500 text-xl" />
        )}
      </div>

      <div className="flex-1">
        <h6 className="text-sm font-semibold text-black">{title}</h6>
        <p className="text-xs text-gray-600 mt-2">{date}</p>
      </div>

      <div className="flex items-center gap-3">
        <span
          className={clsx(
            "flex items-center gap-1 text-sm font-semibold ",
            income ? "text-green-400" : "text-red-500"
          )}
        >
          {`${income ? "+" : "-"} ${amount}`}
          {income ? <LuTrendingUp /> : <LuTrendingDown />}
        </span>

        {!hideDeleteBtn && (
         <button
         onClick={onDelete}
         className="opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity text-red-400 hover:text-red-600"
         title="Delete"
       >
         <LuTrash2 size={18} />
       </button>
       
        )}
      </div>
    </div>
  );
};

export default TransactionInfoCard;
