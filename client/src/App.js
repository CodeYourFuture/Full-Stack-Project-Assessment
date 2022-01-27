import "./App.css";
import AddVideo from "./AddVideo";
import Video from "./Video";
import ExampleResponse from "./exampleresponse.json";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <main>
        <AddVideo />
        <Video videosData={ExampleResponse} />
      </main>
    </div>
  );
}

export default App;
