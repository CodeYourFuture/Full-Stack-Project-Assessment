import * as React from "react";
import Box from "@mui/material/Box";
import "./App.css";
import VideosGrid from "./components/VideosGrid";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Box>
        <Header />
        <VideosGrid />
      </Box>
    </div>
  );
}

export default App;
