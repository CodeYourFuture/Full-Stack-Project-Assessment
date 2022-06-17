import React from "react";
import Header from "./components/Header";
import SideBar from './components/SideBar'
import Home from './components/Home'
import './styles/global.scss';

function App() {
  return (
    <div className="app-container">
      <Header/>
      <SideBar/>
      <Home/>
    </div>
  );
}

export default App;
