
import React from "react";

const Input = ({ label, type = "text", value, onChange, placeholder, required }) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium dark:text-white">
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-2 border-amber-50 bg-blue-50 rounded-md"
      />
    </div>
  );
};

export default Input;
