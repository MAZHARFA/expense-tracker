import React from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

const Navbar = ({ onToggleMenu, isOpen }) => {
  return (
    <nav className="flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-800 shadow z-50">
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleMenu}
          className="text-2xl text-gray-700 dark:text-white cursor-pointer"
        >
          {isOpen ? <HiOutlineX /> : <HiOutlineMenu />}
        </button>
        <h1 className="text-lg font-semibold text-green-900 dark:text-white">
          Expense Tracker
        </h1>
      </div>
    </nav>
  );
};

export default Navbar;
