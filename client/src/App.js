import React from "react";
import "./App.css";
import Header from "./components/Header";
import data from "./exampleresponse.json";
import Footer from "./components/Footer";

data = data.map(({ url }) => url.replace("watch?v=", "embed/"));

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
        <h1>Video Recommendation</h1>
        {data.map((item, i) => (
          <div key={i}>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/{item.url}"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ))}
      </header>
      <Footer />
    </div>
  );
}

export default App;
