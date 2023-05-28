import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { faThumbsDown } from "@fortawesome/free-regular-svg-icons";

function Votes({ videos, setVideos, video }) {
  function updateRating(id, newRating) {
    fetch(`https://video-server-1vzq.onrender.com/video/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rating: newRating }),
    })
      .then((response) => {
        if (response.ok) {
          let newVideos = videos.map((eachVideo) => {
            if (eachVideo.id === id) {
              return { ...eachVideo, rating: newRating };
            } else {
              return eachVideo;
            }
          });
          setVideos(newVideos);
          console.log("Video rating updated");
        } else {
          console.log("Failed to update video rating");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function upVote(id) {
    const video = videos.find((video) => video.id === id);
    const newRating = video.rating + 1;
    updateRating(id, newRating);
  }

  function downVote(id) {
    const video = videos.find((video) => video.id === id);
    const newRating = video.rating - 1;
    updateRating(id, newRating);
  }

  // function upVote(id) {
  //   let newVideos = videos.map((eachVideo) => {
  //     if (eachVideo.id === id) {
  //       return { ...eachVideo, rating: eachVideo.rating + 1 };
  //     } else {
  //       return eachVideo;
  //     }
  //   });
  //   setVideos(newVideos);
  // }

  // function downVote(id) {
  //   let newVideos = videos.map((eachVideo) => {
  //     if (eachVideo.id === id) {
  //       return { ...eachVideo, rating: eachVideo.rating - 1 };
  //     } else {
  //       return eachVideo;
  //     }
  //   });
  //   setVideos(newVideos);
  // }
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
