import "./App.css";
import AddVideo from "./components/AddVideo";
import Search from "./components/Search";
import SingleVideo from "./components/SingleVideo";
import data from "./exampleresponse.json";
console.log(data);

function App() {
  return (
    <div className="App">
      <header className="header">
        <h1>Video Recommendation</h1>
      </header>
      <div className="input-section">
        <AddVideo />
        <Search />
      </div>
      <div className="video-list">
        {data.map((video) => {
          return <SingleVideo key={video.id} {...video} />;
        })}
      </div>
    </div>
  );
}

export default App;
