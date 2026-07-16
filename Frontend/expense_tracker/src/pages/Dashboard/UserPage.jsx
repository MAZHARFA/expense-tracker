import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { addThounsandSeperater } from "../../Utils/data";
import InfoCard from "../../cards/InfoCard";
import RecentTranscation from "../../Transcations/RecentTranscation ";
import FinanceOverView from "../../Transcations/FinanceOverView";
import ExpenseTranscations from "../../Transcations/ExpenseTranscations";
import LastthirtyDaysOfExpenses from "../../Transcations/LastthirtyDaysOfExpenses";
import RecentIncomeWithChart from "../../Transcations/RecentIncomeWithChart";
import RecentIncome from "../../Transcations/RecentIncome";
import {
  LuHandCoins,
  LuWalletMinimal,
  LuLayoutDashboard,
} from "react-icons/lu";
import { IoMdCard } from "react-icons/io";
import { motion } from "framer-motion";
import { useAuthStore } from "../../Api/Api.Auth";
import LoadingSpinner from "../../components/LoadingSpinner";

const UserPage = () => {
  useUserAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const { isLoading, setIsLoading } = useAuthStore();

  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(import.meta.env.VITE_DASHBOARD_URL, {
        withCredentials: true,
      });
      if (response.data) {
        setUserData(response.data);
      }
    } catch (error) {
      console.error("Failed to load dashboard data.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <DashboardLayout activeMenu="Dashboard">
      {!userData || isLoading ? (
        <LoadingSpinner />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="px-4"
        >
          <div className="flex items-center justify-center gap-4 mt-10">
            <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
              <LuLayoutDashboard className="text-2xl" />
            </div>
            <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
          </div>

          <div className="my-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ scale: 1.03 }}
              >
                <InfoCard
                  icon={<IoMdCard />}
                  label="Total Balance"
                  currency="PKR"
                  value={addThounsandSeperater(userData.totalBalance)}
                  color="bg-blue-100 text-blue-700"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ scale: 1.03 }}
              >
                <InfoCard
                  icon={<LuWalletMinimal />}
                  label="Total Income"
                  currency="PKR"
                  value={addThounsandSeperater(userData.totalIncome)}
                  color="bg-green-100 text-green-700"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ scale: 1.03 }}
              >
                <InfoCard
                  icon={<LuHandCoins />}
                  label="Total Expense"
                  currency="PKR"
                  value={addThounsandSeperater(userData.totalExpense)}
                  color="bg-red-100 text-red-600"
                />
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <RecentTranscation
                transactions={userData?.recentTranscation} // fixed spelling
                onSeeMore={() => navigate("/expense")}
              />

              <FinanceOverView
                totalBalance={userData?.totalBalance || 0}
                totalIncome={userData?.totalIncome || 0}
                totalExpense={userData?.totalExpense || 0}
              />

              <ExpenseTranscations
                transcations={
                  userData?.transcationDataOfExpense?.transcations || []
                }
                onSeeMore={() => navigate("/expense")}
              />

              <LastthirtyDaysOfExpenses
                data={userData?.transcationDataOfExpense?.transcations}
              />
              <RecentIncomeWithChart
                data={
                  userData?.transcationDataOfIncome?.transcations?.slice(
                    0,
                    4
                  ) || []
                }
                totalIncome={userData?.totalIncome || 0}
              />
              <RecentIncome
                transcations={
                  userData?.transcationDataOfIncome?.transcations || []
                }
                onSeeMore={() => navigate("/income")}
              />
            </div>
          </div>
        </motion.div>
      )}
    </DashboardLayout>
  );
};

export default UserPage;
