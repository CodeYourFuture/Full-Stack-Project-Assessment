import React from "react";
import CardGroup from "react-bootstrap/CardGroup";
import Header from "./Header";
import Videos from "./images/videos.mp4";
import Footer from "./Footer";

function About() {
  return (
    <div className="about">
      <Header />
      <video autoPlay Loop muted playsInline className="bg-video">
        <source src={Videos} type="video/mp4" />
      </video>
      <CardGroup className="about-card">
        <card className="card-1">
          <h5>Who We Are</h5>
          <p>
            {" "}
            This is a wider card with supporting text below as a natural lead-in
          </p>
        </card>
        <card className="card-1">
          <h5>How Our Work</h5>
          <p>
            {" "}
            This is a wider card with supporting text below as a natural lead-in
          </p>
        </card>{" "}
        <card className="card-1">
          <h5>Our Mission</h5>
          <p>
            {" "}
            Simplify your Watching , Buy or download the Movies do you like
          </p>
        </card>
      </CardGroup>

      <Footer />
    </div>
  );
}

export default About;
