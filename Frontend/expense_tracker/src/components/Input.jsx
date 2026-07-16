import React from "react";


const Input = ({
  icon: Icon,
  rightIcon: RightIcon,
  onRightIconClick,
  className,
  ...inputProps
}) => {
  return (
    <div className="relative mb-6">
      {/* Left Icon */}
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Icon className="size-5 text-green-500" />
      </div>

      {/* Input */}
      <input
        {...inputProps}
        className={`w-full pl-10 pr-10 py-2 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500 text-white placeholder-gray-400 transition duration-200"
         
        }`}
      />

      {/* Right Icon */}
      {RightIcon && (
        <button
          type="button"
          onClick={onRightIconClick}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 focus:outline-none"
        >
          <RightIcon className="size-5" />
        </button>
      )}
    </div>
  );
};



export default Input;
