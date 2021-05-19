import { useEffect, useState } from "react";
import { fetchVideosData } from "../functions";
import Card from "./VideoCard";

const VideoCards = (props) => {
  const [orderParam, setOrderParam] = useState("");
  const [buttonCaption, setButtonCaption] = useState("Ascending");
  const [videos, setVideos] = useState([]);
  // FETCH VIDEOS' DATA FROM SERVER
  useEffect(() => {
    const response = fetchVideosData(orderParam);
    response.then((data) => setVideos(data));
  }, [orderParam]);
  // EVENT HANDLERS
  const sortVideos = (event) => {
    event.preventDefault();
    if (buttonCaption === "Ascending") {
      setButtonCaption("Descending");
      setOrderParam("?order=asc");
    } else {
      setButtonCaption("Ascending");
      setOrderParam("?order=desc");
    }
  };
  
  return (
    <div>
      <div className="video-sorter">
        <label htmlFor="sort">Sort by rating:</label>
        <button id="sort" onClick={sortVideos}>
          {buttonCaption}
        </button>
      </div>
      <div className="cards-container">
        {videos.map((videoData, index) => (
          <Card key={index} data={videoData} onDelete={props.onDelete} />
        ))}
      </div>
    </div>
  );
};
export default VideoCards;