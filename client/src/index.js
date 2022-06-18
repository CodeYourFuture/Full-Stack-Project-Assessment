import { createRoot } from "react-dom/client";
import React from "react";
import "./index.css";
import App from "./App";

const container = document.getElementById("app");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App tab="home" />);
