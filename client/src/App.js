import "./App.css";
import Header from "./components/Header";
import AddVideo from "./components/AddVideo";
import VideoCards from "./components/VideoCards";

function App() {
  return (
    <div className="App">
      <Header></Header>
      <AddVideo></AddVideo>
      <VideoCards></VideoCards>
    </div>
  );
}

export default App;
