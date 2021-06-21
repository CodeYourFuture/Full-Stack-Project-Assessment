import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import "./SingleVideo.css";
const SingleVideo = ({ video }) => {
  // console.log(video.url);
  // console.log(
  //   "yoyooyyyo",
  //   `https://www.youtube.com/embed/${video.url.split("=")[1]}`
  // );
  return (
    <div className="video-card">
      <h3>{video.title}</h3>
      <div className="votes-container">
        <div>
          <FaThumbsUp />
        </div>
        <div>
          <p>10votes</p>
        </div>
        <div>
          <FaThumbsDown />
        </div>
      </div>
      <iframe
        width="360"
        height="300"
        src={`https://www.youtube.com/embed/${video.url.split("=")[1]}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default SingleVideo;
