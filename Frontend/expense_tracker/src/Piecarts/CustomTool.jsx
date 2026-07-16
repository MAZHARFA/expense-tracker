import React from 'react';

const CustomTool = ({ active, payload }) => {
  if (!active || !payload || payload.length === 0) return null;

  const data = payload[0];

  return (
    <div className="bg-white shadow-md border border-gray-200 rounded-lg px-4 py-2">
      <p className="text-sm font-semibold text-gray-800">
        {data.name || data.payload?.name}
      </p>
      <p className="text-sm text-gray-600">
        Amount:{" "}
        <span className="text-purple-600 font-medium">
          PKR. {data.value?.toLocaleString() || 0}
        </span>
      </p>
    </div>
  );
};

export default CustomTool;
