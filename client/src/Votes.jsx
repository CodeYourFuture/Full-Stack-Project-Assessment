import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { faThumbsDown } from "@fortawesome/free-regular-svg-icons";

function Votes({ videos, setVideos, video }) {
  function upVote(id) {
    let newVideos = videos.map((eachVideo) => {
      if (eachVideo.id === id) {
        return { ...eachVideo, rating: eachVideo.rating + 1 };
      } else {
        return eachVideo;
      }
    });
    setVideos(newVideos);
  }

  function downVote(id) {
    let newVideos = videos.map((eachVideo) => {
      if (eachVideo.id === id) {
        return { ...eachVideo, rating: eachVideo.rating - 1 };
      } else {
        return eachVideo;
      }
    });
    setVideos(newVideos);
  }
  return (
    <aside>
      <button
        className="vote-btn"
        onClick={() => {
          upVote(video.id);
        }}
      >
        <FontAwesomeIcon
          icon={faThumbsUp}
          beatFade
          style={{ color: "#34d181" }}
        />
      </button>
      <button
        className="vote-btn"
        onClick={() => {
          downVote(video.id);
        }}
      >
        <FontAwesomeIcon
          icon={faThumbsDown}
          beatFade
          style={{ color: "#08b1eb" }}
        />
      </button>
    </aside>
  );
}

export default Votes;
