import React from 'react';

const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 24,
        width: 360,
        maxWidth: '90%',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
        animation: 'fadeIn 0.3s ease-out'
      }}>
        <h3 style={{ 
          margin: '0 0 16px 0',
          color: '#2a5dba',
          fontSize: 20,
          fontWeight: 600
        }}>
          {title || 'Confirm Action'}
        </h3>
        
        <p style={{ 
          margin: '0 0 24px 0',
          color: '#444',
          fontSize: 16,
          lineHeight: 1.5
        }}>
          {message || 'Are you sure you want to proceed?'}
        </p>
        
        <div style={{ 
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 12
        }}>
          <button
            onClick={onClose}
            style={{
              padding: '10px 16px',
              background: '#f2f2f2',
              color: '#444',
              border: 'none',
              borderRadius: 6,
              fontWeight: 500,
              fontSize: 14,
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}
          >
            Cancel
          </button>
          
          <button
            onClick={onConfirm}
            style={{
              padding: '10px 16px',
              background: '#e05a3c',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              fontWeight: 600,
              fontSize: 14,
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}
          >
            Logout
          </button>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default ConfirmDialog;
