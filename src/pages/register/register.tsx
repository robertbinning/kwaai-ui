import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './register.css'; // Import the CSS file for styling

const Register = () => {
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState(''); // Add state for user type
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:8000/register', {
        email,
        user_type: userType, // Include user_type in the payload
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
      <div className="input-container">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="register-input"
        />
        <select
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
          className="register-input"
        >
          <option value="" disabled>Select User Type</option>
          <option value="faculty">Faculty</option>
          <option value="student">Student</option>
        </select>
        <button onClick={handleRegister} className="register-button">Register</button>
      </div>
      {message && <p className="register-message">{message}</p>}
      <p className="login-link">
        Already have an account? <a href="/login">Login here</a>
      </p>
    </div>
  );
};

export default Register;
