import "./App.css";
import { useState } from "react";
import AddAndSearch from "./Components/AddAndSearch";
import Footer from "./Components/Footer";
import NavBar from "./Components/NavBar";
import VideoList from "./Components/VideoList";
import Welcome from "./Components/Welcome";
import AddVideo from "./Components/AddVideo";
import exampleresponse from "./exampleresponse.json";
function App() {
  const [keyword, setKeyword] = useState("");

  const [videoCards, setVideoCards] = useState(exampleresponse);

  return (
    <>
      <NavBar />
      <Welcome />
      <AddAndSearch setKeyword={setKeyword} />
      <AddVideo setVideoCards={setVideoCards} videoCards={videoCards} />
      <VideoList
        setKeyword={setKeyword}
        keyword={keyword}
        videoCards={videoCards}
        setVideoCards={setVideoCards}
      />
      <Footer />
    </>
  );
}

export default App;
