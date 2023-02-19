import "./App.css";
import React from "react";
import Header from "./components/Header";
import VideoCard from "./components/VideoCard";
import Form from "./components/Form"
import { useState } from "react";
import Cards from "./components/Cards";

function App() {
  const [datas, setDatas] = useState ([]);
  const callNewVideo = (parametre) => {
    if (parametre.url !== undefined) {
      setDatas((states) => {
        return [...states, parametre];
      });
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
