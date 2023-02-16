
import React from "react";
import { useState } from "react";
import { Header, Forms, Cards } from "./components/index.js";


function App() {

  const [state, setState] = useState({})
  const callback = (parametre) => {
    setState(parametre)
  }

  return (
    <div>
     <Header/>
     <Forms callback={callback}/>
     <Cards newVideo = {state}/>
    </div>
   
  );
}

export default App;
