import "./App.css";
import Navbar from "./Components/Navbar";
import VideosBoard from "./Components/VideosBoard";
import AddBar from "./Components/AddBar";
import data from "./exampleresponse.json";
import "bootstrap/dist/css/bootstrap.min.css";


function App() {
  console.log("app is render");
  return (
    <>
      <Navbar />
      {/* <SearchBar /> */}
      <AddBar />
      <VideosBoard data={data} />
    </>
  );
}

export default App;
