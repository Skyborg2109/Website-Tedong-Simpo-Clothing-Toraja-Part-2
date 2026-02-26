import React, { useState, useEffect } from 'react';
import { ShoppingCart, List, X, MapPin } from 'phosphor-react';
import { useCart } from '../context/CartContext.jsx';
import CartDrawer from './CartDrawer.jsx';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled glass' : ''}`}>
      <div className="nav-container">
        <div className="logo-container">
          <h1 className="logo-text">
            TEDONG SIMPO <span className="logo-accent">CLOTHING</span>
          </h1>
          <p className="logo-subtext">Store & Custom Production</p>
        </div>

        <ul className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
          <li><a href="/#home" onClick={() => setMobileMenuOpen(false)}>Home</a></li>
          <li><a href="/#collections" onClick={() => setMobileMenuOpen(false)}>Collections</a></li>
          <li><a href="/#custom" onClick={() => setMobileMenuOpen(false)}>Custom Production</a></li>
          <li><a href="/#about" onClick={() => setMobileMenuOpen(false)}>About Us</a></li>

          <div className="nav-actions-mobile">
            <div className="address-badge">
              <MapPin size={16} weight="fill" color="var(--color-red)" />
              <span>Rantepao, SulSel</span>
            </div>
          </div>
        </ul>

        <div className="nav-actions">
          <div className="address-badge desktop-only">
            <MapPin size={18} weight="fill" color="var(--color-red)" />
            <span>Rantepao</span>
          </div>
          <button className="cart-btn" onClick={() => setIsCartOpen(true)}>
            <ShoppingCart size={24} color="var(--color-gold)" />
            <span className="cart-count">{cartCount}</span>
          </button>
          <button className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={28} color="var(--color-gold)" /> : <List size={28} color="var(--color-gold)" />}
          </button>
        </div>
      </div>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </nav>
  );
};

export default Navbar;
