import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import ViewVideo from "./pages/ViewVideo";
import Error from './pages/Error';


function App() {



  return (
    <div className="App">
      <BrowserRouter>
        <Routes>

          <Route exact index element={<Home />} />
          <Route path="/post/:id" element={<ViewVideo />} />
          <Route path='*' element={<Error />} />

        </Routes>
      </BrowserRouter>


    </div>
  );
}

export default App;
