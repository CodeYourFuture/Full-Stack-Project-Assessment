const VideoPlayer = ({ data }) => {
  console.log("videoPlayer.js:", data);
  return (
    <div className="display-container">
      {data.map((video) => {
        console.log(video.url.slice(32));
        return (
          <div key={video.id}>
            <p className="title">{video.title}</p>
            <iframe
              className="video-card"
              width="25rem"
              height="40rem"
              src={`https://www.youtube.com/embed/${video.url.slice(32)}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <button type="button" class="btn btn-danger p-1 m-3">
              Delete Video
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default VideoPlayer;
