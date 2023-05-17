import "./Header.css";
import logoIcon from "./play.png";

export const Header = () => {
  return (
    <header>
      <video className="header-video" autoPlay="autoplay" loop muted>
        <source
          src="https://player.vimeo.com/external/589196039.sd.mp4?s=774ac7e5685942e38c2752429a83aa9638ea2c7d&profile_id=164"
          type="video/mp4"
        />
        <source src="movie.ogg" type="video/ogg" />
        <track
          src="captions_en.vtt"
          kind="captions"
          srclang="en"
          label="english_captions"
        />
        <track
          src="captions_es.vtt"
          kind="captions"
          srclang="es"
          label="spanish_captions"
        />
      </video>
      <div className="header-wrapper">
        <div className="header-left-wrapper">
          <div className="header-logo-icon-wrapper">
            <a href="/" className="header-logo-text">
              LeeTube
            </a>
            <img src={logoIcon} className="header-logo-icon" alt="logo" />
          </div>
        </div>
        <ul className="header-right-wrapper">
          <li>Home</li>
          <li>Stream/Buy</li>
          <li>Coming Soon</li>
          <li>Catalog</li>
          <li>About Us</li>
          <li>Contact</li>
        </ul>
      </div>
    </header>
  );
};
