import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import LoadingSpinner from "../../components/LoadingSpinner";
import ExpenseOverview from "../../Expense/ExpenseOverview";
import ExpenseList from "../../Expense/ExpenseList";
import AddExpenseModal from "../../Modal/AddExpenseModal";
import DeleteAlert from "../../Modal/DeleteAlert";

import { expenseApi } from "../../Api/Api.Expense";
import { useAuthStore } from "../../Api/Api.Auth";
import { useUserAuth } from "../../hooks/useUserAuth";
import toast from "react-hot-toast";

const Expense = () => {
  useUserAuth();
  const [expenseData, setExpenseData] = useState([]);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    id: null,
  });
  const { isLoading, setIsLoading } = useAuthStore();

  const fetchExpense = async () => {
    setIsLoading(true);
    try {
      const res = await expenseApi.getAllExpense();
      setExpenseData(res?.message || []);
    } catch {
      toast.error("Error fetching Expenses");
    } finally {
      setIsLoading(false);
    }
  };
  const handleAddExpense = async ({ icon, category, amount, date }) => {
    try {
      const res = await expenseApi.addExpense(icon, category, amount, date);
  
     
      if (res?.success && res?.newExpense) {
        setExpenseData((prev) => [...prev, res.newExpense]);
        toast.success("Expense added!");
        setOpenAddModal(false);
      } else {
        toast.error(res?.message || "Unexpected response from server.");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message || "Error adding expense");
    }
  };

  const handleDeleteExpense = async (id) => {
    setIsLoading(true);
    try {
      await expenseApi.deleteExpense(id);
      setExpenseData((prev) => prev.filter((item) => item._id !== id));
      toast.success("Expense deleted!");
    } catch {
      toast.error("Failed to delete expense");
    } finally {
      setOpenDeleteAlert({ show: false, id: null });
      setIsLoading(false);
    }
  };
  const handleDownloadExpense = async () => {
    setIsLoading(true);
    try {
      const res = await expenseApi.fileDownloadExpense();
  
      const blob = new Blob([res.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
  
      const blobUrl = window.URL.createObjectURL(blob);
  
      const link = document.createElement("a");
      link.href = blobUrl;
      link.setAttribute("download", "Expense_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(blobUrl);
  
      toast.success("Download started!");
    } catch (err) {
      toast.error("Download failed:", err);
      
    } finally {
      setIsLoading(false);
    }
  };
  

  useEffect(() => {
    fetchExpense();
  }, []);

  return (
    <DashboardLayout activeMenu="Expense">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="my-5 mx-auto grid gap-6">
          <ExpenseOverview
            transactions={expenseData}
            onAddExpense={() => setOpenAddModal(true)}
          />
          <ExpenseList
            transactions={expenseData}
            onDelete={(id) => setOpenDeleteAlert({ show: true, id })}
            onDownload={handleDownloadExpense}
          />

          <AddExpenseModal
            isOpen={openAddModal}
            onClose={() => setOpenAddModal(false)}
            onAddExpense={handleAddExpense}
          />

          <AddExpenseModal
            isOpen={openDeleteAlert.show}
            onClose={() => setOpenDeleteAlert({ show: false, id: null })}
            title="Delete Expense"
          >
            <DeleteAlert
              content="Are you sure you want to delete this Expense?"
              onDelete={() => handleDeleteExpense(openDeleteAlert.id)}
            />
          </AddExpenseModal>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Expense;
