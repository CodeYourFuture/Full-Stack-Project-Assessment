import "./App.css";
import React, { useState } from "react";
import exampleresponse from "./exampleresponse.json";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [displayVideo, setDisplayVideo] = useState(exampleresponse);

  const [newVidTitle, setNewVidTitle] = useState("");
  const [newVidUrl, setNewVidUrl] = useState("");

  const videoCountPlus = (id) => {
    const newCounterVideo = displayVideo.map((card) =>
      card.id === id ? { ...card, rating: card.rating + 1 } : card
    );
    setDisplayVideo(newCounterVideo);
  };

  const videoCountMinus = (id) => {
    const newCounterVideo = displayVideo.map((card) =>
      card.id === id ? { ...card, rating: card.rating - 1 } : card
    );
    setDisplayVideo(newCounterVideo);
  };

  const handleRemoveItem = (id) => {
    const filteredVideos = displayVideo.filter((card) => card.id !== id);
    setDisplayVideo(filteredVideos);
  };

  return (
    <div>
      <div className="App">
        <header className="App-header">
          <h1>Video Recommendation by Mandeep</h1>
        </header>
      </div>
      <div>
        <div>
          Search Bar
          <input
            className="searchbar"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div>
        <div>Add video</div>
      </div>
      <div>
        <form>
          <input
            className="inputBar"
            type="text"
            value={newVidTitle}
            onChange={(e) => setNewVidTitle(e.target.value)}
          />{" "}
          Title
          <input
            className="inputBar"
            type="text"
            value={newVidUrl}
            onChange={(e) => setNewVidUrl(e.target.value)}
          />{" "}
          URL
        </form>
      </div>
      <button
        onClick={(e) => {
          e.preventDefault();
          setDisplayVideo({
            title: newVidTitle,
            url: newVidUrl,
          });
          setNewVidTitle("");
          setNewVidUrl("");
        }}
      >
        Add a new Video
      </button>
      <div>
        <ul className="card-container">
          {displayVideo
            .filter((card) => {
              const { title, id } = card;
              const searchTermMatches = title
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
              return searchTermMatches;
            })

            .map((card) => (
              <li className="card">
                <h2>{card.title}</h2>
                <p>
                  {" "}
                  {
                    <iframe
                      src={`https://www.youtube.com/embed/${
                        card.url.split("v=")[1]
                      }`}
                      title="YouTube video player"
                    ></iframe>
                  }
                </p>
                <p>{card.rating}</p>
                <div className="button-container">
                  <button onClick={() => videoCountPlus(card.id)}>
                    Up Vote
                  </button>
                  <button onClick={() => videoCountMinus(card.id)}>
                    Down Vote
                  </button>
                </div>
                <div>
                  <button onClick={() => handleRemoveItem(card.id)}>
                    Delete this video
                  </button>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
