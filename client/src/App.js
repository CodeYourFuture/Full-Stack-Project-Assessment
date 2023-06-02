import Search from "./components/Search";
import AddVideos from "./components/Add-Videos";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import VideoCard from "./components/VideoCard";

function App() {
  const [visible, setVisible] = useState(false);
  const [videos, setVideos] = useState([]);
  const [addedVideo, setAddedVideo] = useState({
    title: "",
    url: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAddedVideo((addedVideo) => ({
      ...addedVideo,
      [name]: value,
    }));
  };

  const addToVideos = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(addedVideo),
      });
      const data = await response.json();
      setVideos(data);
    } catch (err) {
      console.error(err);
    }
    event.target.reset();
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVERURL}/`);
        const data = await response.json();
        setVideos(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);

  function inputsTableVisibility() {
    setVisible((prevVisible) => !prevVisible);
  }

  const newVote = async (videoId, changing) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVERURL}/${videoId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ changing: changing }),
        }
      );
      if (response.status === 200) {
        const data = await response.json();
        setVideos(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteVote = async (videoId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVERURL}/${videoId}`,
        {
          method: "DELETE",
        }
      );
      if (response.status === 200) {
        const data = await response.json();
        setVideos(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearchInput = async (event) => {
    const input = event.target.value;
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVERURL}/search?input=${input}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.status === 200) {
        const data = await response.json();
        setVideos(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="App">
      <Header />
      <Search handleSearchInput={handleSearchInput} />
      <button className="add-video" onClick={inputsTableVisibility}>
        Add Video
      </button>
      {visible && (
        <AddVideos
          inputsTableVisibility={inputsTableVisibility}
          addToVideos={addToVideos}
          handleChange={handleChange}
        />
      )}
      <div className="videos-container">
        {videos.map((video) => (
          <VideoCard
            key={video.id}
            video={video}
            newVote={newVote}
            deleteVote={deleteVote}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
