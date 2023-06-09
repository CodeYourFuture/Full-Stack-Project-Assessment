import { BrowserRouter } from "react-router-dom";
import videos from "./video-data.json";
import VideoList from "./components/VideoList";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <VideoList videos={videos} />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
