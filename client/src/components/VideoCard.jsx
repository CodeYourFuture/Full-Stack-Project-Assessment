const VideoCard = ({ video, newVote, deleteVote }) => {
  return (
    <div key={video.id} className="video-card">
      <div className="title">{video.title}</div>
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${video.url.split("=")[1]}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <div className="rating">{video.rating}</div>
      <button onClick={() => newVote(video.id, 1)}>
        <img src="./noun-heart-147669.svg" width={"30px"} alt="" />
      </button>
      <button onClick={() => newVote(video.id, -1)}>
        <img src="./noun-heart-310109.svg" width={"30px"} alt="" />
      </button>
      <button onClick={() => deleteVote(video.id)}>
        <img src="./noun-delete-5764129.svg" width={"30px"} alt="" />
      </button>
    </div>
  );
};
export default VideoCard;
