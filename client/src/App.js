import React, { useState, useEffect } from "react";
import "./App.css";
import Video from "./Video";
import AddVideo from "./AddVideo";
import ImageList from "@mui/material/ImageList";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

function App() {
  const initialError = {
    errorExists: false,
    errorStatus: 0,
    errorMessage: "",
  };
  const [videoData, setVideoData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [errorInfo, setErrorInfo] = useState(initialError);

  const deleteVideo = (id) => {
    setVideoData((videoData) => videoData.filter((el) => el.id !== id));
  };

  const addVideo = (newVid) => {
    console.log("I got here", newVid);
    setVideoData((videoData) => videoData.concat(newVid));
  };

  const updateRatings = (votes, id) => {
    setVideoData((videoData) =>
      videoData.map((el) => {
        if (el.id === id) {
          el.rating = votes;
        }
        return el;
      })
    );
    console.log(videoData);
  };

  useEffect(() => {
    console.log("Fetching data...");
    fetch(`http://localhost:5000`)
      .then((res) => {
        if (res.status >= 300) {
          setErrorInfo((errorInfo) => ({ ...errorInfo, errorExists: true }));
          setErrorInfo((errorInfo) => ({
            ...errorInfo,
            errorStatus: res.status,
          }));
          setErrorInfo((errorInfo) => ({
            ...errorInfo,
            errorMessage: res.statusText,
          }));
          console.log(res.status, errorInfo.errorStatus);
        } else {
          return res.json();
        }
      })
      .then((data) => {
        if (data) {
          setVideoData(data);
          setLoaded(true);
          console.log(loaded);
        }
      });
  }, [errorInfo.errorStatus, loaded]);

  return (
    <div className="App">
      <header>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              ></IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Video Recommendation
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>
      </header>
      <main>
        <section>
          <ImageList cols={3} gap={8} className="imagelistgridcontainer">
            {videoData
              .sort((a, b) => {
                const ratingsA = a.ratings;
                const ratingsB = b.ratings;
                if (ratingsA < ratingsB) {
                  return -1;
                }
                if (ratingsA > ratingsB) {
                  return 1;
                }
                // names must be equal
                return 0;
              })
              .map((video) => (
                <Video
                  key={video.id}
                  video={video}
                  vidId={video.id}
                  deleteVideo={deleteVideo}
                  updateRatings={updateRatings}
                />
              ))}
          </ImageList>
        </section>
        <section>
          <h2>Add a New Video</h2>
          <AddVideo addVideo={addVideo} />
        </section>
      </main>
    </div>
  );
}

export default App;
