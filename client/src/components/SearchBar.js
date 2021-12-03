const SearchBar = ({ videos, setVideos }) => {
  const handleSearch = (e) => {
    const searchBarInput = videos.filter((video) =>
      video.title.toLowerCase().includes(e.target.value.toLowerCase())
    );

    setVideos(searchBarInput);
  };
  return (
    <div className="search-container justify-content-center">
      <label
        htmlFor="title"
        className="search-bar w-50 navbar navbar-light bg-info m-3 justify-content-center"
      >
        Search
        <input
          type="text"
          id="title"
          className="form-control"
          placeholder="enter search here.."
          onChange={handleSearch}
        />
      </label>
    </div>
  );
};

export default SearchBar;
