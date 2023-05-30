import Videos from "./Comp/Videos";
import AddVid from "./Comp/AddVid";
import data from "./Data/data.json";
import { useState } from "react";

console.log(data)
function App() {
  const [videos, setVideos] = useState(data);

  return (
    <div >
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <AddVid />
      <Videos videos={videos} />
    </div>
  );
}

export default App;
