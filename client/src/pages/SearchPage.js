import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import VideoLists from "../components/VideoLists";
const SearchPage = ({ allVideos, getAllVideos, order }) => {
  const [search, setSearch] = useState("");
  const [videoSearch, setVideoSearch] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");

  const searchHandle = (e) => {
    const searchText = e.target.value;
    if (searchText === "") {
      setSearch("");
      setVideoSearch([]);
    } else {
      setSearch(searchText);
      setSelectedValue("");
    }
  };

  useEffect(() => {
    if (search === "") {
      return;
    } else {
      const filteredVideos = allVideos.filter((video) => {
        return video.title.toLowerCase().includes(search.toLowerCase());
      });
      setVideoSearch(filteredVideos);
    }
  }, [search, allVideos]);

  const selectChangeHandler = (e) => {
    const selectedTitle = e.target.value;
    if (e.target.value === "") {
      setSelectedVideo([]);
      setSelectedValue("");
      setSearch("");
    } else {
      const selectedVideo = allVideos.find((video) => {
        return video.title === selectedTitle;
      });
      setSelectedVideo([selectedVideo]);
      setSelectedValue(selectedTitle);
      setSearch("");
    }
  };

  useEffect(() => {
    setVideoSearch(selectedVideo);
  }, [selectedVideo]);

  return (
    <>
      <div className="search-icon">
        <FontAwesomeIcon
          icon={faSearch}
          size="2x"
          style={{
            padding: "1rem",
            backgroundColor: "#fd5d5d",
            borderRadius: "50px",
          }}
        />
      </div>
      <div className="features">
        <div className="search-videos">
          <label>Search by title </label>
          <input
            type="text"
            placeholder="Enter title..."
            onChange={searchHandle}
            value={search}
          />
        </div>
        <div className="select-video">
          <label>Select a video </label>
          <select onChange={selectChangeHandler} value={selectedValue}>
            <option value="">Select </option>
            {allVideos.map((video) => (
              <option value={video.title} key={video.id}>
                {video.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <VideoLists allVideos={videoSearch} getAllVideos={getAllVideos} />
    </>
  );
};

export default SearchPage;
