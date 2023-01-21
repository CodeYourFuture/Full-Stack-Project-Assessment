import { useState } from "react";
import "./App.css";
import Videos from "./Components/Videos";
import Input from "./Components/Input";
import data from "./exampleresponse.json";

function App() {
  const [copyData, setCopyData] = useState(data);
  const [reqBody, setReqBody] = useState({
    title: "",
    url: "",
  });

  function handleSubmit() {
    let result = [
      ...copyData,
      {
        id: 0,
        title: reqBody.title,
        url: reqBody.url,
        rating: 2,
      },
    ];
    setCopyData(result);
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
      <Videos copyData={copyData} setCopyData={setCopyData}/>
    </div>
  );
}
export default App;

