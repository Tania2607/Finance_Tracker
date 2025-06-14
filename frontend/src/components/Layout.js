import React from 'react';
import Sidebar from './Sidebar';

export default function Layout({ children }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100vw', background: '#f4f6fa' }}>
      <Sidebar />
      <div style={{ flex: 1, marginLeft: 220, padding: '36px 5vw', minHeight: '100vh', overflowY: 'auto' }}>
        {children}
      </div>
    </div>
  );
} 