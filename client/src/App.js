
import React from "react";
import { useState } from "react";
import { Header, Forms, Cards } from "./components/index.js";
import ExampleResponse from  "./data/exampleresponse.json"


function App() {

  const [datas, setDatas] = useState(ExampleResponse)
  const callback = (parametre) => {
    if(parametre.url !== undefined){
      setDatas((states) => {
        return [...states,parametre]
      })
    }
  }

  return (
    <div>
     <Header/>
     <Forms callback={callback}/>
     <Cards videos = {datas}/>
    </div>
   
  );
}

export default App;
