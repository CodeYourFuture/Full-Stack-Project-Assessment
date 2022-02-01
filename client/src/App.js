import "./App.css";
import React , { useState } from 'react';
import { BsFillHandThumbsUpFill } from "react-icons/bs";
import { BsFillHandThumbsDownFill } from "react-icons/bs";
import data from "./data.json";


function App() {
const [videos, setVideos] = useState(data);
 const [like, setLike] = useState(0);
 const [disLike, setDisLike] = useState(0);
 const clickLike = () => {
   setLike((like) => like + 1);
 };
 const clickDisLike = () => {
   setDisLike((disLike) => disLike + 1);
 };
function  clickHandler (ID){
setVideos(videos.filter((item) => item.id !== ID));
 }
  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
        <div>
          {
           videos.map((video)=> {
              return (
                <div key={video.id}>
                  <div>
                    <BsFillHandThumbsUpFill
                      onClick={clickLike}
                  
                    />
                    <span>{like}</span>
                    <h5>Vote</h5>

                    <BsFillHandThumbsDownFill
                      onClick={clickDisLike}
                    
                    />
                    <span>{disLike}</span>
                  </div>
                  <h2>{video.title}</h2>
                  <iframe
                    title={video.title}
                    width="560"
                    height="315"
                    src={video.url.replace("watch?v=", "embed/")}
                    frameborder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                  <p>{video.rating}</p>
                  <button onClick={() => clickHandler(video.id)}>Delete</button>
                </div>
              );
           }
           )  
          }
        </div>

      </header>
    </div>
  );
}

export default App;
