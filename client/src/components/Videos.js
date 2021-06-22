import { useState } from "react";
import staticData from "../exampleresponse.json";
import AddVideoForm from "./AddVideoForm";
import Search from "./Search";
import SingleVideo from "./SingleVideo";
import "./Videos.css";

const Videos = () => {
  const [videosData, setVideosData] = useState(staticData);
  const [searchValue, setSearchValue] = useState("");

  // delete video
  const handleDeleteVideoClick = (id) => {
    const newVideosData = videosData.filter((video) => {
      return video.id !== id;
    });
    setVideosData(newVideosData);
  };

  const handleSearch = (event) => {
    console.log(event.target.value);
    setSearchValue(event.target.value);
  };

  // filter by user input
  const filteredVideos = videosData.filter((data) => {
    return data.title.toLowerCase().includes(searchValue.toLowerCase());
  });

  return (
    <>
      <AddVideoForm />
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
