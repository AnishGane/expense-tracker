import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import toast from 'react-hot-toast';
import { useUserAuth } from '../../hooks/useUserAuth';
import DashboardLayout from '../../components/Layouts/DashboardLayout';
import ExpenseOverview from '../../components/ExpenseForecast/ExpenseOverview';

const ExpenseForecast = () => {
  useUserAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchInsight = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.EXPENSE_FORECAST.GET_EXPENSE_FORECAST);
      if (response.data) {
        setData(response.data);
      }
    } catch (error) {
      console.error(
        'Error fetching expense details:',
        error.response?.data?.message || error.message
      );
      toast.error('Error fetching expense details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInsight();
    return () => {};
  }, []);

  return (
    <DashboardLayout activeMenu="ExpenseForecast">
      <div className="mx-auto my-5">
        {data ? (
          <ExpenseOverview data={data} />
        ) : (
          <div className="py-10 text-center text-gray-500">Loading expenseForecast data...</div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ExpenseForecast;
