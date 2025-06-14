import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmDialog from './ConfirmDialog';

const navLinks = [
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Add Transaction', path: '/add' },
  { label: 'Reports', path: '/reports' },
  { label: 'History', path: '/history' },
  { label: 'Profile', path: '/profile' },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const current = window.location.pathname;
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const handleLogoutConfirm = () => {
    localStorage.removeItem('User');
    navigate('/login');
  };

  const handleLogoutCancel = () => {
    setShowLogoutConfirm(false);
  };

  return (
    <div style={{
      width: 220,
      minHeight: '100vh',
      background: '#f4f6fa',
      borderRight: '1px solid #e3e3e3',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: 32,
      position: 'fixed',
      left: 0,
      top: 0,
      zIndex: 10
    }}>
      <div style={{ fontWeight: 700, fontSize: 26, color: '#2a5dba', marginBottom: 32, letterSpacing: 1 }}> FinTrack</div>
      <nav style={{ width: '100%' }}>
        {navLinks.map(link => (
          <div
            key={link.path}
            onClick={() => navigate(link.path)}
            style={{
              padding: '14px 32px',
              cursor: 'pointer',
              background: current === link.path ? '#e9f1ff' : 'none',
              color: current === link.path ? '#2a5dba' : '#222',
              fontWeight: current === link.path ? 700 : 500,
              borderLeft: current === link.path ? '4px solid #2a5dba' : '4px solid transparent',
              transition: 'background 0.2s',
              fontSize: 17
            }}
          >
            {link.label}
          </div>
        ))}
      </nav>
      <div style={{ flex: 1 }} />
      <button
        onClick={handleLogoutClick}
        style={{
          marginBottom: 32,
          padding: '12px 32px',
          background: '#e05a3c',
          color: '#fff',
          border: 'none',
          borderRadius: 6,
          fontWeight: 600,
          fontSize: 16,
          cursor: 'pointer',
          width: '80%'
        }}
      >
        Logout
      </button>
      
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