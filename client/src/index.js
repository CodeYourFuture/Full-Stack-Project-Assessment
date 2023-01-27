import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { VideosContextProvider } from "./context/VideoContext";

ReactDOM.render(
  <React.StrictMode>
    <VideosContextProvider>
      <App />
    </VideosContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
