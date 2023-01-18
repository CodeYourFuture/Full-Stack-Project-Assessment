import * as React from "react";
import Box from "@mui/material/Box";
import "./App.css";
import VideosGrid from "./components/VideosGrid";
import Header from "./components/Header";
import AddVideoForm from "./components/AddVideoForm";

function App() {
  return (
    <div className="App">
      <Box>
        <Header />
        <AddVideoForm/>
        <VideosGrid />
      </Box>
    </div>
  );
}

export default App;
