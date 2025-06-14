import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmDialog from '../components/ConfirmDialog';
import './AddTransaction.css';

export default function ProfilePage() {
  const navigate = useNavigate();
  const userFromStorage = localStorage.getItem('User');
  const user = userFromStorage ? JSON.parse(userFromStorage) : {};

  // Sample user data - supplement with actual user data
  const userData = {
    userId: user?._id || 'U123456',
    username: user?.username || 'user' + Math.floor(Math.random() * 1000),
    email: user?.email || 'user@example.com',
    name: user?.name || 'User',
    lastLogin: user?.lastLogin || new Date().toISOString().split('T')[0],
    accountCreated: user?.createdAt || '2025-01-01'
  };

  // State for logout confirmation dialog
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // Handler to show the logout confirmation dialog
  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  // Handler for confirming logout
  const handleLogoutConfirm = () => {
    localStorage.removeItem('User');
    navigate('/login');
  };

  // Handler for canceling logout
  const handleLogoutCancel = () => {
    setShowLogoutConfirm(false);
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        {/* Logout button positioned at top-right */}
        <div className="logout-section">
          <button className="logout-btn" onClick={handleLogoutClick}>Logout</button>
        </div>
        
        {/* Enhanced profile header with avatar */}
        <div className="profile-header">
          <div className="profile-avatar">
            <span>{userData.name.charAt(0).toUpperCase()}</span>
          </div>
          <div className="profile-info">
            <h2 className="profile-name">{userData.name}</h2>
            <p className="profile-username">@{userData.username}</p>
            <p className="profile-email">{userData.email}</p>
            <div className="profile-account-info">
              <span>📅 Account Created: {userData.accountCreated}</span>
              <span>🕒 Last Login: {userData.lastLogin}</span>
            </div>
          </div>
        </div>

        {/* Account information section */}
        <div className="profile-sections">
          <div className="profile-section">
            <h3 className="section-title">👤 Account Information</h3>
            <div className="profile-item">
              <div className="profile-label">User ID</div>
              <div className="profile-value">{userData.userId}</div>
            </div>
            <div className="profile-item">
              <div className="profile-label">Username</div>
              <div className="profile-value">@{userData.username}</div>
            </div>
            <div className="profile-item">
              <div className="profile-label">Email Address</div>
              <div className="profile-value">{userData.email}</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Custom Logout Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showLogoutConfirm}
        onClose={handleLogoutCancel}
        onConfirm={handleLogoutConfirm}
        title="Confirm Logout"
        message="Are you sure you want to logout from your account?"
      />
    </div>
  );
}