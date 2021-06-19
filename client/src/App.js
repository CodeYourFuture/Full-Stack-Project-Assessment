import "./App.css";
import Header from "./components/Header";
import Adding from "./components/Adding";
import Search from "./components/Search";
import Video from "./Video";
import videos from "./exampleresponse.json";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="container">
        <Adding />
        <Search />
      </div>
      {videos.map(function (video, index) {
        return <Video key={index} title={video.title} url={video.url} />;
      })}
    </div>
  );
}

export default App;
