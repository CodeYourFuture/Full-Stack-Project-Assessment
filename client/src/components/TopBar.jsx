import React, { useState } from "react";
import "./TopBar.css";

// Validation utility function
const isValidInput = (title, url) => {
  const isValidTitle = typeof title === "string" && title.trim() !== "";
  const isValidUrl =
    typeof url === "string" &&
    /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w-]{11}$/.test(
      url
    );
  return isValidTitle && isValidUrl;
};

function TopBar({ onAddCard, cards }) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleAddClick = () => {
    if (!isValidInput(title, url)) {
      setErrorMessage(
        "Input URL or Title is invalid. Please provide a valid YouTube link."
      );
      return;
    }

    const videoCode = url.split("v=")[1];

    // Check if the video is already in the cards
    const isDuplicate = cards.some((card) => card.url === videoCode);
    if (isDuplicate) {
      setErrorMessage("This video is already added.");
      return;
    }

    const newCard = {
      id: Math.floor(Math.random() * 100000),
      title: title.trim(),
      url: videoCode,
      rating: 0,
    };

    onAddCard(newCard);

    setTitle("");
    setUrl("");
    setErrorMessage("");
  };

  return (
    <div className="top-bar">
      <div className="input-top">
        <label htmlFor="titleInput">Title</label>
        <input
          placeholder="Title"
          id="titleInput"
          type="text"
          value={title}
          onChange={handleTitleChange}
          required
        />
      </div>
      <div className="input-top">
        <label htmlFor="urlInput">URL</label>
        <input
          placeholder="URL"
          id="urlInput"
          type="text"
          value={url}
          onChange={handleUrlChange}
          required
        />
      </div>
      <button onClick={handleAddClick}>ADD</button>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
}

export default TopBar;
