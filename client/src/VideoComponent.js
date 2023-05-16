// import ReactPlayer from 'react-player';
import './VideoComponent.css';

const VideoComponent = ({ video, onRemove }) => {
  const { id, title, url, rating } = video;

  const handleRemoveClick = () => {
    onRemove(id);
  };

  return (
    <div>
      <div className="video-card">
        <h2 className="video-title">{title}</h2>
        <div className="video-player">
          <iframe width="560" height="315" src={url.replace("watch?v=","embed/")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div>
        <p className="video-rating">Votes: {rating}</p>
        <button className="remove-button" onClick={handleRemoveClick}>Remove</button>
      </div>
    </div>
  );
};

export default VideoComponent;

