import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import './profileDropdown.css'; // Import the CSS file

const ProfileDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setEmail(user.email);
    }
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    auth.signOut().then(() => {
      navigate('/login');
    }).catch((error) => {
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