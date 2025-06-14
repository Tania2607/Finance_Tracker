import React, { useEffect, useState } from 'react';
import { getUserEntries, getSummary } from '../utils/renders';
import './Dashboard.css';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

export default function DashboardPage() {
  const [summary, setSummary] = useState({ totalIncome: 0, totalExpense: 0, balance: 0 });
  const [userEntries, setUserEntries] = useState([]);
  const user = JSON.parse(localStorage.getItem('User'));

  useEffect(() => {
    async function fetchData() {
      if (!user?._id) return;
      setUserEntries(await getUserEntries(user._id));
      setSummary(await getSummary(user._id));
    }
    fetchData();
  }, [user?._id]);

  return (
    <div className="dashboard-root">
      <h2 className="dashboard-title">Dashboard</h2>
      <div className="dashboard-summary-row">
        <div className="dashboard-summary-card balance">
          <h3>Total Balance</h3>
          <div className="dashboard-balance">₹{summary.balance}</div>
        </div>
        <div className="dashboard-summary-card income">
          <div>Total Income</div>
          <div className="dashboard-income">₹{summary.totalIncome}</div>
        </div>
        <div className="dashboard-summary-card expense">
          <div>Total Expense</div>
          <div className="dashboard-expense">₹{summary.totalExpense}</div>
        </div>
      </div>
      <div className="dashboard-quick-summary">
        {/* Recent Transactions */}
        <div className="recent-transactions">
          <h4>Recent Transactions</h4>
          <div className="transactions-grid">
            {userEntries.slice(0, 5).map((entry, index) => (
              <div key={entry._id} className={`transaction-item ${entry.type === 'income' ? 'income' : 'expense'}`}>
                <div className="transaction-icon">
                  {entry.type === 'income' ? '+' : '-'}
                </div>
                <div className="transaction-details">
                  <div className="transaction-title">{entry.title}</div>
                  <div className="transaction-category">{entry.category}</div>
                  <div className="transaction-date">{new Date(entry.date).toLocaleDateString('en-IN')}</div>
                </div>
                <div className="transaction-amount">₹{entry.amount}</div>
              </div>
            ))}
            {userEntries.length === 0 && (
              <div className="no-transactions">No recent transactions</div>
            )}
          </div>
        </div>

        {/* Weekly Trend Chart */}
        <div className="weekly-trend">
          <h4>Weekly Trend</h4>
          <div className="chart-container">
            <Line data={{
              labels: Array.from({ length: 7 }, (_, i) => new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN')),
              datasets: [{
                label: 'Income',
                data: Array(7).fill(0).map((_, i) => summary.totalIncome * (Math.random() * 0.2 + 0.8)),
                borderColor: '#1ca97c',
                tension: 0.4,
                fill: true,
                backgroundColor: 'rgba(28, 169, 124, 0.1)'
              }, {
                label: 'Expense',
                data: Array(7).fill(0).map((_, i) => summary.totalExpense * (Math.random() * 0.2 + 0.8)),
                borderColor: '#e05a3c',
                tension: 0.4,
                fill: true,
                backgroundColor: 'rgba(224, 90, 60, 0.1)'
              }]
            }} options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'top',
                },
                title: {
                  display: false,
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  grid: {
                    display: false
                  }
                },
                x: {
                  grid: {
                    display: false
                  }
                }
              }
            }} />
          </div>
        </div>
      </div>
    </div>
  );
}