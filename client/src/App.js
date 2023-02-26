import "./App.css";
import Videos from "/Users/admin/Desktop/Newsletter-Signup/Full-Stack-Project-Assessment/client/src/Components/Videos.js"
import AddVideos from "./Components/VideosForm"

function App() {
  return (
    <div className="App">
    <AddVideos />
        <header className="App-header">
        <h1>Video Recommendation</h1>
        <Videos />
      </header>
    </div>
  );
}

export default App;
