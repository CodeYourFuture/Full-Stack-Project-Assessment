import React from "react";
import Logo from "../icons/cyf_brand.png";

const Footer = () => {
  return (
    <footer>
      <div className="footer__wrap">
        <div className="footer__logo">
          <p>© Maksim Lukianenko 2023</p>
          <div className="img__wrap">
            <a href="https://codeyourfuture.io/">
              <img className="footer__img" src={Logo} alt="CYF" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
