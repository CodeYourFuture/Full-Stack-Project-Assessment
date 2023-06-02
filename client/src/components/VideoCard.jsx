const VideoCard = ({ video, newVote, deleteVote }) => {
  return (
    <div key={video.id} className="video-card">
      <div>{video.title}</div>
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
      <button onClick={() => newVote(video.id, 1)}>Up Vote</button>
      <button onClick={() => newVote(video.id, -1)}>Down Vote</button>
      <button onClick={() => deleteVote(video.id)}>Delete</button>
    </div>
  );
};
export default VideoCard;
