import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Nav.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faMoon, faSun, faXmark } from "@fortawesome/free-solid-svg-icons";
import AppButton from "./AppButton";
import { useAuth } from "../contexts/AuthContexts";


const Nav = ({ darkMode, toggleDarkMode }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);


  const handleSignUp = () => {
    navigate("/signup");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="navbar">
      <div className="nav-header">
        <Link to="/" className="logo">
          LUMÉ
        </Link>
      </div>

      <nav className={`nav-links${menuOpen ? " menu-open" : ""}`}>
        <Link to="/" onClick={closeMenu}>Home</Link>
        <Link to="/about" onClick={closeMenu}>About</Link>
        <Link to="/product" onClick={closeMenu}>Shop</Link>
        <Link to="/createproduct" onClick={closeMenu}>Create Product</Link>

        <a href="#" onClick={closeMenu}>Blog</a>
        <button type="button" className="mobile-theme-button" onClick={toggleDarkMode}>
          <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
          <span>Change theme</span>
        </button>
        {user && (
          <button type="button" className="mobile-logout-button" onClick={() => { logout(); closeMenu(); }}>
            Logout
          </button>
        )}
      </nav>

      <div className="nav-buttons">

        <button onClick={toggleDarkMode} className="theme-btn">
          <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
        </button>
{/* 
        <button className="cart-btn">
          🛒 Cart
        </button> */}

        {user ? (
          <div className="user-menu">
            <button className="user-profile-button" onClick={() => navigate("/profile")}>
              <span className="user-avatar">
                {user.profile_image ? (
                  <img src={user.profile_image} alt="" />
                ) : (
                  user.firstname?.charAt(0).toUpperCase()
                )}
              </span>
              <span>Welcome, {user.firstname}</span>
            </button>
          </div>
        ) : (
          <>
            <AppButton text="Login" textColor="blue" bgColor="white" useBorder="5px" handleClick={handleLogin} />
            <AppButton text="Signup" bgColor="blue" textColor="white" useBorder="5px" handleClick={handleSignUp} />
          </>
        )}

      </div>

      <button
        type="button"
        className="menu-toggle"
        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((isOpen) => !isOpen)}
      >
        <FontAwesomeIcon icon={menuOpen ? faXmark : faBars} />
      </button>
    </header>
  );
};

export default Nav;