import { Link } from "react-router-dom";
import { useState } from "react";

function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="nav__header">
        <nav className="navbar">
          {/* Logo */}
          <Link to="/">
            <img
              className="nav__logo"
              src="/assets/MSLogo Black.jpg"
              alt="Logo"
            />
          </Link>

          {/* Desktop Links */}
          <div className="nav__links">
            <Link to="/" className="link link__hover-effect">
              Home
            </Link>
            <Link to="/search" className="link link__hover-effect">
              Player Search
            </Link>
            <Link to="/team" className="link link__hover-effect">
              Team
            </Link>
            <a
              href="mailto:mesem24@gmail.com"
              className="link link__hover-effect"
            >
              Contact
            </a>
          </div>

          {/* Hamburger Button */}
          <button
            className="hamburger"
            onClick={() => setMenuOpen(true)}
          >
            ☰
          </button>
        </nav>
      </header>

      {/* Mobile Modal Menu */}
      {menuOpen && (
        <div
          className="mobile-menu-overlay"
          onClick={() => setMenuOpen(false)}
        >
          <div
            className="mobile-menu"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              className="close-menu"
              onClick={() => setMenuOpen(false)}
            >
              ✕
            </button>

            {/* Mobile Links */}
            <Link to="/" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
            <Link to="/search" onClick={() => setMenuOpen(false)}>
              Player Search
            </Link>
            <Link to="/team" onClick={() => setMenuOpen(false)}>
              Team
            </Link>
            <a
              href="mailto:mesem24@gmail.com"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </>
  );
}

export default Nav;





