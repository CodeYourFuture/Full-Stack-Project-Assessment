import "./App.css";
import { useState } from "react";
import VideoDisplay from "./components/VideoDisplay";
//import videos from "./data/exampleresponse.json";

function App() {
  let [order, SetOrder] = useState(true);

  const handleClick = () => {
    SetOrder(!order);
    console.log(order);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <button onClick={handleClick}> order asc/desc</button>

      {<VideoDisplay className="display" order={order} />}
    </div>
  );
}

export default App;
