import React from "react";
import "./App.css";

// import results from "./exampleresponse.json";
import Form from "./Form";

function App() {
  // const [info, setInfo] = useState(results);
  return (
    <div className="App">
      <header className="App-header bg-primary text-white">
        <h1>Video Recommendation</h1>
      </header>
      <Form />
    </div>
  );
}

export default App;
