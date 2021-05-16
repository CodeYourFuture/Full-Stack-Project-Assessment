import "./App.css";
import exampleresource from "./exampleresponse.json";
import Video from "./Video";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
        {exampleresource.map((el, index) => (
          <Video key={index} url={el.url} videoTitle={el.title} />
        ))}
      </header>
    </div>
  );
}

export default App;
