import "./App.css";
import VideoCard from "./Components/VideoCard";
import Header from "./Components/Header";
import AddVideo from "./Components/AddVideo";
import Data from "./exampleresponse.json";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState(Data);
  console.log(data);
  useEffect(() => {
    setData(data);
  }, [data]);

  return (
    <div className="App">
      <Header />
      <img
        alt="cow"
        src="https://www.redefinemeat.com/uk/wp-content/uploads/2022/04/APNG-3.png"
      ></img>
      <AddVideo data={data} setData={setData} />
      <VideoCard data={data} setData={setData} />
    </div>
  );
}

export default App;
