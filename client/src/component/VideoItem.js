import ReactPlayer from "react-player";

const VideoItem = ({ video, onRemove, onVote}) => {
  const { id, title, url, rating } = video;
  const handleRemove = () => {
    onRemove(id);
  };
   const handleVote = (increment) => {
     onVote(id, increment);
   };
  return (
    <div className="video-item">
      <h2>{title}</h2>
      <ReactPlayer url={url} controls />
      <p>Votes: {rating}</p>
      <button onClick={() => handleVote(1)}>Up Vote</button>
      <button onClick={() => handleVote(-1)}>Down Vote</button>
      <button onClick={handleRemove}>Remove</button>
    </div>
  );
};
export default VideoItem;
