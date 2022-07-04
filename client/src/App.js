import React, {useState, useEffect } from "react";
import AddNewVideo from "./AddNewVideo";
import "./App.css";
// import videoData from "./exampleresponse.json";
import RenderVideo from "./RenderVideo";

function App() {
  const [allVideos, setAllVideos] = useState([]);
  const [addVideo, setAddVideo] = useState(false);


  //This deletes one video
  // const deleteVideos = (id) => {
  //   setAllVideos((allVideos) => allVideos.filter((video) => video.id !== id))
  // }
  useEffect(() => {
    generateVideo()
  }, []);

  const urlToFetch = "http://localhost:5000/";

  const generateVideo = () => {
    console.log('This is a test')
    fetch(`${urlToFetch}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setAllVideos(data);
      });
  }
    return (
      <div className="">
        <header>
          <h2 className="">Video Recommendation</h2>
        </header>
        <button
          onClick={() => setAddVideo(true)}
          type="button"
          className="btn btn-link"
        >
          Add Video
        </button>
        {addVideo && (
          <AddNewVideo
            newVideo={allVideos}
            setAllVideos={setAllVideos}
            setAddVideo={setAddVideo}
            urlToFetch={urlToFetch}
            generateVideo={generateVideo}
          />
        )}
        <div className="container-fluid">
          <div className="row">
            {allVideos
              .sort((a, b) => b.rating - a.rating)
              .map((video) => (
                <div
                  className="col-xs-12 col-sm-6 col-lg-4 col-xl-3"
                  key={video.id}
                >
                  {
                    <RenderVideo
                      video={video}
                      urlToFetch={urlToFetch}
                      generateVideo={generateVideo}
                    />
                  }
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  
}

export default App;
