import React from 'react'
import "./App.css";
import Logo from '../src/img/Logo.png';

const Footer = () => {
    return (
        <div className='footer-container'>

            <img className="foot-logo" src={Logo} alt='logo'></img>
            <h3>&copy; 2022.... </h3>
            <h4>  "This app is Dedicated to Code Your Future and my Family"  </h4>
            <img className="foot-logo" src={Logo} alt='logo'></img>



        </div>
    )
}

export default Footer;
