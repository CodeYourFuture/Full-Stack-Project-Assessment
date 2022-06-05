import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import AddVideoForm from "./AddVideoForm";

ReactDOM.render(
  <React.StrictMode>
    <App />
    <AddVideoForm />
  </React.StrictMode>,
  document.getElementById("root")
);
