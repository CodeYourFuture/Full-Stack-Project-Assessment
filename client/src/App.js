import "./App.css";
import Addvideo from "./component/AddVideo";
import Footer from "./component/Footer";
import ShowingVideos from "./component/ShowingVideos";
// import date from "./Data/exampleresponse.json",;

function App() {
  return (
    <div className="App">
      <h1>Video Recommendation</h1>
      <Addvideo />
      <ShowingVideos />
      <Footer />
    </div>
  );
}

export default App;
