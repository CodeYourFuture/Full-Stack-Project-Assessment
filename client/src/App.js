import React, { useEffect } from "react";
import { useState } from "react";
import { Header, Forms, Cards } from "./components/index.js";
import { BeatLoader } from "react-spinners";

function App() {
  const [datas, setDatas] = useState([]);
  const [displaySpin, setDisplaySpin] = useState(true);

  const baseurl = "https://grizzly-shining-caravan.glitch.me";
  useEffect(() => {
    fetch(`${baseurl}/videos`)
      .then((res) => res.json())
      .then((data) => setDatas(data))
      .finally(() => {
        setDisplaySpin(false);
      });
    return () => {};
  }, []);

  // const callback = (parametre) => {
  //   if (parametre.url !== undefined) {
  //     setDatas((states) => {
  //       return [...states, parametre];
  //     });
  //   }
  // };

  return (
    <div>
      <Header />
      <Forms updateData={setDatas} />
      {displaySpin ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <BeatLoader color="maroon" />
        </div>
      ) : (
        <Cards videos={datas.filter((val) => !!val.url)} />
      )}
    </div>
  );
}

export default App;
