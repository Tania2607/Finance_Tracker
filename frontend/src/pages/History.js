import React, { useEffect, useState } from 'react';
import { getUserEntries } from '../utils/renders';
import './History.css';

export default function HistoryPage() {
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
    <div className="history-root">
      <h2>Transaction History</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Category</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {entries.map(e => (
            <tr key={e._id} className={e.type === 'income' ? 'income-row' : 'expense-row'}>
              <td>{e.date}</td>
              <td>{e.type}</td>
              <td>{e.category}</td>
              <td>{e.type === 'income' ? '+' : '-'}₹{e.amount}</td>
            </tr>
          ))}
          {entries.length === 0 && <tr><td colSpan={4}>No transactions yet.</td></tr>}
        </tbody>
      </table>
    </div>
  );
} 