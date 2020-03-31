import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <div className="footer">
      <p className="footer-p">Designed by Ryan Kadel</p>
      <ul className="footer-ul">
        <li className="footer-icon">
          <a
            href="https://github.com/r-kadel"
            target="_blank"
            rel="noopener noreferrer">
            <i className="fab fa-github"></i>
          </a>
        </li>
        <li className="footer-icon">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="mailto:ryan.kadel@yahoo.com?Subject=From%20SearchStream">
            <i className="fas fa-envelope"></i>
          </a>
        </li>
        <li className="footer-icon">
          <a
            href="https://www.linkedin.com/in/ryankadel"
            target="_blank"
            rel="noopener noreferrer">
            <i className="fab fa-linkedin"></i>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Footer;
