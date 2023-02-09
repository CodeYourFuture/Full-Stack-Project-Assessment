import { useEffect, useState } from "react";
import "./App.css";
import Video from "./Video";
import Insert from "./Insert";
import Switch from "@mui/material/Switch";

function App() {
  const [order, setOrder] = useState("desc");
  const [data, setData] = useState(null);
  const [url, setURL] = useState(`order/?by=${order}`);

  const handleOrder = (e) => {
    let label = order === "desc" ? "asc" : "desc";
    setOrder(label);
    setURL(`order/?by=${order}`);
  };

  const handleSearch = (e) => {
    console.log(e);
    let theURL;
    theURL = e ? `/${e}` : `order/?by=${order}`;
    setURL(theURL);
  };

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [url]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
        <div>
          Sort
          <Switch /*defaultChecked*/ onClick={handleOrder} />
        </div>
        <div>
          <input
            type="text"
            name="input"
            onInput={(e) => handleSearch(e.target.value)}
          />
        </div>
      </header>
      <main>
        <div className="insert">
          <Insert setURL={setURL} order={order} />
        </div>
        <br></br>
        <div>
          {data
            ? data.map((video, key) => (
                <Video setURL={setURL} order={order} video={video} key={key} />
              ))
            : "NO Videos Found"}
        </div>
      </main>
    </div>
  );
}

export default App;
