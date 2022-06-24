import React, { useState, useEffect } from "react";

import Button from "@mui/material/Button";

import Header from "./Components/Header";
import AddVideo from "./Components/AddVideo";
import Videos from "./Components/Videos";
import DeleteModal from "./Components/DeleteModal";

import Context from "./Context/Context";

import "./App.css";

const App = () => {
  const [videos, setVideos] = useState([]); // The videos to be displayed
  const [order, setOrder] = useState("desc");
  const [hideForm, setHideForm] = useState(false); // Toggles the form to add video
  const [toDelete, setToDelete] = useState();
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`https://cyf-craig-dsilva-videos.herokuapp.com/?order=${order}`)
      .then((res) => res.json())
      .then((data) => {
        setVideos(data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, [order]);

  return (
    <Context.Provider
      value={{ videos, setVideos, setToDelete, setModal, setError }}
    >
      <div className="App">
        <Header />
        {!hideForm ? (
          <Button
            sx={{
              mb: 5,
              mr: 2,
            }}
            variant="contained"
            onClick={() => setHideForm(true)}
          >
            Add Video
          </Button>
        ) : (
          <AddVideo
            videos={videos}
            handleVideos={setVideos}
            handleLoading={setLoading}
            hideForm={() => setHideForm()}
          />
        )}
        <Button
          sx={{ mb: 5 }}
          variant="contained"
          onClick={() => setOrder(order === "desc" ? "asc" : "desc")}
        >
          {order === "asc" ? "descending" : "ascending"}
        </Button>
        {error && <p>{error}</p>}
        {!loading && videos.length > 0 ? (
          <Videos videos={videos} />
        ) : (
          <p>Loading...</p>
        )}
        {modal && <DeleteModal id={toDelete} closeModal={setModal} />}
      </div>
    </Context.Provider>
  );
};

export default App;
