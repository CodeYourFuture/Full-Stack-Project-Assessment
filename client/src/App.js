import React,{useState} from "react";
import Header from "./components/Header";
import SideBar from './components/SideBar'
import Home from './components/Home'
import AddVideo from "./components/AddVideo";
import './styles/global.scss';
import { Routes, Route } from "react-router-dom";

function App() {
  const[showAddVideoModal, setShowAddVideoModal]=useState(false);
  const handleClick=()=>{
    setShowAddVideoModal(true)
  }
  
  return (
    <div className="app-container">
      <Header handleClick={handleClick}/>
      <SideBar handleClick={handleClick}/>
      <Home/>
      <AddVideo showAddVideoModal={showAddVideoModal} setShowAddVideoModal={setShowAddVideoModal}/>
    </div>
  );
}

export default App;
