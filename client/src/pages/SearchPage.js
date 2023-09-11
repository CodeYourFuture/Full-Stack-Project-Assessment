import { useEffect, useState } from "react";
import VideoLists from "../components/VideoLists";
const SearchPage = ({ allVideos, getAllVideos, order }) => {
  const [search, setSearch] = useState("");
  const [videoSearch, setVideoSearch] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState([]);

  const searchHandle = (e) => {
    const searchText = e.target.value;
    if (searchText === "") {
      setVideoSearch([]);
      return;
    } else {
      setSearch(searchText);
    }
  };

  useEffect(() => {
    const filteredVideos = allVideos.filter((video) => {
      return video.title.toLowerCase().includes(search.toLowerCase());
    });
    setVideoSearch(filteredVideos);
  }, [search]);

  const selectChangeHandler = (e) => {
    const selectedTitle = e.target.value;
    if (e.target.value === "") {
      setSelectedVideo([]);
    } else {
      const selectedVideo = allVideos.find((video) => {
        return video.title === selectedTitle;
      });
      setSelectedVideo([selectedVideo]);
    }
  };

  useEffect(() => {
    setVideoSearch(selectedVideo);
  }, [selectedVideo]);

  return (
    <>
      <div className="features">
        <div className="search-videos">
          <label>Search by title </label>
          <input
            type="text"
            placeholder="Enter title..."
            onChange={searchHandle}
          />
        </div>
        <div class="select-video">
          <label>Select a video </label>
          <select
            onChange={selectChangeHandler}
            value={selectedVideo ? selectedVideo.title : ""}
          >
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
