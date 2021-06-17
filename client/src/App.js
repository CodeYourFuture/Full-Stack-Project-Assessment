import "./App.css";
import SearchBox from "./components/SearchBox";
import Videos from "./components/Videos"
import VideoForm from "./components/VideoForm";


function App() {

  return (
    <div className="App">
      <VideoForm />
      <Videos />
    </div>
  );
}

// 2. For each video, display a React component that contains
//   - The videos title
//     - An embedded video
//       - The number of votes the video has
//         - A button that when clicked removes the video

export default App;
