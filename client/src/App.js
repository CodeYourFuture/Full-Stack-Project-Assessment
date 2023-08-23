import "./App.css";
import { useState } from "react";
import AddAndSearch from "./Components/AddAndSearch";
import Footer from "./Components/Footer";
import NavBar from "./Components/NavBar";
import VideoList from "./Components/VideoList";
import Welcome from "./Components/Welcome";
function App() {
  const [keyword, setKeyword] = useState("");
  return (
    <>
      <NavBar />
      <Welcome />
      <AddAndSearch setKeyword={setKeyword} />
      <VideoList setKeyword={setKeyword} keyword={keyword} />
      <Footer />
    </>
    /* <div className="App">
        <header className="App-header">
          <h1>Video Recommendation</h1>
        </header>
      </div> */
  );
}

export default App;
