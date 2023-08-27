import "./App.css";
import Footer from "./Components/Footer";
import NewVideo from "./Components/NewVideo";
import Video from "./Components/Video";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
        <div>
          <NewVideo />
          <Video />
        </div>
      </header>
      <Footer/>
    </div>
  );
}

export default App;


