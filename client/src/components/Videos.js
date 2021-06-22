import { useState } from "react";
import staticData from "../exampleresponse.json";
import AddVideoForm from "./AddVideoForm";
import Search from "./Search";
import SingleVideo from "./SingleVideo";
import "./Videos.css";

const Videos = () => {
  const [videosData, setVideosData] = useState(staticData);
  const [searchValue, setSearchValue] = useState("");

  // delete video (for SingleVideo)
  const handleDeleteVideoClick = (id) => {
    const newVideosData = videosData.filter((video) => {
      return video.id !== id;
    });
    setVideosData(newVideosData);
  };

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
  };

  const handleAddVideo = (title, url) => {
    const newVideoObj = {
      id: Date.now(),
      title,
      url,
      rating: 0,
    };

    const newVideosData = [...videosData]; // creates copy of videosData
    newVideosData.push(newVideoObj);
    setVideosData(newVideosData);
  };

  // filter by user input (for Search)
  const filteredVideos = videosData.filter((data) => {
    return data.title.toLowerCase().includes(searchValue.toLowerCase());
  });

  return (
    <>
      <AddVideoForm handleAddVideo={handleAddVideo} />
      <Search handleSearch={handleSearch} searchValue={searchValue} />
      <section className="videos">
        {filteredVideos.map((video, index) => {
          return (
            <SingleVideo
              video={video}
              key={index}
              searchValue={searchValue}
              handleDeleteVideoClick={handleDeleteVideoClick}
            />
          );
        })}
      </section>
    </>
  );
};

export default Videos;
