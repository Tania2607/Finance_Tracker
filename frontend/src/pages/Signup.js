import React, { useEffect, useState, useRef } from 'react';
import { axiosClient } from '../utils/axiosClient';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const ref = useRef(null);

  // Redirect if already logged in
  useEffect(() => {
    if (localStorage.getItem("User")) {
      navigate("/dashboard");
    }
  }, [navigate]);

  // Handle signup form submit
  const submitForm = async (e) => {
    e.preventDefault();
    try {
      ref.current.staticStart();
      const response = await axiosClient.post('/auth/signup', {
        username,
        email,
        password
      });
      if (response.data.status === 'error' || response.data.statusCode !== 201) {
        setMsg(response.data.message || 'Signup failed');
        toast.error(response.data.message || 'Signup failed');
        ref.current.complete();
        return;
      }
      toast.success("Registered Successfully!");
      ref.current.complete();
      navigate('/login');
    } catch (error) {
      setMsg('Something went wrong.');
      toast.error('Something went wrong.');
    }
  };

  // --- CSS improvements: Arial font, centered, logo, border, soft background ---
  return (
    <div style={{ minHeight: '100vh', width: '100vw', background: '#f4f6fa', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Arial, Helvetica, sans-serif' }}>
      <LoadingBar color='orange' ref={ref} />
      <div style={{ background: '#fff', padding: 36, borderRadius: 10, boxShadow: '0 0 0 1px #e3e3e3', minWidth: 320, width: 350, border: '1px solid #e3e3e3', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Simple text logo */}
        <div style={{ fontWeight: 700, fontSize: 28, color: '#2a5dba', marginBottom: 8, letterSpacing: 1 }}>💸 FinTrack</div>
        <h2 style={{ textAlign: 'center', marginBottom: 24, color: '#222', fontWeight: 600 }}>Sign Up</h2>
        <form onSubmit={submitForm} style={{ display: 'flex', flexDirection: 'column', gap: 18, width: '100%' }}>
          <input placeholder='User Name' value={username} onChange={e => setUsername(e.target.value)} style={{ padding: 12, fontSize: 16, borderRadius: 6, border: '1px solid #bcd', background: '#f7fafd' }} required />
          <input placeholder='Email' type='email' value={email} onChange={e => setEmail(e.target.value)} style={{ padding: 12, fontSize: 16, borderRadius: 6, border: '1px solid #bcd', background: '#f7fafd' }} required />
          <div style={{ position: 'relative' }}>
            <input placeholder='Password' type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} style={{ padding: 12, fontSize: 16, borderRadius: 6, border: '1px solid #bcd', width: '100%', background: '#f7fafd' }} required />
            <span onClick={() => setShowPassword(v => !v)} style={{ position: 'absolute', right: 12, top: 13, cursor: 'pointer', color: '#2a5dba', fontSize: 14 }}>{showPassword ? 'Hide' : 'Show'}</span>
          </div>
          <button type='submit' style={{ padding: 12, fontSize: 16, background: '#2a5dba', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 600, marginTop: 8 }}>Sign Up</button>
          {msg && <div style={{ color: 'red', textAlign: 'center', fontSize: 15 }}>{msg}</div>}
        </form>
        <div style={{ textAlign: 'center', marginTop: 18, fontSize: 15 }}>
          Already registered? <a href='/login' style={{ color: '#2a5dba', fontWeight: 600 }}>Login</a>
        </div>
      </div>
    </div>
  );
}

export default Signup;