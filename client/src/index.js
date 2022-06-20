import "./index.css";
import App from "./App";
import React from "react";
// Changed for React 18
// import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
