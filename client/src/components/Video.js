import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";

const Video = ({ id, title, url, rating, getAllVideos, getDeleteMessage }) => {
  const videoId = url.split("v=")[1];

  const deleteHandler = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/${id}`, {
        method: "DELETE",
      });
      if (response.status !== 200) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      getDeleteMessage(data.message);
      getAllVideos();
    } catch (error) {
      console.error(error);
    }
  };

  const ratingHandler = async () => {
    const updatedMovie = {
      rating,
      id,
    };
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedMovie),
      });
      if (response.status !== 200) {
        throw new Error("Something went wrong!");
      } else {
        getAllVideos();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const voteUpHandler = () => {
    rating += 1;
    ratingHandler();
  };

  const voteDownHandler = () => {
    rating -= 1;
    ratingHandler();
  };

  return (
    <div className="video">
      <h4>{title}</h4>
      <div className="vote">
        <button
          className="btn btn-link"
          title="Vote Up"
          onClick={voteUpHandler}
        >
          <FontAwesomeIcon
            icon={faThumbsUp}
            size="2x"
            style={{ color: "#fd5d5d" }}
          />
        </button>
        <p>{rating}</p>
        <button
          className="btn btn-link"
          title="Vote Down"
          onClick={voteDownHandler}
        >
          <FontAwesomeIcon
            icon={faThumbsDown}
            size="2x"
            style={{ color: "#fd5d5d" }}
          />
        </button>
      </div>
      <div>
        <iframe
          // width="460"
          // height="300"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          frameBorder="5"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <button className="button" onClick={deleteHandler}>
        Delete
      </button>
    </div>
  );
};

export default Video;
