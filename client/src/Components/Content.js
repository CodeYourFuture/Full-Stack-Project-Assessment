import Video from "./Video";
// import data from "../data/exampleresponse.json";
import { useEffect, useState } from "react";
import AddVideos from "./AddVideos";
import Search from "./Search";

const Content = () => {
  const [videoData, setVideoData] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/")
      .then((res) => res.json())
      .then((data) => setVideoData(data))
      .catch((err) => console.error(err));
  }, []);
  const handleDelete = (id) => {
    const updatedVideoData = videoData.filter(
      (eachVideo) => eachVideo.id !== id
    );
    setVideoData(updatedVideoData);
  };

  const handleAddVideo = (title, url) => {
    const newVideoData = {
      id: Math.floor(Math.random() * 1000),
      title: title,
      url: url,
      rating: 0,
    };
    setVideoData([...videoData, newVideoData]);
  };

  const filteredData = videoData.filter((entry) => {
    return entry.title.toLowerCase().includes(searchInput.toLowerCase());
  });

  return (
    <div>
      <Search searchInput={searchInput} setSearchInput={setSearchInput} />
      <AddVideos handleAddVideo={handleAddVideo} />
      {filteredData.map((eachVideo, index) => (
        <Video video={eachVideo} key={index} handleDelete={handleDelete} />
      ))}
    </div>
  );
};
export default Content;
