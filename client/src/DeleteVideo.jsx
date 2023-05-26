import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

function DeleteVideo({ video, getAllVideos }) {
  function handleDeleteVideo(videoID) {
    fetch(`http://localhost:3005/video/${videoID}`, {
      method: "DELETE",
      headers: {
        Content_Type: "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`${videoID} could not be found`);
        }
        console.log(response);
        getAllVideos();
      })
      .catch((error) => console.log(error));
  }

  return (
    <button className="vote-btn" onClick={() => handleDeleteVideo(video.id)}>
      <FontAwesomeIcon icon={faTrashCan} style={{ color: "#e2cd4c" }} />
    </button>
  );
}

export default DeleteVideo;
