import React from 'react'
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/videos"> Videos </Link></li>
        <li><Link to="/create"> Create </Link></li>
        <li><Link to="/signUp">SignUp</Link></li>
        <li><Link to="/login">login</Link></li>
      </ul>
    </div>
  );
}

export default Nav