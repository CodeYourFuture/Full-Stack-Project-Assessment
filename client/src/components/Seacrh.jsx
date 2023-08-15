import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { useHttpClient } from "../hooks/http-hook";

const Search = ({ addVideo }) => {
  const randomId = uuidv4();
  const [videoData, setVideoData] = useState({
    id: randomId,
    url: "",
    title: "",
    rating: 0,
  });
  const { sendRequest, isLoading, error } = useHttpClient();

  const handleChange = ({ target }) => {
    const key = target.placeholder.toLowerCase();
    setVideoData({ ...videoData, [key]: target.value });
  };

  const handleAdding = async () => {
    try {
      const response = await sendRequest(
        `${process.env.REACT_APP_API_URL}/`,
        "POST",
        JSON.stringify(videoData),
        {
          "Content-Type": "application/json",
        }
      );
      addVideo(videoData);
      setVideoData({
        id: "",
        url: "",
        title: "",
        rating: 0,
      });
      console.log(response);
    } catch (err) {
      console.log("Error adding video.", error);
      console.log(err);
    }
  };

  console.log(videoData);
  return (
    <div className="section-container">
      <h3>Add Video</h3>
      <input
        className="input-field"
        type="text"
        value={videoData.url}
        placeholder="URL"
        onChange={handleChange}
      />
      <input
        className="input-field"
        type="text"
        value={videoData.title}
        placeholder="Title"
        onChange={handleChange}
      />
      <div className="button-container">
        <button
          className="cancel-button"
          onClick={() => {
            setVideoData({
              id: "",
              url: "",
              title: "",
              rating: 0,
            });
          }}
        >
          Cancel
        </button>
        <button className="add-button" onClick={handleAdding}>
          ADD
        </button>
      </div>
    </div>
  );
};

export default Search;
