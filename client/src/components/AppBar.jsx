import React, { useState } from "react";
import "./AppBar.css";

// Validation utility function
const isValidInput = (title, url) => {
  const isValidTitle = typeof title === "string" && title.trim() !== "";
  const isValidUrl =
    typeof url === "string" &&
    /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtube\.be\/)[\w-]{11}$/.test(
      url
    );
  return isValidTitle && isValidUrl;
};
function AppBar({ onAddCard, cards }) {
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
        "Title or URL submitted is incorrect. Give us a working YouTube link, please. 🔴"
      );
      return;
    }
    const videoCode = url.split("v=")[1];
    // Check if the video is already in the cards
    const isDuplicate = cards.some((card) => card.url === videoCode);
    if (isDuplicate) {
      setErrorMessage("This video has already been added. 😲");
      return;
    }
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Note: Month is zero-based
    const day = currentDate.getDate();
  
    const newCard = {
      // Generate a random ID for the new card
      id: Math.floor(Math.random() * 100000),

      // Trim the title to remove leading/trailing whitespace
      title: title.trim(),

      // Set the video code extracted from the URL
      url: videoCode,

      // Initialize the rating for the new card to 0
      rating: 0,

      // Construct the date string in the format "YYYY-MM-DD"
      date: `${year}-${month < 10 ? "0" + month : month}-${
        day < 10 ? "0" + day : day
      }`,
    };

    // Send a POST request to the server with the new card data,
    // then handle the response by adding the card, resetting inputs,
    // and clearing error messages. Log any errors that occur.
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
  return (
    <div className="top-bar">
      <div className="input">
        <label htmlFor="titleInput"></label>
        <input
          placeholder="Title"
          id="titleInput"
          type="text"
          value={title}
          onChange={handleTitleChange}
          required
        />
      </div>
      <div className="input">
        <label htmlFor="urlInput"></label>
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
      {/* This code conditionally renders an error message if errorMessage exists. */}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
}
export default AppBar;
