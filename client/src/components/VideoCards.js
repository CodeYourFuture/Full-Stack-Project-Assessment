import { useEffect, useState } from "react";
import { fetchVideosData } from "../functions";
import Card from "./VideoCard";

const VideoCards = (props) => {
  const [orderParam, setOrderParam] = useState("");
  const [buttonCaption, setButtonCaption] = useState("Ascending");
  const [videos, setVideos] = useState([]);
  const [searchText, setSearchText] = useState("");
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

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  return (
    <div>
      <div className="video-searcher-sorter">
        <div>
          <label htmlFor="search">Search:</label>{" "}
          <input
            type="text"
            id="search"
            value={searchText}
            onChange={handleSearch}
            placeholder="enter video title here..."
          />
        </div>
        <div>
          <label htmlFor="sort">Sort videos by rating:</label>{" "}
          <button id="sort" aria-label="button-sort" onClick={sortVideos}>
            {buttonCaption}
          </button>
        </div>
      </div>
      <div className="cards-container">
        {videos
          .filter((v) =>
            v.title.toUpperCase().includes(searchText.toUpperCase())
          )
          .map((videoData, index) => (
            <Card key={index} data={videoData} onDelete={props.onDelete} />
          ))}
      </div>
    </div>
  );
};
export default VideoCards;
