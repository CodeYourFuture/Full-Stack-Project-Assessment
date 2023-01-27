import React from "react";
import AppHeader from "../components/AppHeader";
import AddVideo from "../components/AddVideo"
import AllVideos from "../components/AllVideos";
import SearchVideo from "../components/SearchVideo";

function Home() {

  return <>
    <div className="home">
      <AppHeader />
      <SearchVideo />
      <AddVideo />
      <AllVideos />
    </div>
  </>
}

export default Home;