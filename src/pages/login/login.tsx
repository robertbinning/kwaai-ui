import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './login.css'; // Import the CSS file for styling

const Login = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8000/login', {
        email,
      });
      setMessage(response.data.message);
      if (response.data.user_type) {
        login();
        if (response.data.user_type === 'faculty') {
          navigate('/list');
        } else if (response.data.user_type === 'student') {
          navigate('/dashboard');
        }
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setMessage('Login failed');
    }
  };

  return (
    <div className="login-container">
      <img src="/src/assets/kwaai.png" alt="Kwaai Logo" className="logo" />
      <h2>Login</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="login-input"
      />
      <button onClick={handleLogin} className="login-button">Login</button>
      {message && <p className="login-message">{message}</p>}
      <p className="register-link">
        Don't have an account? <a href="/register">Register here</a>
      </p>
    </div>
  );
};

export default Login;
