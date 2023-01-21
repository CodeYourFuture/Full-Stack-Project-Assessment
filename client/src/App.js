import "./App.css";
import Heading from "./Heading";
import VideoData from "./exampleresponse.json"
import VideosList from "./VideosList";
import Form from "./Form";

function App() {
  return (
    <div className="App">
      <Heading />
      <Form />
      <VideosList videoData={VideoData}/>
    </div>
  );
}

export default App;
