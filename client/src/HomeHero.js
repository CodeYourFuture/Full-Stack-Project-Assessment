import "./HomeHero.css";

export const HomeHero = () => {
  const scrollToForm = () => {
    const formElement = document.getElementById("addvideo");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };
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
        <button className="add-video-link" onClick={scrollToForm}>
          Add a Video
        </button>
      </div>
    </div>
  );
};
