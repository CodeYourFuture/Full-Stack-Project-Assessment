import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRemove, faStar, faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment';

export default function Video({ video, deleteVideo, incRating, decRating }) {
  return (
    <div className="container-video">
      <span className="video-title">{video.title}</span>

      <img className='thumbnail' src={`https://i.ytimg.com/vi/${video['video_id']}/hqdefault.jpg`} alt={video.title} />
      
      <span className='video-author'>{video.author}</span>
      <span className='video-views'>{video.views.toLocaleString('en-US')} Views</span>
      <span className='video-date'>Uploaded on {moment(video["upload_date"]).utcOffset("+0100").format("DD-MM-YYYY")}</span>

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