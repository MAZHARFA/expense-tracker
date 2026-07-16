import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EmojiPicker from "emoji-picker-react";
import toast from "react-hot-toast";
import Input from "../context/Input";
import { LuImage, LuX } from "react-icons/lu";

const AddExpenseModal = ({ isOpen, onClose, onAddExpense, title = "Add Expense", children }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [expense, setExpense] = useState({
    category: "",
    amount: "",
    date: "",
    icon: "",
  });

  const handleChange = (key, value) => {
    setExpense((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { icon, category, amount, date } = expense;
    if (!category || !amount || !date) {
      toast.error("Please fill all required fields");
      return;
    }

    if (onAddExpense) {
      onAddExpense({ icon, category, amount, date });
    }

    setExpense({ icon: "", category: "", amount: "", date: "" });
    setShowEmojiPicker(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.95, y: -30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 30, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="w-full max-w-xl bg-white dark:bg-gray-900 rounded-2xl p-6 md:p-8 shadow-lg relative space-y-6"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-xl"
              type="button"
            >
              <LuX />
            </button>

            <h2 className="text-2xl font-bold dark:text-white text-center">
              {title}
            </h2>

         
            {children ? (
              <div>{children}</div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-1 relative">
                  <label className="block text-sm font-medium text-gray-700 dark:text-white">
                    Icon (Emoji)
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={expense.icon}
                      onChange={(e) => handleChange("icon", e.target.value)}
                      placeholder="Pick an Emoji"
                      className="w-full pl-4 pr-10 py-2 border-amber-50 bg-blue-50 dark:text-white rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        expense.icon
                          ? handleChange("icon", "")
                          : setShowEmojiPicker(!showEmojiPicker)
                      }
                      className="absolute top-1/2 right-3 transform -translate-y-1/2 text-xl"
                    >
                      {expense.icon ? <LuX /> : <LuImage />}
                    </button>
                  </div>
                  {showEmojiPicker && (
                    <div className="absolute z-50 mt-2">
                      <EmojiPicker
                        onEmojiClick={(emoji) => {
                          handleChange("icon", emoji.emoji);
                          setShowEmojiPicker(false);
                        }}
                        theme="light"
                      />
                    </div>
                  )}
                </div>

                <Input
                  label="category"
                  type="text"
                  value={expense.category}
                  onChange={(e) => handleChange("category", e.target.value)}
                  placeholder="e.g., Rent"
                  className="border-amber-50 bg-blue-50"
                  required
                />

                <Input
                  label="Amount"
                  type="number"
                  value={expense.amount}
                  onChange={(e) => handleChange("amount", e.target.value)}
                  placeholder="Enter amount"
                  className="w-full px-4 py-2 rounded-md dark:text-white border-amber-50 bg-blue-50"
                  required
                />

                <Input
                  label="Date"
                  type="date"
                  value={expense.date}
                  onChange={(e) => handleChange("date", e.target.value)}
                  className="w-full px-4 py-2 rounded-md dark:text-white border-amber-50 bg-blue-50"
                  required
                />

                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-purple-600 text-white text-lg font-semibold transition duration-150"
                >
                  Add Expense
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddExpenseModal;
