import React from "react";

const Footer = () => {
  return (
    <div className="card1 text-center">
      <div className="card-header">
        <ul className="nav nav-tabs card-header-tabs">
          <li className="nav-item">
            <a
              className="nav-link active"
              aria-current="true"
              href="./features"
            >
              Features
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link active" href="./about">
              About
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link active"
              href="/Pricing"
              tabIndex="-1"
              aria-disabled="false"
            >
              Pricing
            </a>
          </li>
        </ul>
      </div>
      <div className="card-body">
        <h5 className="card-title">Special title treatment</h5>
        <p className="card-text">
          With supporting text below as a natural lead-in to additional content.
        </p>
        <a href="/" className="btn btn-primary">
          Go to Home
        </a>
      </div>
    </div>
  );
};

export default Footer;
