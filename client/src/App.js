import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddVideoForm from "./AddVideoForm";
import HomePage from "./HomePage";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/add-video" element={<AddVideoForm />} />
      </Routes>
    </Router>
  );
}

export default App;
