import React, { useContext } from "react";
import { motion } from "framer-motion";
import {
  LuLayoutDashboard,
  LuWalletMinimal,
  LuLogOut,
  LuHandCoins,
} from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import { AUTH_URL } from "../../Api/Api.Auth";

const menuItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <LuLayoutDashboard className="text-xl" />,
  },
  {
    name: "Incomes",
    path: "/income",
    icon: <LuWalletMinimal className="text-xl" />,
  },
  {
    name: "Expenses",
    path: "/expense",
    icon: <LuHandCoins className="text-xl" />,
  },
];

const sidebarVariants = {
  hidden: { x: "-100%" },
  visible: { x: 0 },
  exit: { x: "-100%" },
};

const SideMenu = ({ activeMenu, onClose }) => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(`${AUTH_URL}/logout`);
      clearUser?.();
      toast.success("Logout successfully");
      navigate("/login");
      onClose?.();
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  return (
    <motion.div
      className="fixed top-0 left-0 z-50 h-full w-64 bg-white dark:bg-gray-900 shadow-lg mt-12"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={sidebarVariants}
      transition={{ type: "tween", duration: 0.3 }}
    >
      <div className="mb-8 flex flex-col items-center">
        {user && (
          <div className="flex flex-col items-center gap-2 mt-6">
            {user.imageUrl ? (
              <img
                src={user.imageUrl}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover border border-gray-300 shadow-sm"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold shadow-sm">
                {user?.Name
                  ? user.Name.split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()
                  : "M"}
              </div>
            )}
            <h4 className="text-gray-900 dark:text-white font-medium text-base">
              {user?.Name || "User"}
            </h4>
          </div>
        )}
      </div>

      <nav className="space-y-4 px-2">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            onClick={onClose}
            className={`flex items-center gap-3 px-4 py-2 rounded transition ${
              activeMenu === item.name
                ? "bg-blue-100 text-blue-700 font-semibold"
                : "hover:bg-gray-100 text-gray-800 dark:text-gray-200"
            }`}
          >
            {item.icon}
            <span className="text-sm font-medium">{item.name}</span>
          </Link>
        ))}

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2 rounded hover:bg-red-100 text-red-500 w-full"
        >
          <LuLogOut className="text-xl" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </nav>
    </motion.div>
  );
};

export default SideMenu;
