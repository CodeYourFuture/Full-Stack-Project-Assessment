import React ,{useState} from "react"
import "./App.css";
import Header from "../src/components/Header";
import AddVideo from "../src/components/AddVideo";
import Search from "../src/components/Search";
import VideoCards from "../src/components/VideoCards";
import staticData from "../src/data/exampleresponse.json";

const App = () => {
  const [data, setData] = useState(staticData);
  const [search, setSearch] = useState("");

  const filteredData = data.filter(video => video.title.toUpperCase().includes(search.toUpperCase()));
  console.log(filteredData)

  const handleSearch =(e) => {
      setSearch(e.target.value);
  }

  return (
    <div className="App">
      <Header />
      <div className="d-flex">
        <AddVideo />
        <Search search={search} setSearch={setSearch} handleSearch={handleSearch}/>
      </div>
      <VideoCards data={data} filteredData={filteredData} setData={setData}/>
    </div>
  );
}

export default App;
