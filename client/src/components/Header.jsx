import AddVideo from "./AddVideo";
import SortVideos from "./SortVideos";

export default function Header({ setRefreshVideos, sort, setSort }) {
  return (
    <header className="header-container">
      <a
        href="https://github.com/bazmurphy/fullstack-videos"
        target="_blank"
        className="header-title-container"
      >
        <div className="header-title-image-container">
          <img
            src="images/video-tablet.png"
            alt=""
            className="header-title-image"
          />
        </div>
        <h1 className="header-title">
          Fullstack Video
          <br />
          Recommendations
        </h1>
      </a>
      <div className="header-controls-container">
        <AddVideo setRefreshVideos={setRefreshVideos} />
        <SortVideos sort={sort} setSort={setSort} />
      </div>
    </header>
  );
}
