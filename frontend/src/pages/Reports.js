import React, { useEffect, useState } from 'react';
import { PieChart, BarChart } from '../components/Chartss';
import { getUserEntries } from '../utils/renders';
import './Reports.css';

export default function ReportsPage() {
  const [entries, setEntries] = useState([]);
  const user = JSON.parse(localStorage.getItem('User'));

  useEffect(() => {
    async function fetchData() {
      if (!user?._id) return;
      setEntries(await getUserEntries(user._id));
    }
    fetchData();
  }, [user?._id]);

  return (
    <div className="reports-root reports-centered">
      <h2>Reports</h2>
      <div className="reports-charts-wrapper">
        <div className="pie-chart-container">
          <h3>Expense Distribution</h3>
          <PieChart entries={entries} />
        </div>
        <div className="bar-chart-container">
          <h3>Monthly Income vs Expense</h3>
          <BarChart entries={entries} />
        </div>
      </div>
    </div>
  );
} 