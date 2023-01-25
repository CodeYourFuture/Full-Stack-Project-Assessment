import "./App.css";
import InsertVideo from "./InsertVideo";
// import video from "./singleVideo.json";
import defaultVideos from "./exampleresponse.json";

function App() {
  return (
    <div className="App">
      <header className="my-App-header">
        <h1>Video Recommendation</h1>
      </header>
      <body>
          {defaultVideos.map((video, key) => (
            <InsertVideo video={video} key={key}/>
            
          ))}
      </body>
    </div>
  );
}

export default App;
