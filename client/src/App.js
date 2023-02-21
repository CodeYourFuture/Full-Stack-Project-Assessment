import "./App.css";
import React from "react";
import Header from "./components/Header";
import Form from "./components/Form";
import { useState } from "react";
import Cards from "./components/Cards";

function App() {
  const [datas, setDatas] = useState([]);
  const callNewVideo = (videoData) => {
    if (videoData.url !== undefined) {
      setDatas([...datas, videoData]);
    }
  };

  return (
    <div>
      <Header />
      <Form callNewVideo={callNewVideo} />
      <Cards videos={datas} />
    </div>
  );
}

export default App;

// e.preventDefault = > validation. Onemli
// Compnentlerde kimin kime bagli oldugu onemli.
