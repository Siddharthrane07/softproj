import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { User, LogOut, FolderKanban } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {

  const navigate = useNavigate();
  const location = useLocation();


  const handleLogout = () => {
    console.log("Logging out...");
    navigate('/login');
  };



  return (

    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/dashboard" className="navbar-logo">
          <FolderKanban size={24} />
          <span>Project Manage</span>
        </Link>
        
        <div className="navbar-actions">
          <button className="navbar-btn">
            <User size={16} />
            <span>Profile</span>
          </button>
          <button className="navbar-btn logout" onClick={handleLogout}>
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
