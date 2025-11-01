import React, { useContext, useEffect } from 'react';
import DashboardLayout from '../../components/Layouts/DashboardLayout';
import { UserContext } from '../../context/UserContext';
import InsightOverview from '../../components/Insights/InsightOverview';
import SmartInsightsChart from '../../components/Cards/SmartInsightsChart';

const Insights = () => {
  const { insightData, fetchInsightData } = useContext(UserContext);

  useEffect(() => {
    fetchInsightData();
  }, []);

  return (
    <DashboardLayout activeMenu="Insights">
      <div className="mx-auto my-5">
        <div className="grid grid-cols-1 gap-6">
          <div className="card flex flex-col space-y-4">
            <div className="mb-6">
              <h5 className="text-lg">Insights Overview</h5>
              <p className="text-xs text-gray-500">
                Get a quick overview of your spending, you can see your spending change, top
                category, average expense, and max expense of the current month.
              </p>
            </div>
            <InsightOverview data={insightData} />
          </div>
          <div className="card">
            <div className="mb-12">
              <h5 className="text-lg">Expense Insights & Trends</h5>
              <p className="text-xs text-gray-500">
                Intuitive chart showing your monthly spending patterns and trends.
              </p>
            </div>
            <SmartInsightsChart />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Insights;
