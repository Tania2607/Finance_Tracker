import React, { useEffect, useState, useRef } from 'react';
import { axiosClient } from '../utils/axiosClient';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import LoadingBar from 'react-top-loading-bar';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [msg, setMsg] = useState("");
  const ref = useRef(null);

  // Redirect if already logged in
  useEffect(() => {
    if (localStorage.getItem("User")) {
      navigate("/dashboard");
    }
  }, [navigate]);

  // Handle login form submit
  const submitForm = async (e) => {
    e.preventDefault();
    try {
      ref.current.staticStart();
      const response = await axiosClient.post('/auth/login', {
        email,
        password
      });
      if (response.data.status === 'error' || response.data.statusCode !== 201) {
        setMsg(response.data.message || 'Login failed');
        toast.error(response.data.message || 'Login failed');
        ref.current.complete();
        return;
      }
      toast.success("Successfully Logged In!");
      localStorage.setItem('User', JSON.stringify(response.data.message));
      ref.current.complete();
      navigate('/dashboard');
    } catch (error) {
      setMsg('Something went wrong.');
      toast.error('Something went wrong.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', width: '100vw', display: 'flex', fontFamily: 'Arial, Helvetica, sans-serif' }}>
      <LoadingBar color='orange' ref={ref} />
      {/* Left panel with logo/title */}
      <div style={{
        flex: 1,
        background: '#2a5dba',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        minWidth: 0
      }}>
        {/* Logo */}
        <div style={{
          fontSize: 54,
          fontWeight: 900,
          marginBottom: 18,
          letterSpacing: 2,
          textShadow: '0 2px 12px rgba(0,0,0,0.10)'
        }}>💸</div>
        <h1 style={{ fontSize: 38, fontWeight: 700, marginBottom: 10, letterSpacing: 2, color: '#fff', textAlign: 'center' }}>FinTrack</h1>
        <p style={{ fontSize: 18, opacity: 0.95, color: '#fff', textAlign: 'center', maxWidth: 320, marginBottom: 0, lineHeight: 1.5 }}>
          Track your income and expenses easily<br />
          <span style={{ fontSize: 15, opacity: 0.8 }}>Your personal finance dashboard</span>
        </p>
      </div>
      {/* Right panel with form */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f7fafd' }}>
        <div style={{ background: '#fff', padding: 36, borderRadius: 12, boxShadow: '0 2px 16px #e3e3e3', minWidth: 320, width: 340 }}>
          <h2 style={{ textAlign: 'center', marginBottom: 24, color: '#2a5dba', fontWeight: 600 }}>Login</h2>
          <form onSubmit={submitForm} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <input placeholder='Email' type='email' value={email} onChange={e => setEmail(e.target.value)} style={{ padding: 12, fontSize: 16, borderRadius: 6, border: '1px solid #bcd' }} required />
            <div style={{ position: 'relative' }}>
              <input placeholder='Password' type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} style={{ padding: 12, fontSize: 16, borderRadius: 6, border: '1px solid #bcd', width: '100%' }} required />
              <span onClick={() => setShowPassword(v => !v)} style={{ position: 'absolute', right: 12, top: 13, cursor: 'pointer', color: '#2a5dba', fontSize: 14 }}>{showPassword ? 'Hide' : 'Show'}</span>
            </div>
            <button type='submit' style={{ padding: 12, fontSize: 16, background: '#2a5dba', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 600, marginTop: 8 }}>Login</button>
            {msg && <div style={{ color: 'red', textAlign: 'center', fontSize: 15 }}>{msg}</div>}
          </form>
          <div style={{ textAlign: 'center', marginTop: 18, fontSize: 15 }}>
            New user? <a href='/signup' style={{ color: '#2a5dba', fontWeight: 600 }}>Sign up</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;