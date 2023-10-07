import { useState, useEffect } from "react";
// import staticData from "../exampleresponse.json";
import AddVideoForm from "./AddVideoForm";
import Search from "./Search";
import SingleVideo from "./SingleVideo";
import "./Videos.css";

const Videos = () => {
  const [videosData, setVideosData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/videos")
      .then((res) => res.json())
      .then((data) => setVideosData(data))
      .catch((err) => console.error(err));
  }, []);

  // delete video (for SingleVideo)
  const handleDeleteVideoClick = (id) => {
    const newVideosData = videosData.filter((video) => video.id !== id);
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

  const handleAddVideo = async (title, url) => {
    if (title !== "" && url !== "" && matchYoutubeUrl(url)) {
      try {
        const response = await fetch("http://localhost:8080/addVideos", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, url }),
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setVideosData([...videosData, data]);
        } else {
          console.error('Failed to add video:', response.statusText);
        }
      } catch (error) {
        console.error('Error adding video:', error);
      }
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
          Please fill both fields and provide a valid YouTube url!
        </p>
      )}
      <AddVideoForm handleAddVideo={handleAddVideo} />
      <Search handleSearch={handleSearch} searchValue={searchValue} />
      <section className="videos">
        {filteredVideos.map((video) => {
    
          return (
            <SingleVideo
              video={video}
              key={video.id}
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