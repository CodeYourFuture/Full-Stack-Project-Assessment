import React from 'react'
import { Link } from 'react-router-dom';
import '../nav/nav.css';

const Nav = () => {
  return (
    <div className='nav-continuer'>
      <ul className='left-ul'>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/videos"> Videos </Link></li>
        <li><Link to="/create"> Create </Link></li>
      </ul>
      <ul className='right-ul'>
        <li><Link to="/signUp">SignUp</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </div>
  );
}

export default Nav

