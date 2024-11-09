import React, { useState } from 'react';
import './Sidebar.css';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import LogoutPopup from '../LogoutPopup';

const Sidebar = ({ activeSection, setActiveSection }) => {
  const navigate = useNavigate();
  const [isPopupVisible, setPopupVisible] = useState(false);

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log('User logged out');
        localStorage.removeItem('authToken'); // Clear the token from localStorage
        navigate('/login'); // Redirect to the login page
      })
      .catch((error) => {
        console.error('Error logging out: ', error);
      });
  };

  const handleLogoutClick = () => {
    setPopupVisible(true);
  };

  const handleCancelLogout = () => {
    setPopupVisible(false);
  };

  return (
    <>
      <div className="sidebar">
        <h2 className='ps-news'>PS NEWS</h2>
        <ul>
          <li
            onClick={() => setActiveSection('users')}
            className={activeSection === 'users' ? 'active' : ''}
          >
            Users
          </li>
          <li
            onClick={() => setActiveSection('groups')}
            className={activeSection === 'groups' ? 'active' : ''}
          >
            Groups
          </li>
          <li
            onClick={() => setActiveSection('reports')}
            className={activeSection === 'reports' ? 'active' : ''}
          >
            Reports
          </li>
        </ul>
        <button className="logout-button" onClick={handleLogoutClick}>
          Logout
        </button>
        <LogoutPopup
          isOpen={isPopupVisible}
          onConfirm={handleLogout}
          onCancel={handleCancelLogout}
        />
      </div>

      <div className="navbar">
        <h2>PS NEWS</h2>
        <ul>
          <li
            onClick={() => setActiveSection('users')}
            className={activeSection === 'users' ? 'active' : ''}
          >
            Users
          </li>
          <li
            onClick={() => setActiveSection('groups')}
            className={activeSection === 'groups' ? 'active' : ''}
          >
            Groups
          </li>
          <li
            onClick={() => setActiveSection('reports')}
            className={activeSection === 'reports' ? 'active' : ''}
          >
            Reports
          </li>
        </ul>
        <button className="logout-button" onClick={handleLogoutClick}>
          Logout
        </button>
      </div>
    </>
  );
};

export default Sidebar;
