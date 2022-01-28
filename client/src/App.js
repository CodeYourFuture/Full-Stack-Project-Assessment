import { useState } from "react";

import "./style/App.css"; // import master CSS file
import VideoCards from "./components/VideoCards";
import AddVideo from "./components/AddVideo";

const data = require("./data/exampleresponse.json");

const App = () => {
  const [dataCopy, setDataCopy] = useState(data);

  return (
    <div id="whole-page" className="App">
      <header id="page-header" className="page-header">
        <h1 id="first-heading" className="first-heading">
          Videos!
        </h1>
      </header>
      <main id="main-content">
        <AddVideo data={dataCopy} setData={setDataCopy} />
        <VideoCards data={dataCopy} setData={setDataCopy} />
      </main>
    </div>
  );
};

export default App;
