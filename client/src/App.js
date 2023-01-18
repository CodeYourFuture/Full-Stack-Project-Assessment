import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "./App.css";
import VideosGrid from "./components/VideosGrid";

function App() {
  return (
    <div className="App">
      <Box>
        <Typography m={5} variant="h3">
          Video Recommendation
        </Typography>
        <VideosGrid />
      </Box>
    </div>
  );
}

export default App;
