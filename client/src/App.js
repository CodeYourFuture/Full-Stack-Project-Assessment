import "./App.css";
import "./Card.css";
import "animate.css/animate.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, React, createContext, useEffect, useCallback } from "react";
import { AllVideos } from "./AllVideos";
import { AddVideoForm } from "./AddVideoForm";
import { Header } from "./Header";
import { Main } from "./Main";
import { HomeHero } from "./HomeHero";
import { Steps } from "./Steps";
import { About } from "./About.js";

export let videosContext = createContext(null);

function App() {
  const [videos, setVideos] = useState([]);
  const [isDesc, setIsDesc] = useState(true);

  // const url = "http://localhost:5500/videos";
  const url = "https://full-stack-project-server.onrender.com/videos";

  const fetchData = useCallback(() => {
    fetch(`${url}?sort=${isDesc ? "desc" : "asc"}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setVideos(data);
      })
      .catch((error) => error);
  }, [url, isDesc]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {}, [videos]);

  return (
    <div className="App">
      <videosContext.Provider value={{ videos, setVideos }}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <Header />
                  <HomeHero />
                  <About />
                  <Main />
                  <div className="steps-form-wrapper">
                    <Steps />
                    <AddVideoForm />
                  </div>
                  {videos.length > 0 && (
                    <AllVideos
                      isDesc={isDesc}
                      setIsDesc={setIsDesc}
                      fetchData={fetchData}
                    />
                  )}
                </div>
              }
            />
            <Route
              path="/about"
              element={
                <div>
                  <h1>More info to be added soon, stay tuned...</h1>
                  <p>Yes the contrast here needs adjusting.</p>
                  <p>
                    Guess the Lighthouse score for accessibility for this page?
                  </p>
                  <p>Thank you for visiting! 😎</p>
                  <a href="/">Go back</a>
                </div>
              }
            />
          </Routes>
        </BrowserRouter>
      </videosContext.Provider>
    </div>
  );
}

export default App;
