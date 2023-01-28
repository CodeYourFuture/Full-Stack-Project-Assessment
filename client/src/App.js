import { useState, useEffect } from "react";
import "./App.css";
import Videos from "./Components/Videos";
import Input from "./Components/Input";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const [tracker, setTracker] = useState(0);

  const [reqBody, setReqBody] = useState({
    title: "",
    url: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/videos")
      .then((data) => {
        setData(data.data);
      })
      .catch((err) => console.log(err));
  }, [tracker]);


  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post("http://localhost:5000/videos", reqBody)
      .then((value) => console.log(value))
      .catch((err) => console.log(err));
  setTracker((el) => el + 1);
  }
  

  function handleChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    setReqBody({
      ...reqBody,
      [name]: value,
    });
  }

  return (
    <div className="App">
      <h1>Video Recommendation</h1>
      <Input
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        reqBody={reqBody}
      />
      <Videos data={data} tracker={setTracker} />
    </div>
  );
}
export default App;
