import "./App.css";
import exampleresponse from "./exampleresponse.json"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      {exampleresponse.map(video=>
      {
        return (<div>
                <h2>{video.title}</h2>
                <iframe width="560" height="315" src={`https://www.youtube.com/embed/${video.url.split("=")[1]}`}title="YouTube video player" frameborder="0"allow="accelerometer; autoplay; clipboard-write; encrypted-media;gyroscope; picture-in-picture" allowfullscreen></iframe>
                 <h2>{video.rating}</h2>
                 <img src="https://www.svgrepo.com/show/334337/upvote.svg" alt="Up Vote" width="50" height="50"></img>
                 <img src="https://www.svgrepo.com/show/333916/downvote.svg" alt="Down Vote" width="50" height="50"></img>
                </div>)
      })}
    </div>
  );
}

export default App;
