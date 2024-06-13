import React, { useState, FormEvent } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import '../register/register.css'; // Import the CSS file

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in:', userCredential.user);

      // Check if it's the user's first login
      const isFirstLogin = localStorage.getItem('isFirstLogin') === null;
      if (isFirstLogin) {
        localStorage.setItem('isFirstLogin', 'false');
        navigate('/list'); // Navigate to the Agent Catalogue page on first login
      } else {
        navigate('/home'); // Navigate to the dashboard page on subsequent logins
      }
    } catch (error: any) {
      console.error('Error logging in:', error.message); // Log the error message
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
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
          <button type="submit">Login</button>
        </form>
        <div className="register-links">
          <span>Need an account? <button onClick={() => navigate('/register')} className="link-button">Register</button></span>
        </div>
      </div>
      <div className="register-welcome">
        <h2>Welcome back! Login here!</h2>
      </div>
    </div>
  );
}

export default Login;
