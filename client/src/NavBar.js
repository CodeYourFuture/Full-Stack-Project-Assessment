import { useState, useRef } from "react";

const NavBar = ({ setSearch, setOrder, baseUrl, getVideos }) => {
  const searchBar = useRef();
  const [isVisible, setIsVisible] = useState(false);
  const [newVideo, setNewVideo] = useState({});

  const handleChange = (e) => {
    setNewVideo({ ...newVideo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newVideo.url.includes("www.youtube.com") && newVideo.title) {
      fetch(baseUrl + "/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newVideo),
      })
        .then((response) => {
          if (response.status !== 200) {
            alert("Invalid input");
          }
          return response.json();
        })
        .then((data) => {
          getVideos();
          setNewVideo({});
          setIsVisible(false);
        });
    } else if (newVideo.title) {
      alert("Your URL is not a valid YouTube video");
    } else if (newVideo.url.includes("www.youtube.com/watch?v=")) {
      alert("Title should not be empty");
    } else {
      alert(
        "Your URL is not a valid YouTube video and title should not be empty"
      );
    }
  };

  const resetSearch = () => {
    searchBar.current.value === "" && setSearch("");
  };

  const toggleSorting = (e) => {
    if (
      e.target.value === "title" &&
      e.target.lastElementChild.className === "fa fa-angle-double-down"
    ) {
      setOrder("desc");
      e.target.lastElementChild.className = "fa fa-angle-double-up";
    } else if (e.target.value === "title") {
      setOrder("asc");
      e.target.lastElementChild.className = "fa fa-angle-double-down";
    } else if (
      e.target.value === "rating" &&
      e.target.lastElementChild.className === "fa fa-angle-double-down"
    ) {
      setOrder("asc_rating");
      e.target.lastElementChild.className = "fa fa-angle-double-up";
    } else {
      setOrder("desc_rating");
      e.target.lastElementChild.className = "fa fa-angle-double-down";
    }
  };
  return (
    <nav>
      <input
        type="text"
        ref={searchBar}
        placeholder="search video"
        onChange={resetSearch}
      ></input>
      <button
        className="upper btn btn-primary"
        type="button"
        aria-label="search"
        onClick={() => setSearch(searchBar.current.value)}
      >
        Search
      </button>
      <button
        type="button"
        value="title"
        className="upper btn btn-warning"
        aria-label="sort-by-title"
        onClick={toggleSorting}
      >
        Sort by title <i className="" style={{ pointerEvents: "none" }}></i>
      </button>
      <button
        type="button"
        value="rating"
        className="upper btn btn-warning"
        aria-label="sort-by-rating"
        onClick={toggleSorting}
      >
        Sort by rating{" "}
        <i
          className="fa fa-angle-double-down"
          style={{ pointerEvents: "none" }}
        ></i>
      </button>
      <button
        type="button"
        className="upper btn btn-info"
        aria-label="make-add-video-visible"
        onClick={() => setIsVisible((isVisible) => !isVisible)}
      >
        Add video
      </button>
      {isVisible && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="add video title"
            onChange={handleChange}
          ></input>
          <input
            type="text"
            name="url"
            placeholder="add video link"
            onChange={handleChange}
          ></input>
          <button
            type="submit"
            className="upper btn btn-primary"
            aria-label="send-new-video"
          >
            Submit
          </button>
        </form>
      )}
    </nav>
  );
};

export default NavBar;
