import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiLock, FiEye, FiEyeOff, FiLogIn } from 'react-icons/fi';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Try to connect to backend first
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('user', JSON.stringify(data.user));
          localStorage.setItem('token', data.token);
          navigate('/dashboard');
          return;
        } else {
          setError(data.message || 'Login failed');
        }
      } else {
        throw new Error('Backend not available');
      }
    } catch (error) {
      console.error('Login error:', error);
      
      // Fallback to local authentication if backend is not available
      if (formData.username === 'ujwal' && formData.password === 'railway2025') {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('user', JSON.stringify({
          username: formData.username,
          role: 'Railway Administrator',
          name: 'Ujwal Admin',
          id: 1,
          permissions: ['dashboard', 'analytics', 'data-management', 'kpi-input', 'audit-trails', 'users', 'settings']
        }));
        localStorage.setItem('token', 'mock-jwt-token-' + Date.now());
        navigate('/dashboard');
      } else {
        setError('Invalid username or password');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <div className="logo">
            <div className="logo-icon">🚂</div>
            <h1>Ujwal Portal</h1>
          </div>
          <p>Indian Railways Performance Management System</p>
        </div>

        <div className="login-form-container">
          <div className="login-form-header">
            <h2>Welcome Back</h2>
            <p>Sign in to access the Ujwal Portal</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="username">Username</label>
              <div className="input-container">
                <FiUser className="input-icon" />
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Enter your username"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-container">
                <FiLock className="input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <div className="form-options">
              <label className="checkbox-container">
                <input type="checkbox" />
                <span className="checkmark"></span>
                Remember me
              </label>
              <a href="#" className="forgot-password">Forgot Password?</a>
            </div>

            <button
              type="submit"
              className="login-button"
              disabled={loading}
            >
              {loading ? (
                <div className="loading-spinner"></div>
              ) : (
                <>
                  <FiLogIn />
                  Sign In
                </>
              )}
            </button>
          </form>

          <div className="demo-credentials">
            <h4>Demo Credentials</h4>
            <p><strong>Username:</strong> ujwal</p>
            <p><strong>Password:</strong> railway2025</p>
          </div>
        </div>

        <div className="login-footer">
          <p>&copy; 2025 Indian Railways - Gati-Rakshak Project</p>
        </div>
      </div>

      <div className="login-background">
        <div className="railway-pattern">
          <div className="track-lines">
            <div className="track-line"></div>
            <div className="track-line"></div>
            <div className="track-line"></div>
          </div>
          <div className="moving-trains">
            <div className="train train-1">🚂</div>
            <div className="train train-2">🚂</div>
            <div className="train train-3">🚂</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
