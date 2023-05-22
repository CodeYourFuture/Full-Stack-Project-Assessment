import "./About.css";
import ScrollAnimation from "react-animate-on-scroll";
import { Card } from "./Card";

export const About = () => {
  return (
    <div>
      <ScrollAnimation animateIn="animate__animated animate__zoomIn">
        <Card
          wrapperClass="about-card-wrapper"
          cardSubtitle="Films | Creative Development"
          cardTitle="About LeeTube Productions"
          cardTextClass="card-text"
          cardText=" We have been around for 12 years and have proven to be a very successful
          social media platform. We are home to many famous videos uploaded by our
          very special users. We continue to grow our productions and bring to you
          the very best video coverage."
          cardLink="/about"
          cardLinkClass="about-link"
          cardLinkText="+ More Info"
        />
      </ScrollAnimation>
    </div>
  );
};
