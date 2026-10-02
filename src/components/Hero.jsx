import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./Hero.css";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <>
    
          <section className="hero">
            <div className="hero-content">
              <p className="hero-small-text">NEW COLLECTION 2026</p>
    
              <h1>
                Find Your
                <br />
                Perfect Style
              </h1>
    
              <p className="hero-description">
                Discover carefully selected pieces designed to bring style,
                comfort and confidence into your everyday life.
              </p>
    
              <button className="hero-btn" onClick={() => navigate('/product')}>Shop Now</button>
            </div>
    
            <div className="hero-image">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8"
                alt="Fashion store"
              />
            </div>
          </section>

    </>
  );
};

export default Hero