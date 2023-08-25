import { useState } from "react";
import Video from "./Video";
const VideoLists = ({ allVideos, getAllVideos }) => {
  const [order, setOrder] = useState("desc");

  const handleOrderChange = (e) => {
    setOrder(e.target.value);
    getAllVideos(order);
  };

  return (
    <>
      <div className="features">
        <div className="search-videos">
          <label>Search by title </label>
          <input
            type="text"
            placeholder="Enter title..."
            // onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <div className="order-videos">
          <label>Order by votes:</label>
          <select value={order} onChange={handleOrderChange}>
            <option value="desc">Desc</option>
            <option value="asc">Asce</option>
          </select>
        </div>
      </div>
      <div className="video-lists">
        {allVideos.map((video) => (
          <Video
            key={video.id}
            id={video.id}
            rating={video.rating}
            title={video.title}
            url={video.url}
            getAllVideos={getAllVideos}
          />
        ))}
      </div>
    </>
  );
};

export default VideoLists;
