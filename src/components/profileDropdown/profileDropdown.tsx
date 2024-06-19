import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './profileDropdown.css'; // Import the CSS file

const ProfileDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data from the backend API
    fetch('/api/user')
      .then(response => response.json())
      .then(data => {
        if (data && data.email) {
          setEmail(data.email);
        }
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // Call the backend API to log out
    fetch('/api/logout', { method: 'POST' })
      .then(() => {
        navigate('/login');
      })
      .catch(error => {
        console.error('Error logging out:', error);
      });
  };

  return (
    <div className="profile-dropdown">
      <button onClick={toggleDropdown} className="profile-button">
        {email ? email : 'Profile'}
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          <button onClick={() => navigate('/settings')}>Settings</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;