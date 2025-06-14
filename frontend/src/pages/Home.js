import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Items from '../components/Items';
import { PieChart, BarChart } from '../components/Chartss';
import { getUserEntries, createEntry, getSummary } from '../utils/renders';
import NavBar from '../components/NavBar';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import LoadingBar from 'react-top-loading-bar';
// import { toast } from 'react-hot-toast';
import { createExpense, getUserExpenses } from '../utils/renders';
import { useRef } from 'react';

function Home() {
  const navigate = useNavigate();
  const [type, setType] = useState('expense');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [userdata, setUserdata] = useState(JSON.parse(localStorage.getItem('User')) || null);
  const [userEntries, setUserEntries] = useState([]);
  const [summary, setSummary] = useState({ totalIncome: 0, totalExpense: 0, balance: 0 });
  const ref = useRef(null);

  document.title = 'Home';

  useEffect(() => {
    if (!localStorage.getItem('User')) {
      navigate('/login');
      return;
    }
    const userData = JSON.parse(localStorage.getItem('User'));
    if (userData) {
      setUserdata(userData);
    }
  }, [navigate]);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        if (!userdata?._id) return;
        const data = await getUserEntries(userdata._id);
        setUserEntries(data || []);
        const summaryData = await getSummary(userdata._id);
        setSummary(summaryData);
      } catch (error) {
        setUserEntries([]);
        setSummary({ totalIncome: 0, totalExpense: 0, balance: 0 });
      }
    };
    if (userdata?._id) {
      fetchEntries();
    }
  }, [userdata?._id]);

  const handleCreate = async () => {
    if (!amount || !category || !date || !type || !title) return;
    const entryInfo = {
      usersid: userdata._id,
      category,
      date,
      amount,
      type,
      title
    };
    await createEntry(entryInfo);
  };

  return (
    <div className=' h-screen font-mont w-full  bg-zinc-900'>
      <LoadingBar color='orange' ref={ref}  ></LoadingBar>
      <NavBar data={userEntries}></NavBar>
      <h2>Dashboard</h2>
      <div className='summary'>
        <div>Total Income: <b style={{ color: 'green' }}>₹{summary.totalIncome}</b></div>
        <div>Total Expense: <b style={{ color: 'red' }}>₹{summary.totalExpense}</b></div>
        <div>Balance: <b>₹{summary.balance}</b></div>
      </div>
      <form onSubmit={e => { e.preventDefault(); handleCreate(); }} style={{ marginBottom: 16 }}>
        <select value={type} onChange={e => setType(e.target.value)}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
        <input placeholder="Amount" type="number" value={amount} onChange={e => setAmount(e.target.value)} />
        <input placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} />
        <input type="date" value={date} onChange={e => setDate(e.target.value)} />
        <button type="submit">Add</button>
      </form>
      <div style={{ display: 'flex', gap: 16 }}>
        <div style={{ flex: 1 }}>
          <h3>Incomes</h3>
          <Items entries={userEntries.filter(e => e.type === 'income')} type='income' />
        </div>
        <div style={{ flex: 1 }}>
          <h3>Expenses</h3>
          <Items entries={userEntries.filter(e => e.type === 'expense')} type='expense' />
        </div>
      </div>
      <div className="chart-container">
        <PieChart entries={userEntries} />
        <BarChart entries={userEntries} />
      </div>
    </div>
  );
}

export default Home;