
import React from "react";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";

import {
  faGithub,
  faFacebook,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Footer(){
    return (
      <footer className="footer text-center p-3 footer-div bg-dark">
        <div className="footer-icon">
          <a
            href="mailto:mohammedalaminruben@gmail.com?subject = Feedback&body = Message"
            target={"blank"}
          >
            <FontAwesomeIcon
              className="fontawe text-danger"
              icon={faInstagram}
            />
          </a>
          <a href="https://github.com/Alamin-eng" target={"blank"}>
            <FontAwesomeIcon className="fontawe text-white" icon={faGithub} />
          </a>
          <a
            href="mailto:mohammedalaminruben@gmail.com?subject = Feedback&body = Message"
            target={"blank"}
          >
            <FontAwesomeIcon
              className="fontawe text-warning"
              icon={faEnvelope}
            />
          </a>
          <a
            href="mailto:mohammedalaminruben@gmail.com?subject = Feedback&body = Message"
            target={"blank"}
          >
            <FontAwesomeIcon className="fontawe text-primary" icon={faFacebook} />
          </a>
        </div>
        <p className="text-info m-3">&#9400; 2022 Made With Love  Mohammad Alamin</p>
      </footer>
    );
}
export default Footer;