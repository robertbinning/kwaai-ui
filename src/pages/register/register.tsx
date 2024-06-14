import React, { useState, FormEvent } from "react";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import './register.css'; // Import the CSS file

const Register: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    setError(null); // Reset error message
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User registered:', userCredential.user);
      navigate('/login'); // Navigate to the login page upon successful registration
    } catch (error: any) {
      console.error('Error registering:', error.message); // Log the error message
      setError('Error registering: ' + error.message); // Set error message
    }
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2>Sign Up</h2>
        <form onSubmit={handleRegister}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your Password"
            required
          />
          <button type="submit">Sign Up</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
        <div className="register-links">
          <span>Already have an account? <button onClick={handleLogin} className="link-button">Sign In</button></span>
        </div>
      </div>
      <div className="register-welcome">
        <h2>Welcome! Join Us Today!</h2>
      </div>
    </div>
  );
}

export default Register;
