import React from "react";
import '../styles/header.scss';
import {RiVideoAddLine} from 'react-icons/ri';


const Header = () => {

  
  return (
      <div className="header">
        <h1>VIDEO Recommendation</h1>
        <a href="#bookNow" className="btn"><RiVideoAddLine/>
            <span>Add video</span>
        </a>
      </div>
  );
};

export default Header;
