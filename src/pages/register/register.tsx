import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './register.css'; // Import the CSS file for styling

const Register = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:8000/register', {
        email,
      });
      setMessage(response.data.message);
      if (response.data.success) {
        navigate('/login');
      }
    } catch (error) {
      console.error('Error registering:', error);
      setMessage('Registration failed');
    }
  };

  return (
    <div className="register-container">
      <img src="/src/assets/kwaai.png" alt="Kwaai Logo" className="logo" />
      <h2>Register</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="register-input"
      />
      <button onClick={handleRegister} className="register-button">Register</button>
      {message && <p className="register-message">{message}</p>}
      <p className="login-link">
        Already have an account? <a href="/login">Login here</a>
      </p>
    </div>
  );
};

export default Register;
