import "./ShowVideos.css";
import { BiDislike, BiLike, BiXCircle } from "react-icons/bi";
function ShowVidoes({ videos, decRating, incRating, deletev }) {
  return (
    <div className="allvideo">
      {videos.map((video) => {
        return (
          <div className="video">
            <h1>{video.title}</h1>
            <iframe
              key={video.id}
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${
                video.url.split("watch?v=")[1]
              }`}
              title="YouTube video player"
            ></iframe>
            <div className="reating">
              <h3 onClick={() => decRating(video.id, video.rating)}>
                <BiDislike />
              </h3>
              <span>{video.rating}</span>
              <h3 onClick={() => incRating(video.id)}>
                <BiLike />
              </h3>
              <h3 onClick={() => deletev(video.id)}>
                <BiXCircle />
              </h3>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ShowVidoes;
