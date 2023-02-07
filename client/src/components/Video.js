import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRemove, faStar, faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons'

export default function Video({ video, deleteVideo, incRating, decRating }) {
  return (
    <div className="container-video">
      <h4 className="video-title">{video.title}</h4>
      <iframe width="100%" height="300" src={`https://www.youtube.com/embed/${video.url.split("watch?v=")[1]}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      <div className="container-buttons">
        <div className="container-ratings">
          <FontAwesomeIcon icon={faStar} />
          <span>{video.rating}</span>
        </div>
        <div className="container-thumbs">
          <FontAwesomeIcon icon={faThumbsUp} onClick={() => incRating(video.id)} />
          <FontAwesomeIcon icon={faThumbsDown} onClick={() => decRating(video.id, video.rating)} />
        </div>
        <div className="container-delete">
          <FontAwesomeIcon icon={faRemove} onClick={() => deleteVideo(video.id, video.rating)} />
        </div>
      </div>
    </div>
  );
}