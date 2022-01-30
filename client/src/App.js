import "./App.css";
import React from 'react';
import data from "./data";


function App() {

  console.log(data);
  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
        <div>
          {
           data.map((video)=> {
              return (
                <div key={video.id}>
                  <h2>{video.title}</h2>
                  <iframe width="560" height="315" src={video.url} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                  <p>{video.rating}</p>
                </div>
              )
           }
           )  
          }
        </div>

      </header>
    </div>
  );
}

export default App;
