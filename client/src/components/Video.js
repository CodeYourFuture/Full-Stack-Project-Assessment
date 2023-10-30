import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";

const Video = ({
  id,
  title,
  url,
  ratingUp,
  ratingDown,
  getAllVideos,
  getDeleteMessage,
}) => {
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

  const voteUpHandler = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVERURL}/ratingup/${id}`,
        {
          method: "PUT",
        }
      );
      if (response.status !== 200) {
        throw new Error("Something went wrong!");
      }
      getAllVideos();
    } catch (error) {
      console.error(error);
    }
  };

  const voteDownHandler = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVERURL}/ratingdown/${id}`,
        {
          method: "PUT",
        }
      );
      if (response.status !== 200) {
        throw new Error("Something went wrong!");
      }
      getAllVideos();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="video">
      <div>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          frameBorder="5"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <h4>{title}</h4>
      <div className="vote">
        <button
          className="btn btn-link"
          title="Vote Up"
          onClick={voteUpHandler}
        >
          <FontAwesomeIcon
            icon={faThumbsUp}
            size="1x"
            style={{ color: "#fd5d5d" }}
          />
          <span className="rate">{ratingUp}</span>
        </button>
        <button
          className="btn btn-link"
          title="Vote Down"
          onClick={voteDownHandler}
        >
          <FontAwesomeIcon
            icon={faThumbsDown}
            size="1x"
            style={{ color: "#fd5d5d" }}
          />
          <span className="rate">{ratingDown}</span>
        </button>
      </div>

      <button className="button" onClick={deleteHandler}>
        <span className="btn-text-one">Delete</span>
        <span className="btn-text-two">Are you sure?</span>
      </button>
    </div>
  );
};

export default Video;
