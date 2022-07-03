import React from "react";
import '../styles/header.scss';
import {RiVideoAddLine} from 'react-icons/ri';



const Header = ({handleClick}) => {
  
     return (
      <div className="header">
        <h1>VIDEO Recommendation</h1>
        <button  onClick={handleClick} className="btn add-btn">
          <span className="icon"><RiVideoAddLine/></span>
          <span className="text">Add video</span>
        </button>
     
      </div>
  );
};

export default Header;
