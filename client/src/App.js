import "./App.css";
import Header from "../src/components/Header";
import AddVideo from "../src/components/AddVideo";
import Search from "../src/components/Search";
import VideoCard from "../src/components/VideoCard";
import data from "../src/data/exampleresponse.json";

const App = () => {

  return (
    <div className="App">
      <Header />
      <div className="d-flex">
        <AddVideo />
        <Search />
      </div>
      <VideoCard data={data}/>
    </div>
  );
}

export default App;
