import "./App.css";
import Deletevideo from "./Deletevideo";
import exampleresource from "./exampleresponse.json";
import Video from "./Video";
import Votes from "./Votes";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
        {exampleresource.map((el, index) => (
          <div key={index}>
            <Video url={el.url} videoTitle={el.title} />
            <Votes />
            <Deletevideo />
          </div>
        ))}
      </header>
    </div>
  );
}

export default App;
