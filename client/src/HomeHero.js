import "./HomeHero.css";

export const HomeHero = () => {
  return (
    <div>
      <div className="home-hero-text-wrapper">
        <p className="card-subtitle">FEATURE</p>
        <h1 className="card-title">Graceful and Coordinated</h1>
        <p className="home-hero-text">
          Cats are graceful, agile and playful, and they make wonderful
          companions. They are among the most loved and cherished pets in the
          world. To watch more videos please{" "}
          <a href="#all-videos" className="home-hero-all-videos-link">
            click here
          </a>
          .
        </p>
        <a href="#addvideo" className="add-video-link">
          Add a Video
        </a>
      </div>
    </div>
  );
};
