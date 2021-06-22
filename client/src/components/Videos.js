import { useState } from "react";
import staticData from "../exampleresponse.json";
import AddVideoForm from "./AddVideoForm";
import Search from "./Search";
import SingleVideo from "./SingleVideo";
import "./Videos.css";

const Videos = () => {
  const sortedVideosData = staticData.sort((a, b) => b.rating - a.rating);
  const [videosData, setVideosData] = useState(sortedVideosData);
  const [searchValue, setSearchValue] = useState("");
  const [showError, setShowError] = useState(false);

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

  // matchYoutubeUrl was copied from here: https://www.codegrepper.com/code-examples/javascript/javascript+validate+url+to+match+youtube+video
  const matchYoutubeUrl = (url) => {
    var p =
      /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    if (url.match(p)) {
      return url.match(p)[1];
    }
    return false;
  };

  const handleAddVideo = (title, url) => {
    if (title !== "" && url !== "" && matchYoutubeUrl(url)) {
      const newVideoObj = {
        id: Date.now(),
        title,
        url,
        rating: 0,
      };

      const newVideosData = [...videosData]; // creates copy of videosData
      newVideosData.push(newVideoObj);
      setVideosData(newVideosData);
    } else {
      setShowError(true);
    }
  };

  // filter by user input (for Search)
  const filteredVideos = videosData.filter((data) => {
    return data.title.toLowerCase().includes(searchValue.toLowerCase());
  });

  return (
    <>
      {showError && (
        <p className="error-message">
          Please fill both fields and provide a valid YouTube url
        </p>
      )}
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
