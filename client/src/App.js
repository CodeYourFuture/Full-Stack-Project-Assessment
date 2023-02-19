import React, { useEffect } from "react";
import { useState } from "react";
import { Header, Forms, Cards } from "./components/index.js";

function App() {
  const [datas, setDatas] = useState([]);

  const baseurl = "https://grizzly-shining-caravan.glitch.me";
  useEffect(() => {
    fetch(`${baseurl}/videos`)
      .then((res) => res.json())
      .then((data) => setDatas(data));
  }, []);

  const callback = (parametre) => {
    if (parametre.url !== undefined) {
      setDatas((states) => {
        return [...states, parametre];
      });
    }
  };

  return (
    <div>
      <Header />

      <Forms callback={callback} />
      <Cards videos={datas} />
    </div>
  );
}

export default App;
