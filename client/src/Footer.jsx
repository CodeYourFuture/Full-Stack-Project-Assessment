import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faInstagram,
	faLinkedin,
	faGithub,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
	return (
		<footer className="footer">
			<div className="footer-content">
				<div className="footer-links">
					<a
						href="https://www.instagram.com/behrouz.karimiii"
						target="_blank"
						rel="noreferrer"
					>
						<FontAwesomeIcon icon={faInstagram} />
					</a>
					<a
						href="https://www.linkedin.com/in/a-karimi-3ba003ab"
						target="_blank"
						rel="noreferrer"
					>
						<FontAwesomeIcon icon={faLinkedin} />
					</a>
					<a
						href="https://github.com/bkarimii"
						target="_blank"
						rel="noreferrer"
					>
						<FontAwesomeIcon icon={faGithub} />
					</a>
					<p>
						<a
							href="https://github.com/bkarimii/Full-Stack-Project-Assessment"
							target="blank"
						>
							GitHub Source
						</a>
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
