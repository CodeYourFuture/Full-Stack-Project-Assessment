import "./App.css";
import "./Card.css";
import "animate.css/animate.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, React, createContext } from "react";
import { AllVideos } from "./AllVideos";
import { AddVideoForm } from "./AddVideoForm";
import { Header } from "./Header";
import VideosJson from "./exampleresponse.json";
import { HomeCarousel } from "./HomeCarousel";
import { Main } from "./Main";
import { HomeHero } from "./HomeHero";
import { Steps } from "./Steps";
import { Login } from "./Login";
import { Footer } from "./Footer";
import { About } from "./About.js";

export let videosContext = createContext(null);

function App() {
  const [videos, setVideos] = useState(VideosJson);

  return (
    <div className="App">
      <videosContext.Provider value={{ videos, setVideos }}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
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
                  <HomeCarousel />
                  <AllVideos />
                  <Footer />
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
