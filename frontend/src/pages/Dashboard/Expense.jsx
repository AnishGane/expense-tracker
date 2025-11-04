import React, { useEffect, useState } from 'react';
import { useUserAuth } from '../../hooks/useUserAuth';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import toast from 'react-hot-toast';
import DashboardLayout from '../../components/Layouts/DashboardLayout';
import ExpenseOverview from '../../components/Expense/ExpenseOverview';
import Modal from '../../components/Modal';
import AddExpenseForm from '../../components/Expense/AddExpenseForm';
import DeleteAlert from '../../components/DeleteAlert';
import ExpenseList from '../../components/Expense/ExpenseList';

const Expense = () => {
  useUserAuth();

  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  // Get All Expense Details
  const fetchExpenseDetails = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(`${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`);

      if (response.data) {
        setExpenseData(response.data);
      }
    } catch (error) {
      console.error(
        'Error fetching expense details:',
        error.response?.data?.message || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle Expense Add
  const handleAddExpense = async (expense) => {
    const { category, icon, amount, date } = expense;

    // validation check
    if (!category.trim()) {
      toast.error('Category is required');
      return;
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error('Amount is invalid and must be greater than $0.00');
      return;
    }

    if (!date) {
      toast.error('Date is required');
      return;
    }

    try {
      await axiosInstance.post(`${API_PATHS.EXPENSE.ADD_EXPENSE}`, {
        category,
        icon,
        amount,
        date,
      });

      setOpenAddExpenseModal(false);
      // Re-fetch expense list
      fetchExpenseDetails();
      toast.success('Expense added successfully');
    } catch (error) {
      console.error('Error adding expense', error.response?.data?.message || error.message);
      toast.error('Error adding expense');
    }
  };

  // Delete Expense
  const handleDeleteExpense = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));

      setOpenDeleteAlert({ show: false, data: null });
      setExpenseData((prev) => prev.filter((item) => item._id !== id));

      // Re-fetch expense list
      fetchExpenseDetails();
      toast.success('Expense deleted successfully');
    } catch (error) {
      console.error('Error deleting expense', error.response?.data?.message || error.message);
      toast.error('Error deleting expense');
    }
  };

  // Download Expense Details
  const handleDownloadExpenseDetails = async () => {
    try {
      const response = await axiosInstance.get(`${API_PATHS.EXPENSE.DOWNLOAD_EXPENSE}`, {
        responseType: 'blob',
      });

      // Create a URL for the blob
      const url = window.URL.createObjectURL(response.data);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'expense_details.xlsx');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading expense details', error);
      toast.error('Error downloading expense details');
    }
  };

  // handle download expense details pdf
  const handleDownloadExpensePDF = async () => {
    try {
      const response = await axiosInstance.get(`${API_PATHS.EXPENSE.DOWNLOAD_EXPENSE_PDF}`, {
        responseType: 'blob',
      });

      // Validate response before creating blob
      if (!response.data) {
        alert('No data received from server!');
        return;
      }

      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Expense_Report.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading expense PDF:', error);
      alert(error.response?.data?.message || 'Error downloading PDF');
    }
  };

  useEffect(() => {
    fetchExpenseDetails();

    return () => {};
  }, []);

  return (
    <DashboardLayout activeMenu="Expense">
      <div className="mx-auto my-5">
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <ExpenseOverview
              transactions={expenseData}
              onAddExpense={() => setOpenAddExpenseModal(true)}
            />
          </div>

          <ExpenseList
            transactions={expenseData}
            onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
            onDownload={handleDownloadExpenseDetails}
            onPDFDownload={handleDownloadExpensePDF}
          />
        </div>

        <Modal
          isOpen={openAddExpenseModal}
          onClose={() => setOpenAddExpenseModal(false)}
          title="Add Expense"
        >
          <AddExpenseForm onAddExpense={handleAddExpense} />
        </Modal>

        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Expense"
        >
          <DeleteAlert
            content="Are you sure you want to delete this expense?"
            onDelete={() => handleDeleteExpense(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Expense;
