import React from "react";
import youtubeLogo from "./components/images/youtubeLogo.png";
import MainContainer from "./components/MainContainer";
import Footer from "./components/Footer";
import Header from "./components/Header";

const App = () => {
  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      <Header />
      <main className="overflow-scroll">
        <MainContainer />
      </main>
      <Footer />
    </div>
  );
};

export default App;
