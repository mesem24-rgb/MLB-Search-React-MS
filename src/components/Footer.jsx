import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer__row">
          <figure>
            <img
              className="footer__logo--img"
              src="/assets/MSLogo Black.jpg"
              alt="Logo"
            />
          </figure>

          <div className="footer__social--list">
            <Link
              to="/"
              className="footer__social--link link__hover-effect"
            >
              Home
            </Link>

            <Link
              to="/search"
              className="footer__social--link link__hover-effect"
            >
              Player Search
            </Link>
            <Link
              to="/team"
              className="footer__social--link link__hover-effect"
            >
              Team
            </Link>

            <a
              href="mailto:mesem24@gmail.com"
              className="footer__social--link link__hover-effect"
            >
              Contact
            </a>
          </div>
        </div>
      </div>

      <div className="footer__copyright">
        Copyright © Michael Sullivan
      </div>
    </footer>
  );
}

export default Footer;