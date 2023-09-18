import React from "react";
import youtubeLogo from "./components/images/youtubeLogo.png";
import MainContainer from "./components/MainContainer";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      <header className="flex flex-row pb-8 pt-8 text-3xl sm:px-8 sm:pt-8 sm:text-4xl sm:font-bold sm:tracking-wider lg:text-6xl">
        <img
          src={youtubeLogo}
          alt="Logo"
          className="w-13 mx-4 h-9 sm:mx-7 sm:h-16 sm:w-24"
        />
        <h1>YouTube Vault</h1>
      </header>
      <main className="overflow-scroll">
        <MainContainer />
      </main>
      <Footer />
    </div>
  );
};

export default App;
