import React, { useState } from "react";
// import Votes from "./Votes";

import SearchBar from "./SearchBar";
import Content from "./Content";
import Buttons from "./Buttons";

import "../App.css";

function Main({ data }) {
  const [wordEntered, setWordEntered] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [allData, setAllData] = useState(data);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newData = {
      id: Math.floor(Math.random() * 1000),
      title,
      url,
    };

    await fetch(data, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(newData),
      headers: {
        "Content-type": "application/json",
      },
    });

    setAllData((prevState) => [...prevState, newData]);

    setTitle("");
    setUrl("");

    // console.log(title);
    // console.log("Enviou")
    // console.log(newData);
  };

  const handleDelete = async (id) => {
    await fetch(data + id, {
      method: "DELETE",
    });
    setAllData((prevState) => prevState.filter((video) => video.id !== id));
  };

  return (
    <main>
      <div className="add-video-and-search">
        <div className="add-video">
          <a
            onClick={() => setShowForm(!showForm)}
            className="dropdown"
            href="#0"
          >
            Add Video
          </a>
          {showForm && (
            <form className="form" onSubmit={handleSubmit}>
              <label>
                Title
                <input
                  className="input"
                  name="title"
                  type="text"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  required
                />
              </label>
              <label>
                URL
                <input
                  className="input"
                  name="vUrl"
                  type="text"
                  onChange={(e) => setUrl(e.target.value)}
                  value={url}
                  required
                />
              </label>
              <Buttons setTitle={setTitle} setUrl={setUrl} />
            </form>
          )}
        </div>
        <SearchBar wordEntered={wordEntered} setWordEntered={setWordEntered} />
      </div>
      <Content
        handleDelete={handleDelete}
        data={allData}
        wordEntered={wordEntered}
      />
    </main>
  );
}

export default Main;
