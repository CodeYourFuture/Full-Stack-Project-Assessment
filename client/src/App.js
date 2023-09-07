import "./App.css";
import videoData from "./exampleresponse.json";
import Videocard from "./components/Videocard";

console.log(videoData);

function App() {

  const videoElements = videoData.map((video) => {
    return <Videocard />;
  })
  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <div>{videoElements}</div>
      
    </div>
  );
}

export default App;
