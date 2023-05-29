// import logo from '../images/Vector.svg';
import React from "react";

const year = new Date().getFullYear();

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__text">© {year} Mesto Russia</p>
    </footer>
  );
}

export default Footer;
