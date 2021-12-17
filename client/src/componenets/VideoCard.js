import VoteButtons from "./VoteButtons";
import deleteHandler from "../utils/deleteHandler";

const VideoCard = ({ title, videoRating, videoId, id, setVideos }) => {
  return (
    <div className="mainPage">
      <div>
        <div
          className="videoCard"
          style={{ borderRadius: "5px", backgroundColor: "Linen" }}
        >
          <h5 style={{ padding: "10px" }}> {title}</h5>
          <iframe
            className="rounded border "
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player"
            frameBorder="1"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <VoteButtons rating={videoRating} />
        </div>
        <button
          className="btn btn-danger"
          style={{ marginBottom: "20px" }}
          onClick={() => deleteHandler(id, setVideos)}
        >
          Delete Video
        </button>
      </div>
    </div>
  );
};

export default VideoCard;
