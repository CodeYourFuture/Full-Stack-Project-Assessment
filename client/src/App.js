import "./App.css";
import Search from "./components/Search";
import AddVideos from "./components/Add-Videos";
import { useEffect, useState } from "react";
// import data from "./exampleresponse.json";
import Header from "./components/Header";
// import { nanoid } from "nanoid";

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
        console.log("WORKED");
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

  return (
    <div className="App">
      <Header />
      <Search />
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
      <div>
        <div>
          {videos.map((video) => (
            <div key={video.id}>
              <div>{video.title}</div>
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${video.url.split("=")[1]}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <div>{video.rating}</div>
              <button onClick={() => newVote(video.id, 1)}>Up Vote</button>
              <button onClick={() => newVote(video.id, -1)}>Down Vote</button>
              <button onClick={() => deleteVote(video.id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
