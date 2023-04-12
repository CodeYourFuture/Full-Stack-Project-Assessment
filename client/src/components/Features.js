import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link } from "react-router-dom";
import Header from "./Header.js";
import Footer from "./Footer.js";

const Features = () => {
  return (
    <div>
      <Header />
      <div className="features-body">
        <div className="features-li">
          <Link to="/home">
            <li>Action</li>
          </Link>
          <Link to="/romantic">
            <li>Romantic</li>
          </Link>
          <Link to="/documentary">
            <li>Documentary</li>
          </Link>
        </div>
        <div className="features-h">
          <p>
            Through your favorite Link , will find That will Match your desire
          </p>
          <i className="features-i"> 
            <AiOutlineArrowLeft />
          </i>
        </div>
      </div>
      <div className="block-div"></div>
      <Footer />
    </div>
  );
};

export default Features;
