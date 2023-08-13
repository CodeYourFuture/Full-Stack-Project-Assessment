import { library } from "@fortawesome/fontawesome-svg-core";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(faThumbsUp, faThumbsDown);

function Videocard({ video, onUpVote, onDownVote, onRemove }) {
  let linkFixed = video.url.replace("watch?v=", "embed/");
  return (
    <div className="video-card">
      <h3>{video.title}</h3>
      <iframe
        title={video.title}
        width="560"
        height="315"
        src={linkFixed}
        allowFullScreen
      />
      <div className="vote-buttons">
        <p>Votes: {video.rating}</p>
        <div>
            <button aria-label="thumb-up"
          type="button"
          className="btn btn-success"
          onClick={() => onUpVote(video)}
        >
          <FontAwesomeIcon icon="thumbs-up" />
        </button>
        <button
        aria-label="thumb-down"
          type="button"
          className="btn btn-warning"
          onClick={() => onDownVote(video)}
        >
          <FontAwesomeIcon icon="thumbs-down" />
        </button>
        <button
        aria-label="delete"
          type="button"
          className="btn btn-danger"
          onClick={() => onRemove(video)}
        >
          Remove
        </button>
        </div>
        
      </div>
    </div>
  );
}

export default Videocard;

