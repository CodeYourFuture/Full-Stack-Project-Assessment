import React, { useState } from "react";
import "./TopBar.css";
// A utility function for validation
const isValidInput = (title, url) => {
  const isValidTitle = typeof title === "string" && title.trim() !== "";
  const isValidUrl =
    typeof url === "string" &&
    /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtube\.be\/)[\w-]{11}$/.test(
      url
    );
  return isValidTitle && isValidUrl;
};
function TopBar({ onAddCard, cards, onOrderChange }) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [order, setOrder] = useState("desc");
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
    // Verify if the video already exists within the cards
    const isDuplicate = cards.some((card) => card.url === videoCode);
    if (isDuplicate) {
      setErrorMessage("This video is already added.");
      return;
    }
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; 
    const day = currentDate.getDate();
    const newCard = {
      id: Math.floor(Math.random() * 100000),
      title: title.trim(),
      url: videoCode,
      rating: 0,
      date: `${year}-${month}-${day}`, 
    };
    fetch("http://localhost:5000/videos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCard),
    })
      .then((response) => response.json())
      .then((data) => {
        onAddCard(data);
        setTitle("");
        setUrl("");
        setErrorMessage("");
      })
      .catch((error) => console.log(error));
  };

  const handleOrderChange = () => (
    setOrder(order === "desc" ? "asc" : "desc"),
    onOrderChange(order === "desc" ? "asc" : "desc")
  );
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
      <button onClick={handleOrderChange}>
        {order === "desc" ? "Desc" : "Asc"}
      </button>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
}
export default TopBar;
