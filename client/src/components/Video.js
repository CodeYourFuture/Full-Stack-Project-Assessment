const Video = ({video}) => {
    return (
      <div className="video-container">
        <h2>{video.title}</h2>
        <iframe
          src={video.url}
          title={video.title}
          allowFullScreen
        >
          {" "}
          allowFullScreen
        </iframe>
      </div>
    );
}

export default Video;