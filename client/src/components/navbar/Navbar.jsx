import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, User, FolderKanban } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  const [scrollClass, setScrollClass] = useState("top");

  const handleLogout = () => {
    console.log("Logging out...");
    navigate('/login');
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setScrollY(currentScroll);
      setScrollClass(currentScroll > 40 ? "scrolled" : "top");
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrollClass}`}>
      <div className="navbar-bubble left">
        <Link to="/dashboard" className="navbar-logo">
          <FolderKanban size={20} />
          Project Manage
        </Link>
      </div>
      <div className="navbar-bubble right">
        <button className="navbar-btn">
          <User size={16} /> Profile
        </button>
        <button className="navbar-btn logout" onClick={handleLogout}>
          <LogOut size={16} /> Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
