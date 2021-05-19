import React from 'react'
import './Footer.css'
import Logo from '../img/Logo.png'


const Footer = () => {
    return (
        <div className='footer-container'>

            <img className="foot-logo" src={Logo} alt='logo'></img>
            <h4>&copy; 2021</h4>



        </div>
    )
}

export default Footer;
