import React from "react";
import { BsGithub, BsLinkedin } from "react-icons/bs";

const Footer = () => {
  return (
    <div className="footer d-flex flex-wrap justify-content-between flex-row p-2 border-top border-top-2 border-light">
      <div>
        <h6 className="text-white ps-2 fw-bold m-2">© Humail Khan 2022</h6>
      </div>
      <div>
        <a
          href="https://github.com/humailhasankhan"
          target="_blank"
          rel="noopener noreferrer"
          title="Github link"
        >
          <BsGithub className="text-white me-3" size={25} />
        </a>
        <a
          href="https://www.linkedin.com/in/humail-khan-619644217/"
          target="_blank"
          rel="noopener noreferrer"
          title="Linkedin"
        >
          <BsLinkedin className="text-white me-5" size={25} />
        </a>
      </div>
    </div>
  );
};

export default Footer;
