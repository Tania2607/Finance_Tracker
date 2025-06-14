import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import DashboardPage from './pages/Dashboard';
import AddTransactionPage from './pages/AddTransaction';
import ReportsPage from './pages/Reports';
import HistoryPage from './pages/History';
import ProfilePage from './pages/Profile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';

// Route protection wrapper
function RequireAuth({ children }) {
  const location = useLocation();
  const isLoggedIn = !!localStorage.getItem('User');
  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  // Render Layout on all protected pages
  return <Layout>{children}</Layout>;
}

function App() {
  return (
    <>
      <div><Toaster /></div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* Protected routes with Layout */}
        <Route path="/dashboard" element={<RequireAuth><DashboardPage /></RequireAuth>} />
        <Route path="/add" element={<RequireAuth><AddTransactionPage /></RequireAuth>} />
        <Route path="/reports" element={<RequireAuth><ReportsPage /></RequireAuth>} />
        <Route path="/history" element={<RequireAuth><HistoryPage /></RequireAuth>} />
        <Route path="/profile" element={<RequireAuth><ProfilePage /></RequireAuth>} />
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </>
  );
}

export default App;
