import "./App.css";
import Addvideo from "./component/AddVideo";
import ShowingVideos from "./component/ShowingVideos";
import date from "./Data/exampleresponse.json";
function App() {
  return (
    <div className="App">
      <h1>Youtube Video Recommendation</h1>
      <Addvideo />
      <ShowingVideos result={date} />
    </div>
  );
}

export default App;