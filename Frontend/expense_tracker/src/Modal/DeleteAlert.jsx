import React from "react";

const DeleteAlert = ({ content = "Are you sure?", onDelete, onClose }) => {
  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-700 dark:text-gray-300">{content}</p>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          type="button"
          className="px-4 py-2 text-sm bg-red-600 hover:bg-red-700 text-white rounded-md"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteAlert;
