import React, { useState } from 'react';
import { createEntry } from '../utils/renders';
import './AddTransaction.css';

// Category options for both types
const incomeCategories = [
  'Salary', 'Business', 'Investments', 'Gifts', 'Interest', 'Other Income'
];
const expenseCategories = [
  'Grocery', 'Rent', 'Utilities', 'Shopping', 'Travel', 'Food', 'Fun', 'Health', 'Education', 'Other Expense'
];

export default function AddTransactionPage() {
  // Tab state: 'income' or 'expense'
  const [tab, setTab] = useState('income');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [msg, setMsg] = useState('');
  const user = JSON.parse(localStorage.getItem('User'));

  // Handle form submit
  const handleSubmit = async e => {
    e.preventDefault();
    if (!amount || !category || !date) {
      setMsg('All fields required');
      return;
    }
    // Send only required fields
    const success = await createEntry({
      usersid: user._id,
      type: tab,
      amount: Number(amount),
      category,
      date
    });
    if (success) {
      setMsg('Transaction added!');
      setAmount(''); setCategory(''); setDate('');
    } else {
      setMsg('Transaction failed.');
    }
  };

  // Choose categories based on tab/type
  const categories = tab === 'income' ? incomeCategories : expenseCategories;
  const icon = tab === 'income' ? '💰' : '💸';
  const color = tab === 'income' ? '#1ca97c' : '#e05a3c';
  const bg = tab === 'income' ? '#d6f5e6' : '#ffe5d6';

  // Full screen, responsive layout with tabs for income/expense
  return (
    <div className="add-transaction-root">
      <h2>Add Transaction</h2>
      <div className="add-transaction-form">
        {/* Tabs for Income/Expense */}
        <div className="add-transaction-tabs">
          <button 
            onClick={() => setTab('income')} 
            className={`tab-button ${tab === 'income' ? 'active' : ''}`}
            style={{ background: tab === 'income' ? bg : '#f3f3f3', color: tab === 'income' ? color : '#222' }}
          >
            Income
          </button>
          <button 
            onClick={() => setTab('expense')} 
            className={`tab-button ${tab === 'expense' ? 'active' : ''}`}
            style={{ background: tab === 'expense' ? bg : '#f3f3f3', color: tab === 'expense' ? color : '#222' }}
          >
            Expense
          </button>
        </div>
        
        <div className="transaction-header" style={{ color, textAlign: 'center' }}>
          <div className="icon-container">
            <span className="icon" style={{ fontSize: 40 }}>{icon}</span>
          </div>
          <h2>Add {tab === 'income' ? 'Income' : 'Expense'}</h2>
        </div>

        <form onSubmit={handleSubmit} className="transaction-form">
          <div className="form-group">
            <label htmlFor="amount">Amount</label>
            <input 
              type="number" 
              id="amount"
              value={amount} 
              onChange={e => setAmount(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select 
              id="category"
              value={category} 
              onChange={e => setCategory(e.target.value)}
              className="form-control"
            >
              <option value="">-- Select Category --</option>
              {categories.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input 
              type="date" 
              id="date"
              value={date} 
              onChange={e => setDate(e.target.value)}
              className="form-control"
            />
          </div>
          <button type="submit" className="submit-btn">
            Add {tab === 'income' ? 'Income' : 'Expense'}
          </button>
          {msg && <div className={`message ${msg.includes('error') ? 'error-message' : 'success-message'}`}>
            {msg}
          </div>}
        </form>
      </div>
    </div>
  );
} 