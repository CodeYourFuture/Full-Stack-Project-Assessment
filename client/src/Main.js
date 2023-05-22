import "./Main.css";
import { Card } from "./Card.js";

export const Main = () => {
  return (
    <div className="main-wrapper">
      <video className="main-video" autoPlay="autoplay" loop muted>
        <source
          src="https://cdn.pixabay.com/vimeo/688648666/Skate%20-%20110734.mp4?width=1280&hash=7a5fb1d4f6f8d7a8b37298f011666a3be97e5b12"
          type="video/mp4"
        />
        <source src="movie.ogg" type="video/ogg" />
      </video>
      <Card
        wrapperClass="main-card-wrapper"
        cardSubtitle="SURFARIFIC"
        cardTitle="Superb Surfing Skills"
        cardTextClass="main-card-text"
        cardText="This surfer has managed to manouver these huge waves with excellent coordination and grace. The waves become his friend as he works his magic in and around them. An amazing sight indeed."
        cardLink="https://cdn.pixabay.com/vimeo/688648666/Skate%20-%20110734.mp4?width=1280&hash=7a5fb1d4f6f8d7a8b37298f011666a3be97e5b12"
        cardLinkClass="main-card-link"
        cardLinkText="Watch Now"
      />
    </div>
  );
};
