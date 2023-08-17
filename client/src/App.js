import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddVideoForm from "./AddVideoForm";
import HomePage from "./HomePage";
import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MusicVideoIcon from "@mui/icons-material/MusicVideo";

const defaultTheme = createTheme();



function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBar position="relative" color="">
        <Toolbar>
          <MusicVideoIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            MusicVideo
          </Typography>
        </Toolbar>
      </AppBar>
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/add-video" element={<AddVideoForm />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
