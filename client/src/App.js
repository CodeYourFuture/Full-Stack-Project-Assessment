import "./App.css";
import { useState } from "react";
import exampleresponse from "./exampleresponse.json";

function App() {
  const [data, setData] = useState(exampleresponse)
  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
    </div>
  );
}

export default App;
