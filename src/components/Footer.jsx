import React from 'react';
import "./Footer.css";

const Footer = () => {
  return (
    <>
    <footer className="footer">
        <div className="footer-content">

          <div className="footer-brand">
            <h2>LUMÉ</h2>
            <p>
              Discover timeless pieces designed to
              elevate your everyday style.
            </p>
          </div>

          <div className="footer-links">
            <h3>Quick Links</h3>
            <a href="#">Home</a>
            <a href="#">Shop</a>
            <a href="#">About</a>
            <a href="#">Contact</a>
          </div>

          <div className="footer-links">
            <h3>Customer Care</h3>
            <a href="#">FAQs</a>
            <a href="#">Shipping & Delivery</a>
            <a href="#">Returns</a>
            <a href="#">Privacy Policy</a>
          </div>

          <div className="footer-social">
            <h3>Follow Us</h3>
            <p>Instagram</p>
            <p>Facebook</p>
            <p>TikTok</p>
          </div>

        </div>

        <div className="footer-bottom">
          <p>© 2026 Lume. All rights reserved.</p>
        </div>
      </footer>
    </>
  )
}

export default Footer