import React, {useState} from "react";
import "./App.css";
import VideoInfo from "./VideoInfo";
import movieData from "./movieData.json";
// import Iframe from "react-iframe";

function App() {
  // const [vote, setVote] = useState();

  // const voteUp = (movie) => {
  //   setVote(movie.rating);
  //   movie.rating = vote + 1;
  // };
  // const voteDown = (movie) => {
  //   setVote(movie.rating);
  //   movie.rating = vote - 1;
  // };
  return (
    <div className="App container-fluid">
      <header className="App-header bg-dark">
        <h1>Video Recommendation</h1>
      </header>

      <main className="videoContainer">
        {movieData.map((movie, index) => (
          <VideoInfo key={index} movie={movie} />
        ))}
      </main>
    </div>
  );
}

export default App;
