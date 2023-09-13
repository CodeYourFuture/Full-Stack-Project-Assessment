import "./App.css";
import Addvideo from "./component/AddVideo";
import ShowingVideos from "./component/ShowingVideos";
import data from "./data/exampleresponse.json";
function App() {
  return (
    <div className="App">
      <h1>Video Recommendation</h1>
      <Addvideo />
      <ShowingVideos result={data} />
    </div>
  );
}

export default App;
