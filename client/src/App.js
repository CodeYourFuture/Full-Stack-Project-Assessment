import Heading from "./Heading";
import Home from "./Home";
import Form from "./Form";

import Search from "./Search";
import Cards from "./Cards";
import { useState } from "react";

function App() {
  const [videos, setVideos] = useState([
    {
      id: 523523,
      title: "Never Gonna Give You Up",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      rating: 23,
    },
    {
      id: 523427,
      title: "The Coding Train",
      url: "https://www.youtube.com/watch?v=HerCR8bw_GE",
      rating: 230,
    },
  ]);

  const addVideo=(video)=>{
    setVideos([video,...videos])
  }

  return (
    <div className="App">
      <Heading />
      <div className="form-container">
        <Form addVideo={addVideo}/>
        <Search />
      </div>

      <Cards videos={videos}/>

      {/* <header className="App-header"></header> */}
    </div>
  );
}

export default App;
