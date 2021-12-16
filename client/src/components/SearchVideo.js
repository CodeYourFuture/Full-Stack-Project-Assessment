import React, {useState} from "react";

const SearchVideo = ({ allVideo,setAllVideo}) => {
 const [searchVideo, setSearchVideo] = useState("");
  const HandleOnChangeSearch = (event) => {
    event.preventDefault();
    setSearchVideo(event.target.value);
  };
  const FilteredVideo = allVideo.filter((video) =>
    video.title.toLowerCase().includes(searchVideo.toLowerCase())
  );
console.log(FilteredVideo);
  return (
    <form>
      <label htmlFor="videoSearch">Search</label>
      <div>
        <input type="text" id="searchVideo" onChange={HandleOnChangeSearch} />
      </div>
    </form>
  );
};

export default SearchVideo;
