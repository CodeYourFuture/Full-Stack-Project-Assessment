import "./App.css";
import React, { useState } from "react";
import exampleresponse from "./exampleresponse.json";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [displayVideo, setDisplayVideo] = useState(exampleresponse);

  const [newVidTitle, setNewVidTitle] = useState("");
  const [newVidUrl, setNewVidUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const addVideo = {
      rating: 0,
      title: newVidTitle,
      url: newVidUrl,
    };
    setNewVidTitle("");
    setNewVidUrl("");

    setDisplayVideo(displayVideo.concat(addVideo));
  };

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
          <h1>Video Recommendation</h1>
        </header>
      </div>
      <div>
        <div>
          Hi i'm a Search Bar
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
        <form onSubmit={handleSubmit}>
          <input
            className="inputBar"
            type="text"
            name="title"
            value={newVidTitle}
            onChange={(e) => setNewVidTitle(e.target.value)}
          />{" "}
          Title
          <input
            className="inputBar"
            type="text"
            name="url"
            value={newVidUrl}
            onChange={(e) => setNewVidUrl(e.target.value)}
          />{" "}
          URL
          <button type="submit">Submit Form</button>
          <p></p>
        </form>
      </div>

      <div>
        <ul className="card-container">
          {displayVideo
            .filter((card) => {
              const { title, id } = card;
              if (title) {
                const searchTermMatches = title
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase());
                return searchTermMatches;
              }
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
                      frameborder="0"
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
