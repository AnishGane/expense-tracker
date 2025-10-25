import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import toast from 'react-hot-toast';
import { useUserAuth } from '../../hooks/useUserAuth';
import DashboardLayout from '../../components/Layouts/DashboardLayout';
import InsightOverview from '../../components/Insight/InsightOverview';

const Insight = () => {
  useUserAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchInsight = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.INSIGHT.GET_EXPENSE_INSIGHT);
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
  }, []);

  if (!data) return <div className="min-h-screen w-full text-center">Loading...</div>;

  return (
    <DashboardLayout activeMenu="ExpenseForecast">
      <div className="mx-auto my-5">
        <InsightOverview data={data} />
      </div>
    </DashboardLayout>
  );
};

export default Insight;
