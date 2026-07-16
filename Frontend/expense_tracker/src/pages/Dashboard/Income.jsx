import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import LoadingSpinner from "../../components/LoadingSpinner";
import IncomeOverview from "../../Incomes/IncomeOverview";
import { incomeApi } from "../../Api/Api.Income";
import { useAuthStore } from "../../Api/Api.Auth";
import toast from "react-hot-toast";
import AddIncomeModal from "../../Modal/AddIncomeModal";
import IncomeList from "../../Incomes/IncomeList";
import DeleteAlert from "../../Modal/DeleteAlert";
import { useUserAuth } from "../../hooks/useUserAuth";

const Income = () => {
  useUserAuth();
  const [incomeData, setIncomeData] = useState([]);
  const { isLoading, setIsLoading } = useAuthStore();
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    id: null,
  });

  const fetchIncomes = async () => {
    setIsLoading(true);

    try {
      const res = await incomeApi.getAllIncome();

      setIncomeData(res?.message || []);
    } catch (error) {
      toast.error("Error fetching income");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddIncome = async ({ icon, source, amount, date }) => {
    try {
      const res = await incomeApi.addIncome(icon, source, amount, date);

 
      if (res?.success && res?.newIncome) {
        setIncomeData((prev) => [...prev, res.newIncome]);
        toast.success("Income added!");
        setOpenAddModal(false);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "Error adding Income!"
      );
    }
  };

  const handleDeleteIncome = async (id) => {
    setIsLoading(true);
    try {
      await incomeApi.deleteIncome(id);
      setIncomeData((prev) => prev.filter((i) => i._id !== id));
      setOpenDeleteAlert({ show: false, id: null });
      toast.success("Income source deleted!");
      fetchIncomes();
    } catch (error) {
      toast.error("Failed to delete income");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadIncome = async () => {
    setIsLoading(true);
    try {
      const response = await incomeApi.fileDownloadIncome(); 

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Income_details.xlsx"); 
      document.body.appendChild(link);
      link.click();

     
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success("Download started!");
    } catch (error) {
      toast.error("Failed to download Income file");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchIncomes();
  }, []);

  return (
    <DashboardLayout activeMenu="Income">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="my-5 mx-auto grid gap-6">
          <IncomeOverview
            transactions={incomeData}
            onAddIncome={() => setOpenAddModal(true)}
          />
          <IncomeList
            transactions={incomeData}
            onDelete={(id) => setOpenDeleteAlert({ show: true, id })}
            onDownload={handleDownloadIncome}
          />

          <AddIncomeModal
            isOpen={openAddModal}
            onClose={() => setOpenAddModal(false)}
            title="Add Income"
            onAddIncome={handleAddIncome}
          />
          <AddIncomeModal
            isOpen={openDeleteAlert.show}
            onClose={() => setOpenDeleteAlert({ show: false, id: null })}
            title="Delete Income"
          >
            <DeleteAlert
              content="Are you sure you want to delete this income?"
              onDelete={() => handleDeleteIncome(openDeleteAlert.id)}
              onClose={() => setOpenDeleteAlert({ show: false, id: null })}
            />
          </AddIncomeModal>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Income;
